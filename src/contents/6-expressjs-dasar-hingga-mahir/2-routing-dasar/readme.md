# 2. Routing Dasar: Peta Jalan di Kota Express

Routing adalah jantung dari setiap aplikasi web. Routing menentukan **bagaimana aplikasi merespons permintaan** ke URL tertentu dengan metode HTTP tertentu. Tanpa routing, server kita seperti kota tanpa peta jalan — semua orang tersesat.

## Analogi: Sistem Alamat di Kota

Bayangkan kota Express sebagai sebuah kota besar:
- Setiap **jalan** (URL path) mengarah ke **gedung** berbeda (handler function)
- Setiap gedung punya **pintu masuk** berbeda tergantung tujuan:
  - **Pintu GET** = "Saya ingin melihat/mengambil sesuatu"
  - **Pintu POST** = "Saya ingin mengirim/membuat sesuatu baru"
  - **Pintu PUT** = "Saya ingin mengubah sesuatu secara keseluruhan"
  - **Pintu PATCH** = "Saya ingin mengubah sebagian kecil"
  - **Pintu DELETE** = "Saya ingin menghapus sesuatu"

URL `/toko` mengarah ke gedung toko, `/perpustakaan` mengarah ke gedung perpustakaan.

## HTTP Methods: Jenis Aksi

| Method | Fungsi | Analogi | Contoh |
|---|---|---|---|
| **GET** | Mengambil data | Melihat katalog toko | Lihat daftar produk |
| **POST** | Membuat data baru | Mengisi formulir pendaftaran | Tambah produk baru |
| **PUT** | Mengubah seluruh data | Menulis ulang formulir dari awal | Update seluruh profil |
| **PATCH** | Mengubah sebagian data | Mencoret dan mengganti satu kolom | Ubah email saja |
| **DELETE** | Menghapus data | Merobek formulir | Hapus akun |

## Routing Dasar

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// GET — Mengambil data
app.get('/', (req, res) => {
    res.json({ pesan: 'Halaman utama' });
});

// GET — Daftar semua buku
app.get('/buku', (req, res) => {
    res.json({ data: ['Laskar Pelangi', 'Bumi Manusia', 'Negeri 5 Menara'] });
});

// POST — Menambah buku baru
app.post('/buku', (req, res) => {
    const bukuBaru = req.body;
    res.status(201).json({ pesan: 'Buku ditambahkan!', data: bukuBaru });
});

// PUT — Mengubah seluruh data buku
app.put('/buku/:id', (req, res) => {
    res.json({ pesan: `Buku ID ${req.params.id} diperbarui seluruhnya` });
});

// PATCH — Mengubah sebagian data buku
app.patch('/buku/:id', (req, res) => {
    res.json({ pesan: `Buku ID ${req.params.id} diperbarui sebagian` });
});

// DELETE — Menghapus buku
app.delete('/buku/:id', (req, res) => {
    res.json({ pesan: `Buku ID ${req.params.id} dihapus` });
});

app.listen(3000);
```

## Route Parameters (Parameter Dinamis)

Route parameter seperti **variabel di dalam URL** — ditandai dengan `:namaParameter`.

```javascript
// :id adalah route parameter — nilainya dinamis
app.get('/pengguna/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ pesan: `Menampilkan profil pengguna #${userId}` });
});
// GET /pengguna/42  → { pesan: "Menampilkan profil pengguna #42" }
// GET /pengguna/99  → { pesan: "Menampilkan profil pengguna #99" }

// Bisa lebih dari satu parameter
app.get('/toko/:tokoId/produk/:produkId', (req, res) => {
    const { tokoId, produkId } = req.params;
    res.json({
        pesan: `Produk #${produkId} dari Toko #${tokoId}`
    });
});
// GET /toko/5/produk/100
// → { pesan: "Produk #100 dari Toko #5" }
```

## Query String (Parameter Pencarian)

Query string adalah data yang dikirim lewat URL setelah tanda `?`. Biasa digunakan untuk filter, pencarian, dan pagination.

```javascript
// URL: /produk?kategori=elektronik&urutkan=harga&halaman=2
app.get('/produk', (req, res) => {
    const { kategori, urutkan, halaman } = req.query;

    res.json({
        filter: {
            kategori: kategori || 'semua',
            urutkan: urutkan || 'terbaru',
            halaman: parseInt(halaman) || 1
        },
        pesan: `Menampilkan produk ${kategori || 'semua'}, ` +
               `diurutkan: ${urutkan || 'terbaru'}, ` +
               `halaman ${halaman || 1}`
    });
});

