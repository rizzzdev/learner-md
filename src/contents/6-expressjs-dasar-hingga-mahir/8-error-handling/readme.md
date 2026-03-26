# Error Handling: Jaring Pengaman Akrobat

Dalam coding, error bukanlah musuh, melainkan informan. Aplikasi yang bagus bukanlah aplikasi yang tidak pernah error, melainkan aplikasi yang **tahu cara menangani error** tanpa harus membuat servernya mati (crash).

## Analogi: Jaring Pengaman Akrobat

Bayangkan seorang pemain akrobat yang berjalan di atas tali.
- Jika tidak ada jaring pengaman, sekali terpeleset berarti tamat (Server Mati).
- Jika ada **Jaring Pengaman** di bawahnya, saat pemain terpeleset, ia akan jatuh ke jaring, lalu bisa bangun lagi dan melanjutkan aksinya (Server Tetap Hidup).

Error Handling di Express adalah jaring pengaman tersebut. Jika ada baris kode yang error, alur program akan "jatuh" ke fungsi penanganan error khusus kita.

---

## 1. Menangkap Error Dasar

JavaScript punya blok `try...catch` yang sangat berguna untuk menjaga kode kita.

```javascript
app.get('/hitung', (req, res) => {
    try {
        // Misal ada kesalahan logika di sini
        const hasil = dataYangTidakAda.tambah(5); 
        res.send("Hasilnya: " + hasil);
    } catch (err) {
        // Jika ada error di blok 'try', program langsung ke sini
        console.error("Waduh, ada masalah!");
        res.status(500).send("Maaf, server kami sedang pusing.");
    }
});
```

---

## 2. Middleware Error Handling Khusus

Express punya gaya sendiri untuk menangkap error secara global. Cukup buat fungsi dengan **4 parameter**: `(err, req, res, next)`.

```javascript
// Letakkan middleware ini di PALING BAWAH, setelah semua route
app.use((err, req, res, next) => {
    console.error(err.stack); // Cetak detail error di terminal server
    
    res.status(500).json({
        pesan: "Terjadi kesalahan internal pada server kami",
        error: err.message // Jangan tampilkan ini di mode produksi karena bahaya!
    });
});
```

---

## 3. Menangani Async Error

Sejak Express versi 5, error di dalam fungsi `async` otomatis ditangkap. Namun, kalau Anda memakai versi lama, Anda harus mengirim error-nya secara manual menggunakan `next()`.

```javascript
app.get('/pencarian', async (req, res, next) => {
    try {
        const data = await Database.cari(req.query.q);
        res.json(data);
    } catch (err) {
        // Kirim error ke "Jaring Pengaman" global (Middleware Error di atas)
        next(err); 
    }
});
```

---

## 4. Error 404 (Halaman Tidak Ditemukan)

Secara teknis, 404 bukanlah "error" sistem, tapi ketiadaan data. Kita bisa menanganinya dengan menaruh route "sapu jagat" di bagian paling bawah.

```javascript
// Jika tidak ada route di atas yang cocok, program akan sampai ke sini
app.use((req, res) => {
    res.status(404).send("Maaf, alamat yang Anda cari tidak ada di peta kami.");
});
```

---

## Praktek Terbaik (Best Practices)

1. **Logging**: Selalu catat error di file log agar kita bisa mengeceknya nanti (bisa gunakan library `winston` atau `morgan`).
2. **User Friendly**: Jangan pernah tampilkan detail kode yang error (stack trace) ke layar pelanggan. Cukup katakan "Server Error" dan kode status yang sesuai.
3. **Validasi Input**: Cegah error sebelum terjadi dengan memvalidasi input pengguna (materi selanjutnya).

## Kesimpulan

Dengan Error Handling yang tepat, aplikasi Anda akan menjadi jauh lebih profesional, stabil, dan terpercaya. Ingat: **Kesalahan adalah bagian dari hidup, tantangannya adalah bagaimana kita meresponnya!**
