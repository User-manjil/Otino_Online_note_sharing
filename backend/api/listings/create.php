<?php
require_once __DIR__ . '/_helpers.php';

$payload = auth_required();

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
  json_response(['ok' => false, 'error' => 'Invalid JSON body'], 400);
  exit;
}

$note_id = (int)($body['note_id'] ?? 0);
$price = (float)($body['price'] ?? 0);
$condition = trim((string)($body['condition'] ?? 'new'));

if ($note_id <= 0 || $price <= 0) {
  json_response(['ok' => false, 'error' => 'note_id and price are required'], 400);
  exit;
}
if ($condition === '') $condition = 'new';

$conn = db();

// ensure note exists
$stmt = $conn->prepare('SELECT id FROM notes WHERE id = ?');
$stmt->bind_param('i', $note_id);
$stmt->execute();
if (!$stmt->get_result()?->fetch_assoc()) {
  json_response(['ok' => false, 'error' => 'Note not found'], 404);
  exit;
}

$stmt = $conn->prepare('INSERT INTO listings (note_id, seller_id, price, condition, status) VALUES (?, ?, ?, ?, "active")');
$seller_id = (int)$payload['uid'];
$stmt->bind_param('iids', $note_id, $seller_id, $price, $condition);
$stmt->execute();

json_response(['ok' => true, 'message' => 'Listing created'], 201);

