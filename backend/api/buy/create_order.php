<?php
require_once __DIR__ . '/_helpers.php';

$payload = auth_required();

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
  json_response(['ok' => false, 'error' => 'Invalid JSON body'], 400);
  exit;
}

$listing_id = (int)($body['listing_id'] ?? 0);
$quantity = (int)($body['quantity'] ?? 1);
if ($listing_id <= 0) {
  json_response(['ok' => false, 'error' => 'listing_id is required'], 400);
  exit;
}
if ($quantity <= 0) $quantity = 1;

$conn = db();

$conn->begin_transaction();
try {
  // Lock listing row
  $stmt = $conn->prepare('SELECT id, note_id, seller_id, price, status FROM listings WHERE id = ? FOR UPDATE');
  $stmt->bind_param('i', $listing_id);
  $stmt->execute();
  $listing = $stmt->get_result()?->fetch_assoc();

  if (!$listing) {
    json_response(['ok' => false, 'error' => 'Listing not found'], 404);
    exit;
  }
  if ($listing['status'] !== 'active') {
    json_response(['ok' => false, 'error' => 'Listing is not available'], 409);
    exit;
  }

  $buyer_id = (int)$payload['uid'];
  $total = ((float)$listing['price']) * $quantity;

  $stmt = $conn->prepare('INSERT INTO orders (buyer_id, listing_id, quantity, total_amount, status) VALUES (?, ?, ?, ?, "pending")');
  $stmt->bind_param('iiid', $buyer_id, $listing_id, $quantity, $total);
  $stmt->execute();

  // Mark listing as sold (reserve). In real payment flow you'd do it after payment.
  $stmt = $conn->prepare('UPDATE listings SET status = "sold" WHERE id = ?');
  $stmt->bind_param('i', $listing_id);
  $stmt->execute();

  $order_id = (int)$conn->insert_id;

  $conn->commit();
  json_response(['ok' => true, 'message' => 'Order created', 'order_id' => $order_id]);
} catch (Throwable $e) {
  $conn->rollback();
  json_response(['ok' => false, 'error' => 'Server error', 'details' => $e->getMessage()], 500);
}

