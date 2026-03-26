# Memanipulasi Konten DOM

Setelah berhasil menemukan elemen, langkah selanjutnya adalah mengubah isinya. JavaScript menyediakan beberapa properti untuk membaca dan mengubah konten elemen.

## Analogi: Papan Tulis di Kelas

Elemen HTML adalah **papan tulis**. `innerText` adalah spidol yang membaca/menulis teks murni saja. `innerHTML` adalah spidol yang bisa menulis teks DAN menggambar tabel, kotak, dan gambar sekaligus. `textContent` adalah penggaris yang mengukur panjang tulisan mentah.

## `textContent` vs `innerText` vs `innerHTML`

```javascript
// HTML: <div id="kotak"> Halo <strong>Dunia</strong>! </div>
const kotak = document.getElementById('kotak');

// textContent: teks MENTAH apa adanya, termasuk spasi tersembunyi
console.log(kotak.textContent); // " Halo Dunia! "

// innerText: teks yang TERLIHAT oleh pengguna (sadar CSS)
console.log(kotak.innerText);   // "Halo Dunia!"

// innerHTML: seluruh konten termasuk TAG HTML
console.log(kotak.innerHTML);   // " Halo <strong>Dunia</strong>! "
```

### Mengubah Konten

```javascript
const judul = document.querySelector('#judul');

// Mengubah ke teks biasa (tag HTML akan ditampilkan sebagai teks literal)
judul.textContent = "Judul Baru Saya";

// Mengubah dengan HTML — hati-hati dengan XSS!
judul.innerHTML = "Judul <em>Baru</em> dengan <strong>Gaya</strong>";
```

## Atribut Elemen

```javascript
// HTML: <img id="foto" src="lama.jpg" alt="Foto Lama" data-id="42">
const gambar = document.getElementById('foto');

// Membaca atribut
console.log(gambar.getAttribute('src'));      // "lama.jpg"
console.log(gambar.getAttribute('alt'));      // "Foto Lama"
console.log(gambar.getAttribute('data-id')); // "42"

// Mengubah atribut
gambar.setAttribute('src', 'baru.jpg');
gambar.setAttribute('alt', 'Foto Baru yang Keren');

// Cek apakah atribut ada
console.log(gambar.hasAttribute('data-id')); // true

// Hapus atribut
gambar.removeAttribute('data-id');

// Cara singkat untuk atribut standar (src, href, id, value, dll.)
gambar.src = 'foto-profil.jpg'; // Sama seperti setAttribute('src', ...)
```

## Data Attributes (`data-*`)

Data attribute sangat berguna untuk menyimpan data kustom langsung di elemen HTML.

```javascript
// HTML: <button class="btn-hapus" data-id="123" data-nama="Laptop Gaming">Hapus</button>
const tombolHapus = document.querySelector('.btn-hapus');

// Akses via dataset — otomatis konversi dari kebab-case ke camelCase
console.log(tombolHapus.dataset.id);    // "123" (string!)
console.log(tombolHapus.dataset.nama);  // "Laptop Gaming"

// Contoh nyata: hapus produk dari daftar berdasarkan data-id
tombolHapus.addEventListener('click', function() {
    const idProduk = parseInt(this.dataset.id); // Konversi ke number
    hapusProduk(idProduk);
});
```

## Properti Formulir

```javascript
// HTML: <input id="nama" type="text" value="Nilai Awal" placeholder="Nama Anda">
const inputNama = document.getElementById('nama');

// Membaca nilai yang sedang diketik pengguna
console.log(inputNama.value);       // Nilai saat ini

// Mengubah nilai input secara programatik
inputNama.value = "Budi Santoso";

// Placeholder
console.log(inputNama.placeholder); // "Nama Anda"

// Checkbox dan Radio
const checkbox = document.querySelector('#setuju');
console.log(checkbox.checked);  // true/false
checkbox.checked = true;         // Centang secara programatik

// Select/Dropdown
const pilihan = document.querySelector('#kota');
console.log(pilihan.value);         // Nilai yang dipilih
console.log(pilihan.selectedIndex); // Index pilihan yang aktif
```

## ⚠️ Peringatan: Bahaya `innerHTML` dan XSS

```javascript
// ❌ SANGAT BERBAHAYA jika konten berasal dari input pengguna!
const inputPengguna = '<img src=x onerror="alert(\'Saya di-hack!\')">';
kotak.innerHTML = inputPengguna; // Script berbahaya bisa dieksekusi!

// ✅ Aman: gunakan textContent untuk teks biasa
kotak.textContent = inputPengguna; // Ditampilkan sebagai teks literal, tidak dieksekusi

// ✅ Aman: gunakan DOM API untuk membuat elemen
const img = document.createElement('img');
img.src = urlGambar; // Browser otomatis sanitasi
```
