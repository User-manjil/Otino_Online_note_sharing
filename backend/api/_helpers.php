<?php
require_once __DIR__ . '/config.php';

function json_response(array $payload, int $status = 200): void {
  http_response_code($status);
  echo json_encode($payload);
}

function cors_headers(): void {
  header('Access-Control-Allow-Origin: ' . CORS_ORIGIN);
  header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');
}

function handle_options(): void {
  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
  }
}

function db(): mysqli {
  $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  if ($conn->connect_error) {
    json_response(['ok' => false, 'error' => 'DB connection failed'], 500);
    exit;
  }
  $conn->set_charset('utf8mb4');
  return $conn;
}

function get_bearer_token(): ?string {
  $headers = null;
  if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $headers = $_SERVER['HTTP_AUTHORIZATION'];
  } elseif (function_exists('apache_request_headers')) {
    $requestHeaders = apache_request_headers();
    $headers = $requestHeaders['Authorization'] ?? null;
  }

  if (!$headers) return null;
  if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
    return $matches[1];
  }
  return null;
}

function base64url_encode(string $data): string {
  return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode(string $data): string {
  $remainder = strlen($data) % 4;
  if ($remainder) {
    $padlen = 4 - $remainder;
    $data .= str_repeat('=', $padlen);
  }
  return base64_decode(strtr($data, '-_', '+/'));
}

function jwt_sign(array $payload): string {
  $header = ['alg' => 'HS256', 'typ' => 'JWT'];
  $segments = [];
  $segments[] = base64url_encode(json_encode($header));
  $segments[] = base64url_encode(json_encode($payload));
  $signingInput = implode('.', $segments);
  $signature = hash_hmac('sha256', $signingInput, JWT_SECRET, true);
  $segments[] = base64url_encode($signature);
  return implode('.', $segments);
}

function jwt_verify(string $jwt): ?array {
  $parts = explode('.', $jwt);
  if (count($parts) !== 3) return null;
  [$h64, $p64, $s64] = $parts;

  $signatureCheck = base64url_encode(hash_hmac('sha256', $h64 . '.' . $p64, JWT_SECRET, true));
  if (!hash_equals($signatureCheck, $s64)) return null;

  $payloadJson = base64url_decode($p64);
  $payload = json_decode($payloadJson, true);
  if (!is_array($payload)) return null;

  if (isset($payload['exp']) && time() > (int)$payload['exp']) {
    return null;
  }
  return $payload;
}

function auth_required(): array {
  cors_headers();
  handle_options();

  $token = get_bearer_token();
  if (!$token) {
    json_response(['ok' => false, 'error' => 'Unauthorized'], 401);
    exit;
  }

  $payload = jwt_verify($token);
  if (!$payload || empty($payload['uid'])) {
    json_response(['ok' => false, 'error' => 'Unauthorized'], 401);
    exit;
  }

  return $payload;
}

