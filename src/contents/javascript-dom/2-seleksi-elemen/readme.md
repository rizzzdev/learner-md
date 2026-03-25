# Seleksi Elemen DOM

Sebelum bisa memanipulasi sebuah elemen, Anda harus "menemukannya" terlebih dahulu. JavaScript menyediakan beberapa metode untuk memilih elemen dari pohon DOM.

## Analogi: Remote TV dan Nama Tombol

Bayangkan DOM adalah gedung bertingkat dan Anda adalah sekuriti. Untuk menemukan seseorang, Anda bisa mencarinya berdasarkan: nomor KTP (`getElementById`), nomor badge khusus (`querySelector`), atau lantai kerjanya (`getElementsByClassName`).

## Metode Seleksi Utama

### `getElementById` — Paling Cepat, Berdasarkan ID Unik

```javascript
// HTML: <h1 id="judul-utama">Selamat Datang</h1>
const judulEl = document.getElementById('judul-utama');
console.log(judulEl);           // <h1 id="judul-utama">Selamat Datang</h1>
console.log(judulEl.innerText); // "Selamat Datang"
```

### `querySelector` — Paling Fleksibel, Menggunakan Selektor CSS

```javascript
// Ambil elemen PERTAMA yang cocok dengan selektor CSS apa pun
const btn     = document.querySelector('#tombol-kirim');       // by ID
const paragraf = document.querySelector('.deskripsi');          // by class
const input   = document.querySelector('input[type="email"]'); // by atribut
const item    = document.querySelector('ul li:first-child');   // by relasi
const nested  = document.querySelector('.kartu .judul');       // nested
```

### `querySelectorAll` — Ambil Semua yang Cocok (NodeList)

```javascript
// Mengembalikan NodeList (mirip Array) dari SEMUA elemen yang cocok
const semuaKartu = document.querySelectorAll('.kartu');

console.log(semuaKartu.length); // Jumlah card yang ditemukan

// Iterasi dengan forEach
semuaKartu.forEach((kartu, index) => {
    console.log(`Kartu ke-${index + 1}:`, kartu.innerText);
});

// Konversi ke Array asli jika perlu method array (map, filter, dll.)
const arrayKartu = Array.from(semuaKartu);
const kartuteks = arrayKartu.map(k => k.innerText);
```

### Metode Lama (Masih Valid)

```javascript
// getElementsByClassName — Mengembalikan HTMLCollection "hidup"
const paragraf = document.getElementsByClassName('paragraf');

// getElementsByTagName — Semua elemen dengan tag tertentu
const semuaDiv = document.getElementsByTagName('div');
const semuaInput = document.getElementsByTagName('input');

// HTMLCollection vs NodeList:
// - HTMLCollection: otomatis update jika DOM berubah (live)
// - NodeList dari querySelectorAll: snapshot statis (tidak live)
```

## Memilih Dari Dalam Elemen (Scoped Query)

```javascript
// Tidak harus selalu dari document! Bisa dari elemen manapun
const form = document.querySelector('#form-registrasi');

// Sekarang cari hanya di dalam form itu saja
const inputNama  = form.querySelector('input[name="nama"]');
const inputEmail = form.querySelector('input[name="email"]');
const tombol     = form.querySelector('button[type="submit"]');

// Ini lebih efisien dan terhindar dari konflik nama class/ID global
```

## Tabel Perbandingan Metode Seleksi

| Method | Selector | Kembali | Performa |
|---|---|---|---|
| `getElementById()` | ID string | Satu element / null | ⚡ Tercepat |
| `querySelector()` | CSS selector | Satu element / null | ✅ Fleksibel |
| `querySelectorAll()` | CSS selector | NodeList (static) | ✅ Fleksibel |
| `getElementsByClassName()` | Class string | HTMLCollection (live) | ⚡ Cepat |
| `getElementsByTagName()` | Tag name | HTMLCollection (live) | ⚡ Cepat |

## Tips Praktis

```javascript
// Gunakan konstanta dan nama deskriptif
const tombolSubmit    = document.querySelector('#btn-submit');
const daftarProduk    = document.querySelector('#product-list');
const inputPencarian  = document.querySelector('.search-input');

// Cek apakah elemen ditemukan sebelum digunakan!
if (tombolSubmit) {
    tombolSubmit.addEventListener('click', () => {
        console.log('Tombol diklik!');
    });
} else {
    console.warn('Tombol submit tidak ditemukan di halaman ini.');
}
```
