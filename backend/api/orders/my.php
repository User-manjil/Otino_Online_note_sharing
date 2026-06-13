<?php
require_once __DIR__ . '/_helpers.php';

$payload = auth_required();

$conn = db();
$user_id = (int)$payload['uid'];

// Orders where user is buyer OR seller of the underlying listing
$sql = "
  SELECT o.id, o.status, o.total_amount, o.quantity, o.created_at,
         n.id AS note_id, n.title, n.subject_code,
         l.id AS listing_id,
         buyers.name AS buyer_name,
         sellers.name AS seller_name
  FROM orders o
  JOIN listings l ON l.id = o.listing_id
  JOIN notes n ON n.id = l.note_id
  JOIN users buyers ON buyers.id = o.buyer_id
  JOIN users sellers ON sellers.id = l.seller_id
  WHERE o.buyer_id = ? OR l.seller_id = ?
  ORDER BY o.created_at DESC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $user_id, $user_id);
$stmt->execute();
$rows = $stmt->get_result()?->fetch_all(MYSQLI_ASSOC) ?? [];

json_response(['ok' => true, 'data' => $rows]);

