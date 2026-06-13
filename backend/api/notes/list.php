<?php
require_once __DIR__ . '/_helpers.php';

cors_headers();
handle_options();

$q = strtolower(trim((string)($_GET['q'] ?? '')));
$limit = (int)($_GET['limit'] ?? 20);
$offset = (int)($_GET['offset'] ?? 0);
if ($limit <= 0) $limit = 20;

$conn = db();

if ($q !== '') {
  $like = '%' . $q . '%';
  $sql = "
    SELECT n.id, n.title, n.subject_code, n.author_name, n.rating, n.base_price,
           (SELECT MIN(l.price) FROM listings l WHERE l.note_id = n.id AND l.status = 'active') AS min_active_price
    FROM notes n
    WHERE LOWER(n.title) LIKE ? OR LOWER(n.subject_code) LIKE ? OR LOWER(n.author_name) LIKE ?
    ORDER BY n.created_at DESC
    LIMIT ? OFFSET ?
  ";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssssi', $like, $like, $like, $limit, $offset);
} else {
  $sql = "
    SELECT n.id, n.title, n.subject_code, n.author_name, n.rating, n.base_price,
           (SELECT MIN(l.price) FROM listings l WHERE l.note_id = n.id AND l.status = 'active') AS min_active_price
    FROM notes n
    ORDER BY n.created_at DESC
    LIMIT ? OFFSET ?
  ";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $limit, $offset);
}

$stmt->execute();
$rows = $stmt->get_result()?->fetch_all(MYSQLI_ASSOC) ?? [];

json_response(['ok' => true, 'data' => $rows]);

