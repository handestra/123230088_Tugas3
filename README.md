# 📝 Notes App — Fullstack (Express.js + MySQL)

## Struktur Folder

```
notes-app/
├── backend/
│   ├── server.js        ← API Express.js
│   ├── notes_db.sql     ← File migrasi database
│   └── package.json
└── frontend/
    └── index.html       ← UI (HTML, CSS, JS)
```

---

## ✅ LANGKAH-LANGKAH PENGERJAAN

### TAHAP 1 — Setup MySQL Lokal

1. Pastikan MySQL sudah terinstall dan berjalan.
2. Buka terminal / MySQL Workbench, jalankan:

```sql
mysql -u root -p < backend/notes_db.sql
```

Atau buka MySQL dan copy-paste isi file `notes_db.sql`.

---

### TAHAP 2 — Setup Backend

```bash
cd backend
npm install
node server.js
```

Backend akan berjalan di: http://localhost:3000

Jangan lupa sesuaikan konfigurasi di `server.js`:
```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',  // ganti sesuai password MySQL kamu
  database: 'notes_db'
});
```

---

### TAHAP 3 — Jalankan Frontend

Cukup buka file `frontend/index.html` di browser.
Atau gunakan Live Server di VS Code.

---

### TAHAP 4 — Uji API dengan Postman

| Method | URL                        | Body (JSON)               |
|--------|----------------------------|---------------------------|
| GET    | http://localhost:3000/notes         | —                         |
| GET    | http://localhost:3000/notes/:id     | —                         |
| POST   | http://localhost:3000/notes         | {"judul":"...","isi":"..."} |
| PUT    | http://localhost:3000/notes/:id     | {"judul":"...","isi":"..."} |
| DELETE | http://localhost:3000/notes/:id     | —                         |

---

### TAHAP 5 — Export Database (untuk Migrasi)

```bash
mysqldump -u root -p notes_db > notes_db_export.sql
```

---

### TAHAP 6 — Migrasi ke Cloud SQL / VM

#### Opsi A: Cloud SQL (Google Cloud)
1. Buat instance Cloud SQL MySQL di Google Cloud Console.
2. Upload file `.sql` via Cloud Shell atau MySQL client.
3. Ganti konfigurasi di `server.js`:
   ```js
   host: '34.xxx.xxx.xxx', // IP publik Cloud SQL
   user: 'root',
   password: 'password_cloud',
   database: 'notes_db'
   ```

#### Opsi B: MySQL di VM
1. SSH ke VM: `ssh user@IP_VM`
2. Install MySQL: `sudo apt install mysql-server -y`
3. Copy file SQL ke VM: `scp notes_db.sql user@IP_VM:~/`
4. Import: `mysql -u root -p < notes_db.sql`
5. Ganti `host` di `server.js` dengan IP VM.
6. Buka firewall port 3306 di VM.

---

### BONUS — Deploy Frontend ke VM

```bash
# Di VM, install nginx
sudo apt install nginx -y

# Copy file frontend ke VM
scp frontend/index.html user@IP_VM:/var/www/html/

# Akses via browser
http://IP_PUBLIK_VM
```

Jangan lupa ganti `const API` di `index.html` ke URL backend kamu:
```js
const API = 'http://IP_VM_ATAU_CLOUD:3000';
```
