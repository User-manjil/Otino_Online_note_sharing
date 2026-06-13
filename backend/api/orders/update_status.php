<?php
require_once __DIR__ . '/_helpers.php';

$payload = auth_required();

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
  json_response(['ok' => false, 'error' => 'Invalid JSON body'], 400);
  exit;
}

$order_id = (int)($body['order_id'] ?? 0);
$new_status = trim((string)($body['status'] ?? ''));

$allowed = ['fulfilled', 'cancelled'];
if ($order_id <= 0 || !in_array($new_status, $allowed, true)) {
  json_response(['ok' => false, 'error' => 'Invalid order_id or status'], 400);
  exit;
}

$conn = db();

$conn->begin_transaction();
try {
  // Ensure only seller can update (or you can expand to buyer cancel)
  $stmt = $conn->prepare('SELECT o.id, o.status, o.listing_id, l.seller_id FROM orders o JOIN listings l ON l.id = o.listing_id WHERE o.id = ? FOR UPDATE');
  $stmt->bind_param('i', $order_id);
  $stmt->execute();
  $row = $stmt->get_result()?->fetch_assoc();

  if (!$row) {
    json_response(['ok' => false, 'error' => 'Order not found'], 404);
    exit;
  }

  $seller_id = (int)$row['seller_id'];
  $user_id = (int)$payload['uid'];

  if ($user_id !== $seller_id) {
    json_response(['ok' => false, 'error' => 'Forbidden'], 403);
    exit;
  }

  if ($row['status'] === 'cancelled' || $row['status'] === 'fulfilled') {
    json_response(['ok' => false, 'error' => 'Order already finalized'], 409);
    exit;
  }

  if ($new_status === 'fulfilled') {
    $stmt = $conn->prepare('UPDATE orders SET status = "fulfilled", fulfilled_at = NOW() WHERE id = ?');
    $stmt->bind_param('i', $order_id);
  } else {
    $stmt = $conn->prepare('UPDATE orders SET status = "cancelled", cancelled_at = NOW() WHERE id = ?');
    $stmt->bind_param('i', $order_id);
  }
  $stmt->execute();

  $conn->commit();
  json_response(['ok' => true, 'message' => 'Order updated']);
} catch (Throwable $e) {
  $conn->rollback();
  json_response(['ok' => false, 'error' => 'Server error', 'details' => $e->getMessage()], 500);
}

