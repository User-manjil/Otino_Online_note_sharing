<?php
require_once __DIR__ . '/_helpers.php';

$payload = auth_required();

$conn = db();
$seller_id = (int)$payload['uid'];

$stmt = $conn->prepare('SELECT l.id AS listing_id, l.price, l.condition, l.status, l.created_at,
                                n.id AS note_id, n.title, n.subject_code
                         FROM listings l
                         JOIN notes n ON n.id = l.note_id
                         WHERE l.seller_id = ?
                         ORDER BY l.created_at DESC');
$stmt->bind_param('i', $seller_id);
$stmt->execute();
$rows = $stmt->get_result()?->fetch_all(MYSQLI_ASSOC) ?? [];

json_response(['ok' => true, 'data' => $rows]);

