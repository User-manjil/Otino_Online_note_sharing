<?php
require_once __DIR__ . '/_helpers.php';

cors_headers();
handle_options();

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
  json_response(['ok' => false, 'error' => 'Invalid JSON body'], 400);
  exit;
}

$name = trim((string)($body['name'] ?? ''));
$email = strtolower(trim((string)($body['email'] ?? '')));
$password = (string)($body['password'] ?? '');

if ($name === '' || $email === '' || $password === '') {
  json_response(['ok' => false, 'error' => 'name, email, password are required'], 400);
  exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(['ok' => false, 'error' => 'Invalid email'], 400);
  exit;
}
if (strlen($password) < 6) {
  json_response(['ok' => false, 'error' => 'Password must be at least 6 characters'], 400);
  exit;
}

$conn = db();

$stmt = $conn->prepare('SELECT id FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$res = $stmt->get_result();
if ($res && $res->num_rows > 0) {
  json_response(['ok' => false, 'error' => 'Email already registered'], 409);
  exit;
}

$hash = password_hash($password, PASSWORD_BCRYPT);

$stmt = $conn->prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)');
$stmt->bind_param('sss', $name, $email, $hash);
$stmt->execute();

json_response(['ok' => true, 'message' => 'Registered successfully'], 201);

