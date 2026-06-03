const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;;

// Middleware
app.use(cors());
app.use(express.json());

// =====================
// KONFIGURASI DATABASE
// Ganti sesuai setup lokal atau Cloud SQL / VM kamu
// =====================
const db = mysql.createConnection({
  host: '34.172.113.167',       // Ganti dengan IP Cloud SQL / VM jika sudah migrasi
  user: 'admin',            // Username MySQL
  password: "mypassword", // Password MySQL
  database: 'notes_123230088'
});

db.connect((err) => {
  if (err) {
    console.error('Gagal koneksi ke database:', err.message);
    process.exit(1);
  }
  console.log('Terhubung ke MySQL!');
});

// =====================
// ENDPOINT API
// =====================

// GET /notes - Ambil semua catatan
app.get('/notes', (req, res) => {
  const sql = 'SELECT * FROM notes ORDER BY tanggal_dibuat DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /notes/:id - Ambil satu catatan
app.get('/notes/:id', (req, res) => {
  const sql = 'SELECT * FROM notes WHERE id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Catatan tidak ditemukan' });
    res.json(results[0]);
  });
});

// POST /notes - Tambah catatan baru
app.post('/notes', (req, res) => {
  const { judul, isi } = req.body;
  if (!judul || !isi) return res.status(400).json({ error: 'Judul dan isi wajib diisi' });

  const sql = 'INSERT INTO notes (judul, isi) VALUES (?, ?)';
  db.query(sql, [judul, isi], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, judul, isi });
  });
});

// PUT /notes/:id - Edit catatan
app.put('/notes/:id', (req, res) => {
  const { judul, isi } = req.body;
  if (!judul || !isi) return res.status(400).json({ error: 'Judul dan isi wajib diisi' });

  const sql = 'UPDATE notes SET judul = ?, isi = ? WHERE id = ?';
  db.query(sql, [judul, isi, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Catatan tidak ditemukan' });
    res.json({ message: 'Catatan berhasil diperbarui' });
  });
});

// DELETE /notes/:id - Hapus catatan
app.delete('/notes/:id', (req, res) => {
  const sql = 'DELETE FROM notes WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Catatan tidak ditemukan' });
    res.json({ message: 'Catatan berhasil dihapus' });
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di https://be-rest-311135974217.us-central1.run.app`);
});
