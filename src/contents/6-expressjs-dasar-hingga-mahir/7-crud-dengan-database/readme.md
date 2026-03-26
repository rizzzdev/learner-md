# CRUD dengan Database: Buku Inventaris Gudang

Setiap aplikasi yang berguna pasti butuh menyimpan data. Tanpa database, semua data yang Anda masukkan ke aplikasi akan hilang begitu server dimatikan.

## Analogi: Buku Inventaris Gudang

Bayangkan Anda mengelola sebuah gudang besar:
1. **Create (Menambah)**: Ada barang baru datang, Anda mencatatnya di buku inventaris.
2. **Read (Membaca)**: Bos bertanya: "Ada berapa stok bantal?", Anda membuka buku dan membacanya.
3. **Update (Mengubah)**: Ada barang yang rusak atau jumlahnya berubah, Anda menghapus angka lama dan menulis angka baru di buku.
4. **Delete (Menghapus)**: Barang sudah terjual habis dan tidak akan ada lagi, Anda mencoretnya dari buku.

Dalam dunia web, proses ini kita singkat menjadi **CRUD** (Create, Read, Update, Delete).

---

## 1. Menghubungkan ke Database

Ada banyak pilihan database, tapi yang paling sering digunakan bersama Node.js adalah:
- **Relational (SQL)**: Seperti MySQL atau PostgreSQL (Datanya kaku seperti tabel Excel).
- **Non-Relational (NoSQL)**: Seperti MongoDB (Datanya fleksibel seperti objek JSON).

Contoh menghubungkan Express ke MongoDB menggunakan library **Mongoose**:

```javascript
const mongoose = require('mongoose');

// Connect ke database lokal bernama 'toko_online'
mongoose.connect('mongodb://localhost:27017/toko_online')
    .then(() => console.log("Berhasil terhubung ke gudang data!"))
    .catch((err) => console.log("Gagal masuk ke gudang: " + err));
```

---

## 2. Membuat Skema (Schema)

Sebelum mencatat data, kita buat dulu "format" catatannya agar seragam.

```javascript
const produkSchema = new mongoose.Schema({
    nama: String,
    harga: Number,
    stok: Number,
    kategori: String
});

const Produk = mongoose.model('Produk', produkSchema);
```

---

## 3. Melakukan Operasi CRUD

Mari kita buat API untuk mengelola produk di gudang kita:

### A. Create (POST)
```javascript
app.post('/produk', async (req, res) => {
    const dataBaru = new Produk(req.body);
    const hasil = await dataBaru.save(); // Simpan ke database
    res.status(201).json(hasil);
});
```

### B. Read (GET)
```javascript
// Ambil semua produk
app.get('/produk', async (req, res) => {
    const semuaProduk = await Produk.find();
    res.json(semuaProduk);
});

// Ambil satu produk berdasarkan ID
app.get('/produk/:id', async (req, res) => {
    const satuProduk = await Produk.findById(req.params.id);
    res.json(satuProduk);
});
```

### C. Update (PUT/PATCH)
```javascript
app.patch('/produk/:id', async (req, res) => {
    const produkDiupdate = await Produk.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true } // Supaya mengembalikan data yang SUDAH diupdate
    );
    res.json(produkDiupdate);
});
```

### D. Delete (DELETE)
```javascript
app.delete('/produk/:id', async (req, res) => {
    await Produk.findByIdAndDelete(req.params.id);
    res.status(204).send(); // Sukses terhapus
});
```

---

## Tips Penting

1. **Gunakan Async/Await**: Operasi database butuh waktu (asinkronus). Selalu gunakan `await` agar server tidak error saat data belum selesai diambil.
2. **Keamanan**: Jangan pernah menyimpan password mentah-mentah ke database. Gunakan teknik hashing (seperti library `bcrypt`) yang akan dibahas di materi Autentikasi.

## Kesimpulan

CRUD adalah pondasi dari hampir semua aplikasi di internet (Instagram, Tokopedia, Facebook, dll). Dengan menguasai CRUD dan Database, Anda sudah bisa membuat aplikasi yang benar-benar bisa digunakan oleh orang banyak dan datanya tersimpan dengan aman.
