# Middleware: Si Satpam Penjaga Pintu

Middleware adalah fitur paling powerful di Express.js. Jika Express adalah sebuah jalan raya, maka Middleware adalah barisan **pos pemeriksaan** atau **gerbang tol** yang harus dilewati kendaraan (Request) sebelum sampai ke kota tujuan (Route Handler).

## Analogi: Masuk ke Dalam Konser

Bayangkan Anda ingin menonton konser musik:
1. **Gerbang 1 (Middleware Tiket)**: Petugas memeriksa apakah Anda punya tiket. Jika tidak punya, Anda disuruh pulang. Jika punya, silakan lanjut ke gerbang berikutnya.
2. **Gerbang 2 (Middleware Keamanan)**: Petugas memeriksa tas Anda untuk memastikan tidak membawa benda tajam. Jika aman, silakan lanjut.
3. **Panggung Utama (Route Handler)**: Akhirnya Anda sampai dan bisa menikmati musik.

Inilah Middleware: fungsi yang duduk di tengah-tengah antara Request masuk dan Handler tujuan.

---

## 1. Struktur Fungsi Middleware

Setiap middleware memiliki akses ke objek `req`, `res`, dan fungsi khusus bernama `next`.

```javascript
const myMiddleware = (req, res, next) => {
    console.log("Ada request masuk pada jam: " + new Date());
    
    // SANGAT PENTING: Panggil next() agar request bisa lanjut ke proses berikutnya
    next(); 
};
```

Jika Anda **tidak memanggil** `next()`, request akan "tersangkut" dan browser pelanggan akan terus loading sampai timeout.

---

## 2. Kegunaan Utama Middleware

1. **Logging**: Mencatat setiap aktivitas (siapa yang mengakses, jam berapa, halaman apa).
2. **Autentikasi**: Memeriksa apakah pengguna sudah login sebelum boleh melihat data rahasia.
3. **Parsing Data**: Mengubah data JSON atau Form yang dikirim klien agar bisa dibaca di `req.body`.
4. **Error Handling**: Menangkap kesalahan yang terjadi di aplikasi.

---

## 3. Jenis-Jenis Middleware

### A. Middleware Bawaan (Built-in)
Express menyediakan beberapa middleware siap pakai.
```javascript
app.use(express.json()); // Supaya bisa baca req.body format JSON
app.use(express.static('public')); // Supaya bisa buka file gambar/CSS di folder public
```

### B. Middleware Pihak Ketiga (Third-party)
Buatan komunitas yang bisa kita install lewat NPM. Contoh: `morgan` (untuk log) atau `cors`.
```javascript
const morgan = require('morgan');
app.use(morgan('dev')); // Mencatat log setiap request dengan rapi di terminal
```

### C. Middleware Kustom (Custom)
Buatan kita sendiri untuk kebutuhan spesifik.

```javascript
// Middleware untuk mengecek apakah user admin
const cekAdmin = (req, res, next) => {
    const role = req.headers['role'];
    if (role === 'admin') {
        next(); // Boleh lewat
    } else {
        res.status(403).send("Maaf, akses ditolak. Hanya untuk Admin!");
    }
};

// Cara pakai: Simpan di antara route dan handler
app.get('/dashboard-rahasia', cekAdmin, (req, res) => {
    res.send("Selamat datang, Admin!");
});
```

---

## 4. Urutan itu Penting!

Express menjalankan middleware **dari atas ke bawah** sesuai urutan penulisan kode.

```javascript
app.use(middlewareA);
app.use(middlewareB);

app.get('/', (req, res) => {
    res.send("Selesai");
});
```
Request akan melewati A dulu, lalu B, baru sampai ke `/`. Jika urutannya tertukar, logika aplikasi bisa berantakan (misalnya: mengecek data sebelum data itu sendiri di-parse).

## Kesimpulan

Middleware memungkinkan kita memisahkan logika "pemeriksaan" dari logika "bisnis". Hasilnya, kode kita jadi jauh lebih rapi, terorganisir, dan mudah dikelola. Ingat: **Selalu panggil next() kecuali Anda ingin menghentikan paksa request tersebut.**
