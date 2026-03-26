# Request dan Response: Komunikasi Antara Pelanggan dan Pelayan

Dalam dunia web development, komunikasi antara Browser (Klien) dan Server mirip sekali dengan interaksi di sebuah restoran.

## Analogi: Restoran Digital

Bayangkan Anda adalah seorang **Pelanggan** yang lapar:
1. Anda datang ke restoran dan memberikan pesanan Anda (ini adalah **Request**).
2. Anda memberitahu pelayan: "Saya mau Nasi Goreng (data), pedasnya level 5 (query), dan tolong antar ke meja nomor 7 (params)."
3. **Pelayan** membawa pesanan Anda ke dapur, lalu kembali membawakan piring berisi Nasi Goreng beserta struk pembayarannya (ini adalah **Response**).

Tanpa Request, Server tidak tahu harus melakukan apa. Tanpa Response, Klien akan menunggu selamanya (hang).

---

## 1. Request (Permintaan Klien)

Objek `req` di Express berisi semua informasi tentang apa yang diinginkan oleh klien. Ada 3 cara utama klien mengirimkan data:

### A. URL Parameters (`req.params`)
Digunakan untuk data yang menjadi bagian dari alamat URL, biasanya berupa ID atau nama unik.
- **URL**: `/produk/123`
- **Kode**: `app.get('/produk/:id', ...)`
- **Analogi**: Nomor meja di restoran.

```javascript
app.get('/pengguna/:username', (req, res) => {
    const namaUser = req.params.username;
    res.send(`Melihat profil: ${namaUser}`);
});
```

### B. Query Strings (`req.query`)
Digunakan untuk filter, pencarian, atau data opsional. Ditulis setelah tanda tanya `?`.
- **URL**: `/cari?keyword=sepatu&warna=hitam`
- **Analogi**: Catatan tambahan pada pesanan ("Jangan pakai bawang", "Esnya sedikit saja").

```javascript
app.get('/search', (req, res) => {
    const { keyword, limit } = req.query;
    res.send(`Mencari ${keyword} dengan batas ${limit} hasil.`);
});
```

### C. Request Body (`req.body`)
Digunakan untuk mengirim data yang besar atau sensitif, seperti saat mengisi formulir pendaftaran atau login. Data ini tidak terlihat di URL.
- **Analogi**: Isi dari sebuah surat di dalam amplop tertutup.

```javascript
// Kita perlu middleware json agar bisa membaca body
app.use(express.json());

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    console.log(`Pendaftaran baru: ${email}`);
    res.send("Pendaftaran berhasil!");
});
```

---

## 2. Response (Balasan Server)

Objek `res` adalah alat kita untuk mengirimkan jawaban kembali ke klien.

### A. Mengirim Teks atau HTML (`res.send`)
Digunakan untuk mengirim jawaban sederhana atau potongan kode HTML.

```javascript
res.send("<h1>Halo! Selamat datang di server kami.</h1>");
```

### B. Mengirim Data JSON (`res.json`)
Sangat umum digunakan saat membangun API. Otomatis mengubah object JavaScript menjadi format JSON yang dimengerti semua bahasa pemrograman.

```javascript
res.json({
    status: "sukses",
    data: { id: 1, nama: "Budi" }
});
```

### C. Mengatur Status Code (`res.status`)
Memberitahu klien apakah permintaan mereka berhasil atau gagal menggunakan kode standar.
- `200`: OK (Berhasil)
- `201`: Created (Data baru berhasil dibuat)
- `400`: Bad Request (Client salah kirim data)
- `404`: Not Found (Halaman/Data tidak ada)
- `500`: Internal Server Error (Server kita yang error)

```javascript
res.status(404).json({ error: "Barang tidak ditemukan" });
```

---

## Contoh Implementasi Lengkap

Mari kita buat server mini yang melayani pesanan "Kopi":

```javascript
const express = require('express');
const app = express();
app.use(express.json());

app.post('/pesan-kopi/:tipe', (req, res) => {
    const tipeKopi = req.params.tipe; // params
    const jumlah = req.query.qty || 1; // query (default 1)
    const catatan = req.body.catatan;   // body

    if (tipeKopi === 'racun') {
        return res.status(400).send("Maaf, kami tidak menjual kopi itu.");
    }

    res.json({
        pesan: `Anda memesan ${jumlah} cangkir ${tipeKopi}`,
        detail: catatan ? `Catatan: ${catatan}` : "Tanpa catatan tambahan",
        estimasi_waktu: "10 Menit"
    });
});

app.listen(3000, () => console.log("Server Restoran Kopi berjalan!"));
```

Dengan memahami Request dan Response, Anda sudah menguasai 50% cara kerja internet!
