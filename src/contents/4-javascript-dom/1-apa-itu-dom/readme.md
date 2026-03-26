# Apa Itu DOM?

DOM (Document Object Model) adalah representasi **pohon hierarki** dari sebuah halaman HTML yang dibuat oleh browser. Ketika browser memuat file HTML, ia tidak hanya menampilkannya — ia mengubahnya menjadi sebuah **struktur data berbentuk pohon** yang bisa dibaca dan dimanipulasi oleh JavaScript.

## Analogi: Denah Rumah

Bayangkan sebuah rumah. Rumah itu punya satu pintu utama (elemen `<html>`), di dalamnya ada ruang depan (`<head>`) dan ruang keluarga (`<body>`). Di ruang keluarga ada sofa (`<div>`), meja (`<table>`), dan TV (`<video>`). Di atas sofa ada bantal (`<p>`) bertuliskan sesuatu (teks node).

DOM adalah **denah rumah itu dalam bentuk digital** — peta yang menggambarkan setiap "ruangan" dan "perabotan" beserta hubungan induk-anak di antara mereka.

## Pohon DOM

Untuk HTML ini:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Halaman Saya</title>
  </head>
  <body>
    <h1 id="judul">Halo Dunia</h1>
    <p class="paragraf">Ini adalah teks.</p>
  </body>
</html>
```

Browser membangun pohon ini:
```
Document
└── html
    ├── head
    │   └── title
    │       └── "Halaman Saya" (Text Node)
    └── body
        ├── h1 [id="judul"]
        │   └── "Halo Dunia" (Text Node)
        └── p [class="paragraf"]
            └── "Ini adalah teks." (Text Node)
```

## Tipe-Tipe Node

```javascript
// Setiap bagian dari pohon DOM adalah sebuah "Node"
// Ada beberapa jenis node:

// 1. Element Node — elemen HTML biasa (<div>, <p>, <h1>, dll.)
const heading = document.getElementById('judul');
console.log(heading.nodeType);  // 1 = ELEMENT_NODE
console.log(heading.nodeName);  // "H1"

// 2. Text Node — isi teks di dalam elemen
const teksNode = heading.firstChild;
console.log(teksNode.nodeType); // 3 = TEXT_NODE
console.log(teksNode.nodeValue); // "Halo Dunia"

// 3. Attribute Node — atribut elemen (sudah jarang digunakan langsung)
console.log(heading.getAttribute('id')); // "judul"
```

## Objek `document`: Pintu Masuk ke DOM

`document` adalah objek global yang merepresentasikan seluruh halaman web. Ia adalah titik awal untuk semua operasi DOM.

```javascript
// Informasi dasar tentang halaman
console.log(document.title);     // "Halaman Saya"
console.log(document.URL);       // URL halaman saat ini
console.log(document.domain);    // Domain website
console.log(document.body);      // Referensi ke elemen <body>
console.log(document.head);      // Referensi ke elemen <head>

// Ubah judul halaman secara dinamis!
document.title = "Judul Baru dari JavaScript";
```

## Mengapa DOM Sangat Penting?

Tanpa DOM, JavaScript tidak bisa berinteraksi sama sekali dengan halaman web. DOM-lah yang memungkinkan:
- Mengubah teks di halaman tanpa reload
- Menampilkan atau menyembunyikan elemen
- Bereaksi terhadap klik, scroll, input pengguna
- Membangun elemen baru secara dinamis (seperti daftar todo, komentar, dll.)

Semua yang Anda lihat di website modern — dropdown menu, modal popup, dark mode toggle, animasi — semuanya bermuara ke manipulasi DOM.
