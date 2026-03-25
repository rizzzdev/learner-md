# Membuat dan Menghapus Elemen DOM

Selain memanipulasi elemen yang sudah ada, Anda juga bisa **membuat elemen HTML baru dari nol** menggunakan JavaScript dan menyisipkannya ke halaman. Ini adalah dasar dari semua fitur UI dinamis — daftar todo, komentar baru, kartu produk yang dimuat dari API, dll.

## Analogi: Tukang Kue yang Membuat Donat Baru

`document.createElement()` itu seperti membentuk adonan menjadi donat mentah. `setAttribute` dan `textContent` adalah memberi isian dan taburan. `appendChild` adalah menaruh donat matang ke atas piring (DOM). Dan `remove()` adalah membuang donat yang sudah kedaluwarsa.

## Membuat Elemen Baru

```javascript
// 1. Buat elemen baru (masih "mengambang", belum ada di halaman)
const paragrafBaru = document.createElement('p');

// 2. Beri konten dan atribut
paragrafBaru.textContent  = 'Ini adalah paragraf yang dibuat dari JavaScript!';
paragrafBaru.className    = 'paragraf-baru';
paragrafBaru.id           = 'para-1';
paragrafBaru.style.color  = '#60a5fa';

// 3. Sisipkan ke dalam DOM
const wadah = document.querySelector('#konten');
wadah.appendChild(paragrafBaru); // Ditempatkan di AKHIR wadah
```

## Metode Penyisipan Modern

```javascript
const daftar = document.querySelector('#daftar-tugas');
const itemBaru = document.createElement('li');
itemBaru.textContent = 'Belajar DOM';

// appendChild: di akhir elemen induk
daftar.appendChild(itemBaru);

// prepend: di AWAL elemen induk
daftar.prepend(itemBaru);

// insertBefore: sebelum elemen referensi
const itemKedua = daftar.querySelector('li:nth-child(2)');
daftar.insertBefore(itemBaru, itemKedua);

// after / before: sisipkan SETELAH / SEBELUM elemen yang dipilih (bukan di dalam)
const judul = document.querySelector('h1');
judul.after(itemBaru);  // itemBaru disisipkan setelah h1 (bukan di dalam h1)

// insertAdjacentHTML: cara cepat sisipkan HTML string
wadah.insertAdjacentHTML('beforeend', '<p class="baru">Halo!</p>');
// Posisi: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
```

## Contoh Nyata: Aplikasi Todo List

```javascript
const inputTugas  = document.querySelector('#input-tugas');
const daftarTugas = document.querySelector('#daftar-tugas');
const btnTambah   = document.querySelector('#btn-tambah');

function buatItemTugas(teks) {
    const li = document.createElement('li');
    li.className = 'item-tugas';
    
    // Buat checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        span.classList.toggle('selesai'); // Toggle tampilan coret
    });
    
    // Buat teks tugas
    const span = document.createElement('span');
    span.textContent = teks;
    
    // Buat tombol hapus
    const btnHapus = document.createElement('button');
    btnHapus.textContent = '🗑️';
    btnHapus.className = 'btn-hapus';
    btnHapus.addEventListener('click', () => {
        li.remove(); // Hapus item secara langsung!
    });
    
    // Rakit semua komponen ke dalam li
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnHapus);
    
    return li;
}

btnTambah.addEventListener('click', () => {
    const teks = inputTugas.value.trim();
    if (!teks) return; // Jangan tambah jika kosong
    
    const itemBaru = buatItemTugas(teks);
    daftarTugas.appendChild(itemBaru);
    
    inputTugas.value = ''; // Reset input
    inputTugas.focus();    // Fokus kembali ke input
});
```

## Menghapus Elemen

```javascript
const elemen = document.querySelector('.kartu-usang');

// Cara Modern: langsung hapus
elemen.remove();

// Cara Lama (masih valid): minta induknya untuk hapus
elemen.parentNode.removeChild(elemen);

// Menghapus SEMUA child dari sebuah elemen
const wadah = document.querySelector('#wadah');
wadah.innerHTML = ''; // Cepat tapi potensi memory leak

// Cara yang lebih bersih
while (wadah.firstChild) {
    wadah.firstChild.remove();
}
```

## Kloning Elemen

```javascript
// Salin elemen beserta semua atributnya
const kartu   = document.querySelector('.kartu-template');
const salinan = kartu.cloneNode(true); // true = salin juga seluruh isi dalamnya

// Modifikasi salinan
salinan.querySelector('.judul-kartu').textContent = 'Produk Baru';
salinan.querySelector('.harga-kartu').textContent = 'Rp 299.000';

// Sisipkan salinan ke wadah
document.querySelector('#grid-produk').appendChild(salinan);
```
