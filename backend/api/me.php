<?php
require_once __DIR__ . '/_helpers.php';

$payload = auth_required();

json_response(['ok' => true, 'user' => ['id' => (int)$payload['uid'], 'name' => (string)($payload['name'] ?? '')]]);

