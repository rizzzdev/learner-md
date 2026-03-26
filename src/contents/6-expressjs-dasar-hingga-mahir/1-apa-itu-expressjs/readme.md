# 1. Apa itu Express.js: Upgrade dari Kompor ke Kitchen Set Lengkap

Di kursus Node.js Dasar, kita sudah belajar membuat web server menggunakan modul `http` bawaan. Kita bisa membuat server, routing, menangani request dan response. Tapi, kodenya cukup panjang dan merepotkan — bayangkan harus menulis if-else untuk setiap URL!

**Express.js** hadir untuk menyelesaikan masalah ini. Express.js adalah **framework web** paling populer untuk Node.js yang membuat pembuatan web server dan API menjadi jauh lebih cepat, rapi, dan menyenangkan.

## Analogi: Dari Kompor Tunggal ke Kitchen Set Lengkap

Jika Node.js `http` module adalah memasak dengan **kompor tunggal dan panci seadanya** — Anda bisa memasak, tapi semuanya harus dilakukan manual dan memakan banyak waktu.

Express.js adalah **kitchen set lengkap** — kompor 4 tungku, oven, microwave, blender, food processor, semuanya tersedia. Anda masih memasak (membuat server), tapi dengan peralatan yang jauh lebih lengkap dan efisien.

- **Kompor tunggal** (http module) = Bisa memasak, tapi lambat dan repot
- **Kitchen set lengkap** (Express.js) = Memasak jadi cepat, rapi, dan powerful
- **Resep yang sudah terstandar** = Routing, middleware, error handling sudah disediakan
- **Peralatan khusus** = Parsing body, serving static files, template engine

## Perbandingan: http Module vs Express.js

```javascript
// ❌ DENGAN http MODULE (panjang dan manual)
const http = require('http');

const server = http.createServer((req, res) => {
    // Harus parse URL manual
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ pesan: 'Halaman utama' }));
    } else if (req.url === '/pengguna' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: [] }));
    } else if (req.url === '/pengguna' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const data = JSON.parse(body);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ pesan: 'Berhasil', data }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Tidak ditemukan' }));
    }
});

server.listen(3000);
```

```javascript
// ✅ DENGAN EXPRESS.JS (pendek, bersih, dan jelas)
const express = require('express');
const app = express();

app.use(express.json()); // Parsing JSON otomatis!

app.get('/', (req, res) => {
    res.json({ pesan: 'Halaman utama' });
});

app.get('/pengguna', (req, res) => {
    res.json({ data: [] });
});

app.post('/pengguna', (req, res) => {
    res.status(201).json({ pesan: 'Berhasil', data: req.body });
});

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
```

Terlihat jelas perbedaannya! Express.js mengurangi banyak kode boilerplate dan membuat kode lebih mudah dibaca.

## Instalasi Express.js

### Langkah 1: Buat Proyek Baru

```bash
# Buat folder proyek
mkdir belajar-express
cd belajar-express

# Inisialisasi proyek Node.js
npm init -y
```

### Langkah 2: Install Express

```bash
# Install Express.js
npm install express

# Install nodemon untuk development (auto-restart)
npm install nodemon --save-dev
```

### Langkah 3: Setup package.json Scripts

```javascript
// package.json — tambahkan scripts
{
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
    }
}
```

### Langkah 4: Buat Server Pertama

```javascript
// File: index.js

// 1. Import Express
const express = require('express');

// 2. Buat aplikasi Express (instance)
const app = express();

// 3. Tentukan port
const PORT = process.env.PORT || 3000;

// 4. Buat route pertama
app.get('/', (req, res) => {
    res.json({
        status: 'sukses',
        pesan: 'Selamat datang di Express.js! 🚀',
        waktu: new Date().toLocaleString('id-ID')
    });
});

// 5. Jalankan server
app.listen(PORT, () => {
    console.log(`✅ Server Express berjalan di http://localhost:${PORT}`);
    console.log('📌 Tekan Ctrl+C untuk menghentikan server');
});
```

```bash
# Jalankan server
npm run dev

# Buka browser: http://localhost:3000
```

## Memahami Objek app

Objek `app` adalah jantung dari Express.js — ia adalah **instance aplikasi** yang mengatur segalanya:

```javascript
const express = require('express');
const app = express();

// app.get()    → Menangani HTTP GET request
// app.post()   → Menangani HTTP POST request
// app.put()    → Menangani HTTP PUT request
// app.delete() → Menangani HTTP DELETE request
// app.use()    → Menggunakan middleware
// app.listen() → Memulai server
// app.set()    → Mengatur konfigurasi
```

## Fitur-Fitur Express.js

| Fitur | Deskripsi |
|---|---|
| **Routing** | Sistem URL yang powerful dan fleksibel |
| **Middleware** | Fungsi yang dijalankan sebelum/sesudah request |
| **Template Engine** | Render halaman HTML dinamis (EJS, Pug, dll) |
| **Static Files** | Sajikan file CSS, gambar, JS langsung |
| **Error Handling** | Penanganan error yang terstruktur |
| **Request/Response** | Objek yang diperkaya dengan banyak method |

## Contoh Praktis: Server dengan Beberapa Route

```javascript
// File: index.js
const express = require('express');
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Data contoh (simulasi database)
const menuMakanan = [
    { id: 1, nama: 'Nasi Goreng', harga: 15000, tersedia: true },
    { id: 2, nama: 'Mie Ayam', harga: 12000, tersedia: true },
    { id: 3, nama: 'Sate Ayam', harga: 20000, tersedia: false },
    { id: 4, nama: 'Es Teh Manis', harga: 5000, tersedia: true }
];

// Route: Halaman utama
app.get('/', (req, res) => {
    res.json({
        pesan: 'Selamat datang di API Warung Makan!',
        endpoints: {
            'GET /menu': 'Lihat semua menu',
            'GET /menu/:id': 'Lihat detail menu',
            'GET /menu/tersedia': 'Lihat menu yang tersedia'
        }
    });
});

// Route: Semua menu
app.get('/menu', (req, res) => {
    res.json({
        jumlah: menuMakanan.length,
        data: menuMakanan
    });
});

// Route: Menu yang tersedia saja
app.get('/menu/tersedia', (req, res) => {
    const tersedia = menuMakanan.filter(m => m.tersedia);
    res.json({
        jumlah: tersedia.length,
        data: tersedia
    });
});

// Route: Detail menu berdasarkan ID
app.get('/menu/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const menu = menuMakanan.find(m => m.id === id);

    if (!menu) {
        return res.status(404).json({
            error: `Menu dengan ID ${id} tidak ditemukan`
        });
    }

    res.json({ data: menu });
});

// Route: 404 untuk semua URL yang tidak dikenali
app.use((req, res) => {
    res.status(404).json({
        error: 'Halaman tidak ditemukan',
        tip: 'Kunjungi / untuk melihat daftar endpoint'
    });
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🍜 Warung Express buka di http://localhost:${PORT}`);
});
```

Di pelajaran-pelajaran selanjutnya, kita akan mendalami setiap fitur Express.js — mulai dari routing, middleware, request/response, hingga membangun API lengkap dan deploy ke internet!
