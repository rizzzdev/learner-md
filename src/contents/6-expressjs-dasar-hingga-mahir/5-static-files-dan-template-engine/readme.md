# Static Files dan Template Engine: Galeri Foto vs Mesin Cetak Undangan

Dalam membangun website, kita butuh dua hal: menyajikan file yang sudah jadi (statis) dan membuat halaman yang datanya bisa berubah-berubah (dinamis).

## 1. Static Files (File Statis)

Analogi: **Galeri Foto**. Di galeri, foto yang dipajang adalah file yang sudah jadi. Siapapun yang datang akan melihat foto yang sama persis. Tidak ada yang berubah di dalam foto tersebut.

Dalam Express, file statis adalah file yang langsung dikirim ke browser tanpa diolah lagi oleh server, seperti:
- Gambar (PNG, JPG, SVG)
- File CSS (Style website)
- File JavaScript sisi klien (Interaktivitas browser)

### Cara Mengaktifkan Folder Statis

Cukup satu baris middleware bawaan Express:

```javascript
// Kita beritahu Express: "Semua file di folder 'public' boleh diakses langsung"
app.use(express.static('public'));
```

Sekarang, jika Anda punya file `public/css/style.css`, browser bisa mengaksesnya di `http://localhost:3000/css/style.css`.

---

## 2. Template Engine (Halaman Dinamis)

Analogi: **Mesin Cetak Undangan**. Anda punya satu "template" desain undangan (layout). Namun, nama tamu, alamat, dan tanggalnya bisa berbeda-beda untuk setiap orang. Mesin cetak akan menggabungkan template dengan data tamu menjadi kartu undangan yang siap kirim.

Template Engine memungkinkan kita menulis HTML yang bisa disisipi variabel dari JavaScript. Salah satu yang paling populer adalah **EJS (Embedded JavaScript)**.

### Cara Menggunakan EJS

1. Install dulu: `npm install ejs`
2. Setting di Express:

```javascript
app.set('view engine', 'ejs');
// Secara default, Express akan mencari file di dalam folder 'views'
```

3. Buat file template di `views/index.ejs`:

```html
<!-- views/index.ejs -->
<html>
  <body>
    <h1>Halo, <%= username %>!</h1>
    <p>Status Anda: <%= status %></p>
    
    <ul>
      <% items.forEach(function(item) { %>
        <li><%= item %></li>
      <% }); %>
    </ul>
  </body>
</html>
```

4. Kirim data dari route handler:

```javascript
app.get('/dashboard', (req, res) => {
    // Gunakan res.render untuk menggabungkan template + data
    res.render('index', {
        username: "Budi Santoso",
        status: "Aktif",
        items: ["Kopi", "Teh", "Susu"]
    });
});
```

---

## Perbedaan Utama

| Fitur | Static Files | Template Engine |
|---|---|---|
| **Sifat** | Tetap (Tidak berubah) | Dinamis (Bisa berubah) |
| **Kecepatan** | Sangat Cepat (Tanpa proses) | Butuh proses pengolahan data |
| **Kegunaan** | Aset pendukung (CSS, Image) | Isi utama halaman (Data user, Blog post) |
| **Metode Response** | Otomatis (via Middleware) | Manual (via `res.render`) |

## Kesimpulan

Gunakan **Static Files** untuk aset-aset yang sifatnya "pajangan" dan tidak berubah-ubah. Gunakan **Template Engine** ketika isi halaman HTML Anda sangat bergantung pada data yang ada di server atau database (misal: "Selamat datang, [Nama User]").
