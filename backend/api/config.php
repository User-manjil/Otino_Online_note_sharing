<?php
// Shared config for Otino API

header('Content-Type: application/json; charset=utf-8');

// Adjust these for your MySQL / XAMPP setup if needed
const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASS = '';
const DB_NAME = 'otino';

// Change this to a strong random string
const JWT_SECRET = 'CHANGE_ME_SUPER_SECRET_KEY';

// Frontend origin (Vite) for CORS
const CORS_ORIGIN = '*';

