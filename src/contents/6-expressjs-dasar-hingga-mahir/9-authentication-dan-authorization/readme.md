# Authentication dan Authorization: KTP dan Hak Akses

Keamanan adalah jantung dari aplikasi web profesional. Kita harus bisa memastikan siapa yang masuk ke aplikasi kita dan apa saja yang boleh mereka lakukan di dalamnya.

## 1. Perbedaan Utama: Auth vs AuthZ

Analogi: **Masuk ke Gedung Kantor Pemerintah**.
- **Authentication (Siapa Anda?)**: Petugas di gerbang meminta KTP/Paspor Anda. Setelah dicek dan benar itu Anda, Anda diberi kartu akses (Log In).
- **Authorization (Anda Boleh Ke Mana?)**: Meskipun Anda sudah masuk gedung, Anda tidak boleh masuk ke ruang Brankas Emas atau Ruang Direktur. Kartu akses Anda hanya bisa membuka pintu Ruang Tamu dan Kantin.

Authentication = **Login**. Authorization = **Role/Izin**.

---

## 2. Cara Kerja JWT (JSON Web Token)

Dalam Express, metode yang paling modern untuk mengelola "kartu akses" digital adalah menggunakan **JWT**.

1. Pengguna mengirimkan username & password ke server.
2. Server mencocokkan di database. Jika benar, server membuat sebuah "Karcis Digital" bernama **Token**.
3. Token tersebut dikirim balik ke browser dan disimpan (biasanya di LocalStorage).
4. Setiap kali browser ingin meminta data rahasia, ia harus menyertakan Token tersebut.

---

## 3. Implementasi Login

```javascript
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Cek di database (Ini contoh sederhana)
    if (username === 'admin' && password === '12345') {
        // Buat Token yang berlaku selama 1 jam
        const token = jwt.sign(
            { id: 1, role: 'admin' }, 
            'RAHASIA_NEGARA', 
            { expiresIn: '1h' }
        );
        
        res.json({ pesan: "Login Sukses!", token: token });
    } else {
        res.status(401).send("Username atau Password salah!");
    }
});
```

---

## 4. Middleware untuk Proteksi Halaman

Kita gunakkan middleware untuk mencegat orang yang tidak punya token.

```javascript
const saringPengunjung = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).send("Harap login terlebih dahulu!");
    }
    
    // Verifikasi apakah tokennya asli atau palsu
    jwt.verify(token, 'RAHASIA_NEGARA', (err, user) => {
        if (err) return res.status(401).send("Token tidak valid!");
        
        req.user = user; // Simpan data user ke request agar bisa dipakai nanti
        next();
    });
};

// Pasang di route yang bener-bener rahasia
app.get('/rahasia-perusahaan', saringPengunjung, (req, res) => {
    res.send("Ini adalah data rahasia perusahaan khusus untuk user ID " + req.user.id);
});
```

---

## 5. Membuat Role (Authorization)

Ingat analogi satpam? Kita bisa membagi akses berdasarkan Role.

```javascript
const hanyaAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send("Hanya Admin yang boleh menghapus data!");
    }
    next();
};

app.delete('/pengguna/:id', saringPengunjung, hanyaAdmin, (req, res) => {
    // Proses hapus data...
    res.send("Data berhasil dihapus oleh Admin.");
});
```

## Kesimpulan

Autentikasi dan Otorisasi adalah tembok pertahanan aplikasi Anda. Dengan JWT dan Middleware, Anda bisa membuat sistem yang aman dan bisa dipercaya. Ingat: **Jangan pernah simpan rahasia penting (seperti password) tanpa enkripsi di database!**
