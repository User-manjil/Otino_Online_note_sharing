-- Otino database schema
-- Run in phpMyAdmin / MySQL

CREATE DATABASE IF NOT EXISTS otino CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE otino;

-- 1) Users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2) Notes catalog
CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  subject_code VARCHAR(50) NOT NULL,
  author_name VARCHAR(150) NOT NULL,
  rating DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  base_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  created_by INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notes_created_by FOREIGN KEY (created_by) REFERENCES users(id)
    ON DELETE SET NULL
) ENGINE=InnoDB;

-- 3) Listings for buying/selling notes
CREATE TABLE IF NOT EXISTS listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  note_id INT NOT NULL,
  seller_id INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  condition VARCHAR(50) NOT NULL DEFAULT 'new',
  status ENUM('active','sold','removed') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_listings_note FOREIGN KEY (note_id) REFERENCES notes(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_listings_seller FOREIGN KEY (seller_id) REFERENCES users(id)
    ON DELETE CASCADE,
  INDEX idx_listings_note_status (note_id, status),
  INDEX idx_listings_seller_status (seller_id, status)
) ENGINE=InnoDB;

-- 4) Orders (buy flow)
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  buyer_id INT NOT NULL,
  listing_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending','paid','fulfilled','cancelled') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fulfilled_at TIMESTAMP NULL,
  cancelled_at TIMESTAMP NULL,
  CONSTRAINT fk_orders_buyer FOREIGN KEY (buyer_id) REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_orders_listing FOREIGN KEY (listing_id) REFERENCES listings(id)
    ON DELETE CASCADE,
  INDEX idx_orders_buyer (buyer_id, created_at),
  INDEX idx_orders_listing (listing_id)
) ENGINE=InnoDB;

-- No seed users by default.
-- Use register/login endpoints to create accounts.


