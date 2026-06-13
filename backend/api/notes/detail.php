<?php
require_once __DIR__ . '/_helpers.php';

cors_headers();
handle_options();

$id = (int)($_GET['id'] ?? 0);
if ($id <= 0) {
  json_response(['ok' => false, 'error' => 'Missing/invalid id'], 400);
  exit;
}

$conn = db();

$stmt = $conn->prepare('SELECT id, title, subject_code, author_name, rating, base_price, created_at FROM notes WHERE id = ? LIMIT 1');
$stmt->bind_param('i', $id);
$stmt->execute();
$note = $stmt->get_result()?->fetch_assoc();

if (!$note) {
  json_response(['ok' => false, 'error' => 'Note not found'], 404);
  exit;
}

$stmt = $conn->prepare('SELECT l.id AS listing_id, l.price, l.condition, l.status, u.id AS seller_id, u.name AS seller_name, l.created_at
                        FROM listings l
                        JOIN users u ON u.id = l.seller_id
                        WHERE l.note_id = ? AND l.status = "active"
                        ORDER BY l.created_at DESC');
$stmt->bind_param('i', $id);
$stmt->execute();
$listings = $stmt->get_result()?->fetch_all(MYSQLI_ASSOC) ?? [];

json_response(['ok' => true, 'data' => ['note' => $note, 'listings' => $listings]]);