// Contoh pencarian
app.get('/cari', (req, res) => {
    const { q, limit } = req.query;

    if (!q) {
        return res.status(400).json({ error: 'Parameter "q" diperlukan' });
    }

    res.json({
        pencarian: q,
        maksimal: parseInt(limit) || 10,
        pesan: `Mencari "${q}"...`
    });
});
// GET /cari?q=laptop&limit=5
```

## Route Chaining dengan app.route()

Untuk URL yang sama tapi method berbeda, gunakan `app.route()` agar lebih rapi:

```javascript
// ❌ Tanpa route chaining (banyak pengulangan URL)
app.get('/artikel', handlerGetArtikel);
app.post('/artikel', handlerPostArtikel);

app.get('/artikel/:id', handlerGetArtikelById);
app.put('/artikel/:id', handlerPutArtikel);
app.delete('/artikel/:id', handlerDeleteArtikel);

// ✅ Dengan route chaining (lebih rapi)
app.route('/artikel')
    .get((req, res) => {
        res.json({ pesan: 'Daftar semua artikel' });
    })
    .post((req, res) => {
        res.status(201).json({ pesan: 'Artikel baru dibuat' });
    });

app.route('/artikel/:id')
    .get((req, res) => {
        res.json({ pesan: `Detail artikel ${req.params.id}` });
    })
    .put((req, res) => {
        res.json({ pesan: `Artikel ${req.params.id} diperbarui` });
    })
    .delete((req, res) => {
        res.json({ pesan: `Artikel ${req.params.id} dihapus` });
    });
```

## Express Router: Memecah Routes ke File Terpisah

Ketika aplikasi membesar, semua route tidak bisa di satu file. **express.Router()** memungkinkan kita memecah routes ke file-file terpisah.

```
proyek/
├── routes/
│   ├── bukuRoutes.js      ← routes untuk /buku
│   └── penggunaRoutes.js  ← routes untuk /pengguna
└── index.js               ← file utama
```

```javascript
// File: routes/bukuRoutes.js
const express = require('express');
const router = express.Router();

// Semua route di sini relatif terhadap path yang didaftarkan nanti
router.get('/', (req, res) => {
    res.json({ pesan: 'Daftar semua buku' });
});

router.get('/:id', (req, res) => {
    res.json({ pesan: `Detail buku ${req.params.id}` });
});

router.post('/', (req, res) => {
    res.status(201).json({ pesan: 'Buku baru ditambahkan' });
});

router.delete('/:id', (req, res) => {
    res.json({ pesan: `Buku ${req.params.id} dihapus` });
});

module.exports = router;
```

```javascript
// File: routes/penggunaRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ pesan: 'Daftar semua pengguna' });
});

router.get('/:id', (req, res) => {
    res.json({ pesan: `Profil pengguna ${req.params.id}` });
});

module.exports = router;
```

```javascript
// File: index.js (file utama)
const express = require('express');
const app = express();

// Import router dari file terpisah
const bukuRoutes = require('./routes/bukuRoutes');
const penggunaRoutes = require('./routes/penggunaRoutes');

app.use(express.json());

// Daftarkan router dengan prefix URL
app.use('/api/buku', bukuRoutes);
app.use('/api/pengguna', penggunaRoutes);

// Sekarang:
// GET /api/buku         → Daftar buku
// GET /api/buku/5       → Detail buku 5
// GET /api/pengguna     → Daftar pengguna
// GET /api/pengguna/10  → Profil pengguna 10

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
```

## Response Methods

```javascript
// res.json() — Kirim data JSON
res.json({ nama: 'Budi', umur: 25 });

// res.send() — Kirim response (otomatis deteksi tipe)
res.send('Halo dunia!');           // text/html
res.send({ data: 'JSON juga bisa' }); // application/json

// res.status() — Set status code (bisa di-chain)
res.status(201).json({ pesan: 'Dibuat!' });
res.status(404).json({ error: 'Tidak ditemukan' });
res.status(500).json({ error: 'Server error' });

// res.redirect() — Arahkan ke URL lain
res.redirect('/halaman-baru');
res.redirect(301, '/halaman-pindah-permanen');

// res.sendFile() — Kirim file
const path = require('path');
res.sendFile(path.join(__dirname, 'public', 'index.html'));
```

## Cheatsheet Routing

| Pattern | Contoh URL | req.params |
|---|---|---|
| `/produk` | `/produk` | `{}` |
| `/produk/:id` | `/produk/42` | `{ id: '42' }` |
| `/toko/:tid/produk/:pid` | `/toko/1/produk/5` | `{ tid: '1', pid: '5' }` |

| Query String | Contoh URL | req.query |
|---|---|---|
| `?nama=budi` | `/cari?nama=budi` | `{ nama: 'budi' }` |
| `?hal=2&limit=10` | `/data?hal=2&limit=10` | `{ hal: '2', limit: '10' }` |

Routing adalah fondasi dari setiap aplikasi Express.js. Dengan memahami route parameters, query strings, dan Router, Anda bisa membangun struktur URL yang rapi dan terorganisir. Di pelajaran selanjutnya, kita akan mendalami objek **Request dan Response** yang menjadi tulang punggung komunikasi client-server!
