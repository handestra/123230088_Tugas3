-- =============================================
-- File: notes_db.sql
-- Gunakan file ini untuk migrasi ke Cloud SQL / VM
-- =============================================

CREATE DATABASE IF NOT EXISTS notes_123230088;
USE notes_123230088;

CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(255) NOT NULL,
  isi TEXT NOT NULL,
  tanggal_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data contoh (opsional)
INSERT INTO notes (judul, isi) VALUES
  ('Catatan Pertama', 'Ini adalah isi catatan pertama saya.'),
  ('Belajar Express.js', 'Express adalah framework Node.js untuk membuat REST API dengan mudah.'),
  ('Tips MySQL', 'Selalu backup database sebelum melakukan migrasi ke Cloud.');
