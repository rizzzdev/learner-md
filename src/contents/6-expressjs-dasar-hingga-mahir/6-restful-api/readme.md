# RESTful API: Katalog yang Teratur

REST (Representational State Transfer) adalah cara standar bagi dua sistem komputer (seperti App Mobile dan Server) untuk berbicara satu sama lain melalui internet.

## Analogi: Katalog Produk Perpustakaan

Bayangkan Anda mengelola perpustakaan:
- Jika seseorang ingin **melihat** daftar buku, mereka melihat kartu katalog (GET).
- Jika ada buku baru, Anda **menambahkannya** ke dalam daftar (POST).
- Jika ada buku yang halamannya robek, Anda **memperbaikinya** (PUT/PATCH).
- Jika ada buku yang sudah tidak layak, Anda **membuangnya** (DELETE).

Semua aksi di atas dilakukan terhadap satu "benda" yang sama: **Buku**. Dalam REST, "benda" ini disebut **Resource**.

---

## 1. Aturan Dasar REST

Sistem yang RESTful harus mengikuti beberapa aturan sederhana:
1. **Pemisahan Klien & Server**: Klien fokus pada UI, Server fokus pada data.
2. **Stateless**: Server tidak perlu mengingat history request sebelumnya. Setiap request harus membawa semua informasi yang dibutuhkan.
3. **URL yang Jelas**: Menggunakan kata benda (noun) untuk alamatnya, bukan kata kerja.
   - ✅ `GET /produk` (Benar)
   - ❌ `GET /ambilSemuaProduk` (Salah)

---

## 2. Metode HTTP (Kata Kerja Digital)

REST menggunakan "bahasa" HTTP untuk menentukan tindakan:

| Metode | Aksi | Analogi |
|---|---|---|
| **GET** | Mendapatkan / Membaca data | "Saya mau pinjam buku nomor 5." |
| **POST** | Membuat data baru | "Ini ada titipan buku baru untuk rak." |
| **PUT** | Mengganti seluruh data (Update total) | "Tukar buku ini dengan buku baru yang lebih update." |
| **PATCH** | Mengubah sebagian data (Update kecil) | "Halaman 5 buku ini typo, tolong koreksi sedikit." |
| **DELETE** | Menghapus data | "Buku ini sudah berjamur, bakar saja." |

---

## 3. Implementasi dengan Express

Berikut adalah contoh bagaimana kita membuat endpoint REST untuk mengelola "Daftar Tugas" (Todo):

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// 1. GET /todos - Ambil semua tugas
app.get('/todos', (req, res) => {
    res.json(database.todos);
});

// 2. GET /todos/:id - Ambil satu tugas spesifik
app.get('/todos/:id', (req, res) => {
    const todo = database.todos.find(t => t.id === parseInt(req.params.id));
    res.json(todo);
});

// 3. POST /todos - Tambah tugas baru
app.post('/todos', (req, res) => {
    const baru = { id: Date.now(), teks: req.body.teks };
    database.todos.push(baru);
    res.status(201).json(baru);
});

// 4. PUT /todos/:id - Update total tugas
app.put('/todos/:id', (req, res) => {
    // Logika update total...
});

// 5. DELETE /todos/:id - Hapus tugas
app.delete('/todos/:id', (req, res) => {
    database.todos = database.todos.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send(); // 204 = Sukses tapi tidak ada konten untuk dikirim balik
});

app.listen(3000);
```

---

## Kesimpulan

RESTful API membuat aplikasi Anda terstruktur, mudah dipahami oleh programmer lain, dan fleksibel. Satu server API yang sama bisa melayani Website, Aplikasi Android, hingga Aplikasi iPhone karena semuanya menggunakan "bahasa" REST yang sama.
