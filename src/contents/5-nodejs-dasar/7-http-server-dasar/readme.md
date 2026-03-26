# 7. HTTP Server Dasar: Membuka Warung Makan Digital

Ini adalah momen yang ditunggu-tunggu — kita akan membuat **web server** pertama kita! Web server adalah program yang "mendengarkan" permintaan dari browser (atau aplikasi lain) dan memberikan balasan. Setiap website yang Anda kunjungi dilayani oleh sebuah web server.

## Analogi: Warung Makan

Bayangkan Anda membuka warung makan:
- **Server** = Warung makan Anda
- **Client (Browser)** = Pelanggan yang datang
- **Request** = Pelanggan memesan makanan ("Saya mau nasi goreng!")
- **Response** = Anda menyajikan makanan (nasi goreng + sambal)
- **Port** = Nomor alamat warung (Jl. Merdeka **No. 3000**)
- **URL Path** = Menu yang dipilih (`/nasi-goreng`, `/mie-ayam`, `/es-teh`)
- **HTTP Method** = Jenis aksi (GET = "lihat menu", POST = "pesan makanan")

## Membuat Server Pertama

```javascript
// File: server.js
const http = require('http');

// Membuat "warung makan" (server)
const server = http.createServer((request, response) => {
    // Setiap kali ada pelanggan datang (request masuk),
    // fungsi ini dijalankan

    // Mengirim balasan ke pelanggan
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Halo! Selamat datang di warung Node.js!');
});

// Membuka warung di alamat port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🍜 Warung sudah buka di http://localhost:${PORT}`);
    console.log('Tekan Ctrl+C untuk menutup warung');
});
```

```bash
# Jalankan server
node server.js

# Buka browser dan kunjungi:
# http://localhost:3000
```

## Memahami Request dan Response

### Request (Permintaan Pelanggan)

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // Informasi dari permintaan pelanggan
    console.log('--- Pelanggan Datang ---');
    console.log('Method:', req.method);        // GET, POST, dll
    console.log('URL:', req.url);              // /nasi-goreng, /menu, dll
    console.log('Headers:', req.headers);      // Info tambahan (browser, bahasa, dll)

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Pesanan diterima!');
});

server.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
```

### Response (Balasan dari Warung)

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // Mengirim balasan teks biasa
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.end('Ini teks biasa');

    // Mengirim balasan HTML
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.end('<h1>Halo!</h1><p>Ini HTML dari Node.js</p>');

    // Mengirim balasan JSON (paling umum untuk API)
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        status: 'sukses',
        pesan: 'Data berhasil diambil',
        data: { nama: 'Nasi Goreng', harga: 15000 }
    }));
});

server.listen(3000);
```

## Routing: Mengatur Menu Warung

Routing adalah cara kita menentukan respons berbeda untuk URL yang berbeda — seperti pelanggan yang memesan dari menu berbeda.

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // Set header untuk JSON
    res.setHeader('Content-Type', 'application/json');

    // Routing berdasarkan URL
    if (req.url === '/' && req.method === 'GET') {
        // Halaman utama
        res.writeHead(200);
        res.end(JSON.stringify({
            pesan: 'Selamat datang di Warung Node.js!',
            menu: ['/menu', '/tentang', '/kontak']
        }));

    } else if (req.url === '/menu' && req.method === 'GET') {
        // Halaman menu
        res.writeHead(200);
        res.end(JSON.stringify({
            menu: [
                { nama: 'Nasi Goreng', harga: 15000 },
                { nama: 'Mie Ayam', harga: 12000 },
                { nama: 'Es Teh', harga: 5000 },
                { nama: 'Sate Ayam', harga: 20000 }
            ]
        }));

    } else if (req.url === '/tentang' && req.method === 'GET') {
        // Halaman tentang
        res.writeHead(200);
        res.end(JSON.stringify({
            nama: 'Warung Node.js',
            pemilik: 'Budi Santoso',
            berdiri: 2024
        }));

    } else {
        // Halaman tidak ditemukan (404)
        res.writeHead(404);
        res.end(JSON.stringify({
            error: 'Halaman tidak ditemukan!',
            pesan: `URL "${req.url}" tidak tersedia di warung kami`
        }));
    }
});

server.listen(3000, () => {
    console.log('🍜 Warung buka di http://localhost:3000');
    console.log('Menu tersedia:');
    console.log('  GET /       → Halaman utama');
    console.log('  GET /menu   → Daftar menu');
    console.log('  GET /tentang → Info warung');
});
```

## Menerima Data dari Pelanggan (POST Request)

```javascript
const http = require('http');

const daftarPesanan = [];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/pesanan' && req.method === 'GET') {
        // Lihat semua pesanan
        res.writeHead(200);
        res.end(JSON.stringify({ pesanan: daftarPesanan }));

    } else if (req.url === '/pesanan' && req.method === 'POST') {
        // Terima pesanan baru
        let body = '';

        // Data POST datang secara bertahap (chunk by chunk)
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        // Ketika semua data sudah diterima
        req.on('end', () => {
            try {
                const pesananBaru = JSON.parse(body);
                pesananBaru.id = daftarPesanan.length + 1;
                pesananBaru.waktu = new Date().toLocaleString('id-ID');
                daftarPesanan.push(pesananBaru);

                res.writeHead(201);
                res.end(JSON.stringify({
                    pesan: 'Pesanan berhasil ditambahkan!',
                    pesanan: pesananBaru
                }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: 'Format data tidak valid!'
                }));
            }
        });

    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route tidak ditemukan' }));
    }
});

server.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});

// Test dengan curl:
// curl http://localhost:3000/pesanan
// curl -X POST -H "Content-Type: application/json" -d '{"menu":"Nasi Goreng","jumlah":2}' http://localhost:3000/pesanan
```

## Menyajikan File HTML

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        // Membaca file HTML dan mengirimkannya
        const htmlPath = path.join(__dirname, 'index.html');

        fs.readFile(htmlPath, 'utf8', (err, html) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Gagal memuat halaman');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        });
    }
});

server.listen(3000);
```

## HTTP Status Code: Kode Balasan Warung

| Kode | Arti | Analogi Warung |
|---|---|---|
| **200** | OK — Berhasil | "Ini pesanan Anda, silakan!" |
| **201** | Created — Berhasil dibuat | "Pesanan baru berhasil dicatat!" |
| **400** | Bad Request — Permintaan salah | "Maaf, pesanan Anda tidak jelas" |
| **404** | Not Found — Tidak ditemukan | "Menu itu tidak ada di warung kami" |
| **500** | Server Error — Error di server | "Maaf, dapur kami sedang bermasalah" |

## Siklus Hidup Request-Response

```
Pelanggan (Browser)          Warung (Server)
      │                           │
      │── GET /menu ─────────────>│  1. Pelanggan pesan
      │                           │  2. Dapur memasak
      │                           │  3. Makanan disajikan
      │<──── 200 + Data ──────────│  4. Pelanggan terima
      │                           │
      │── POST /pesanan ─────────>│  5. Pelanggan pesan baru
      │                           │  6. Dicatat & dimasak
      │<──── 201 + Konfirmasi ────│  7. Konfirmasi pesanan
      │                           │
      │── GET /xyz ──────────────>│  8. Pelanggan minta yang aneh
      │<──── 404 + Error ─────────│  9. "Tidak ada di menu"
```

Sekarang Anda sudah bisa membuat web server dari nol! Tapi seperti yang terlihat, menulis routing dan menangani request secara manual cukup merepotkan. Inilah mengapa nanti kita akan belajar **Express.js** — framework yang membuat semua ini jauh lebih mudah dan rapi!
