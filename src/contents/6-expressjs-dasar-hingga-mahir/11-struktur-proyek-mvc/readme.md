# Struktur Proyek MVC: Rak Lemari yang Terorganisir

Saat aplikasi Anda bertambah besar, meletakkan semua kode dalam satu file `index.js` adalah bencana. Anda akan bingung mencari baris kode tertentu. Solusinya adalah menggunakan pola **MVC (Model-View-Controller)**.

## Analogi: Rak Lemari Pakaian

Bayangkan sebuah lemari pakaian:
- **Model (Bahan)**: Adalah gudang kain/bahan mentah. Tidak ada bentuknya, hanya bahan baku.
- **View (Tampilan)**: Adalah cermin dan cara baju itu terlihat saat dipakai. Ini yang dilihat orang luar.
- **Controller (Otak)**: Adalah Anda yang memilih baju mana yang cocok untuk dipakai hari ini, mengambilnya dari lemari, dan memakainya di depan cermin.

MVC memisahkan Data (Model), Tampilan (View), dan Logika (Controller) agar tidak saling berantakan.

---

## 1. Struktur Folder Standar

```text
my-app/
├── controllers/    # Logika bisnis (Otak)
│   └── userController.js
├── models/         # Struktur database (Data)
│   └── userModel.js
├── views/          # Template HTML (Tampilan)
│   └── profile.ejs
├── routes/         # Alamat URL
│   └── userRoute.js
├── public/         # File statis (CSS/JS/Img)
└── index.js        # File utama (Pintu masuk)
```

---

## 2. Cara Kerja MVC

1. **Routes**: Menentukan alamat URL. Jika ada yang buka `/user`, panggil fungsi di Controller.
2. **Controller**: Melakukan perintah. "Hei Model, tolong ambilkan data user ID 1!". Setelah dapat datanya, "Hei View, tolong tampilkan data ini ya!".
3. **Model**: Satu-satunya yang boleh berbicara dengan database. Mengambil atau menyimpan data sesuai perintah Controller.
4. **View**: Menerima data dari Controller dan menampilkannya di layar user secara cantik.

---

## 3. Contoh Kode MVC

### Model (`models/userModel.js`)
```javascript
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    nama: String, email: String
});
module.exports = mongoose.model('User', userSchema);
```

### Controller (`controllers/userController.js`)
```javascript
const User = require('../models/userModel');

exports.ambilProfil = async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.render('profile', { user: data });
    } catch (err) {
        res.status(500).send("Gagal ambil data.");
    }
};
```

### Routes (`routes/userRoute.js`)
```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profil/:id', userController.ambilProfil);

module.exports = router;
```

---

## Mengapa Harus MVC?

1. **Rapi (Clean Code)**: Setiap file punya tugas yang spesifik. Tidak ada file yang berisi 1.000 baris kode campuran.
2. **Kolaborasi Tim**: Programmer Backend bisa fokus di Model & Controller, sementara Frontend Developer fokus di folder View.
3. **Re-usable**: Satu Model bisa dipakai untuk banyak Controller. Satu Controller bisa melayani banyak Route.

## Kesimpulan

Pola MVC membuat aplikasi Express Anda menjadi "Elegan". Anda tidak lagi membuat "Spaghetti Code" yang saling membelit. Belajar struktur MVC adalah langkah penting untuk menjadi seorang **Professional Backend Developer**.
