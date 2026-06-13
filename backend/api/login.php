<?php
require_once __DIR__ . '/_helpers.php';

cors_headers();
handle_options();

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
  json_response(['ok' => false, 'error' => 'Invalid JSON body'], 400);
  exit;
}

$email = strtolower(trim((string)($body['email'] ?? '')));
$password = (string)($body['password'] ?? '');

if ($email === '' || $password === '') {
  json_response(['ok' => false, 'error' => 'email and password are required'], 400);
  exit;
}

$conn = db();
$stmt = $conn->prepare('SELECT id, password_hash, name FROM users WHERE email = ? LIMIT 1');
$stmt->bind_param('s', $email);
$stmt->execute();
$row = $stmt->get_result()?->fetch_assoc();

if (!$row) {
  json_response(['ok' => false, 'error' => 'Invalid credentials'], 401);
  exit;
}

if (!password_verify($password, $row['password_hash'])) {
  json_response(['ok' => false, 'error' => 'Invalid credentials'], 401);
  exit;
}

$exp = time() + (60 * 60 * 24 * 7); // 7 days
$payload = ['uid' => (int)$row['id'], 'name' => $row['name'], 'exp' => $exp];
$jwt = jwt_sign($payload);

json_response(['ok' => true, 'token' => $jwt]);

