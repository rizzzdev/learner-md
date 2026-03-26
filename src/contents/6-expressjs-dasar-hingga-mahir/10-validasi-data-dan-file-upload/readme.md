# Validasi Data dan File Upload: Filter Air dan Kotak Surat

Aplikasi yang tangguh tidak akan membiarkan sembarang data masuk ke servernya. Kita harus menyaring data (Validasi) dan menyediakan tempat yang aman untuk menerima kiriman file (Upload).

## 1. Validasi Data

Analogi: **Filter Air**. Sebelum air dari tanah masuk ke dalam rumah Anda, ada filter yang menyaring lumpur, kuman, dan kotoran. Hanya air bersih yang boleh masuk ke keran. Begitu juga data dari user.

### Menggunakan `express-validator`

Library ini sangat populer karena mudah digunakan sebagai middleware.

```javascript
const { body, validationResult } = require('express-validator');

app.post('/daftar', [
    // Aturan filter
    body('email').isEmail().withMessage('Format email tidak valid!'),
    body('pass').isLength({ min: 5 }).withMessage('Password minimal 5 karakter'),
], (req, res) => {
    // Cek hasil filter
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ kesalahan: errors.array() });
    }
    
    res.send("Data Anda bersih dan sudah kami terima!");
});
```

---

## 2. File Upload

Analogi: **Kotak Surat Depan Rumah**. Orang tidak bisa masuk ke dalam rumah, tapi mereka bisa menaruh paket atau surat di kotak yang sudah Anda sediakan di luar.

Untuk menangani upload file (gambar, dokumen) di Express, kita biasanya menggunakan library bernama **Multer**.

### Setup Multer

```javascript
const multer = require('multer');

// Tentukan mau ditaruh di mana filenya
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Folder tempat menyimpan
    },
    filename: function (req, file, cb) {
        // Beri nama unik agar tidak tertimpa
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });
```

### Route untuk Upload

```javascript
// 'foto' adalah nama field di form HTML kita
app.post('/upload-profil', upload.single('foto'), (req, res) => {
    // Info tentang file ada di 'req.file'
    console.log(req.file);
    res.send("Foto profil berhasil di-upload!");
});
```

---

## 3. Kombinasi yang Aman

Saat user upload, kita JANGAN PERNAH percaya begitu saja. Selalu lakukan pemeriksaan ini:
1. **Cek Ukuran**: Jangan biarkan orang upload file 1GB yang bisa membuat server penuh.
2. **Cek Format**: Pastikan yang masuk adalah Gambar (JPG/PNG), bukan file virus (EXE).

```javascript
const uploadAman = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Maksimal 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
            cb(null, true);
        } else {
            cb(new Error('Hanya boleh file gambar saja!'), false);
        }
    }
});
```

## Kesimpulan

Validasi dan Upload adalah "pintu" interaksi langsung dengan user. Dengan filter yang ketat dan prosedur yang benar, aplikasi Anda akan tetap aman dari serangan data palsu maupun file berbahaya. Ingat: **Don't Trust User Input!** (Jangan pernah percaya input dari user!)
