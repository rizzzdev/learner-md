# Memanipulasi Style dan Class

Salah satu hal paling sering dilakukan dengan DOM adalah mengubah tampilan elemen — mengaktifkan dark mode, menampilkan/menyembunyikan panel, memberi feedback visual pada form, atau animasi sederhana.

## Dua Pendekatan Utama

1. **Langsung via `.style`** — untuk mengubah satu-dua properti CSS secara cepat
2. **Via `.classList`** — cara yang dianjurkan untuk UI yang lebih kompleks

## Mengubah Style Langsung

```javascript
const kotak = document.querySelector('.kotak');

// MEMBACA style inline (yang sudah ada di atribut style="...")
console.log(kotak.style.backgroundColor); // "red" (jika ada)

// MENULIS style — nama properti CSS diubah ke camelCase!
kotak.style.backgroundColor = '#3b82f6';   // background-color → backgroundColor
kotak.style.fontSize         = '18px';     // font-size → fontSize
kotak.style.borderRadius     = '12px';     // border-radius → borderRadius
kotak.style.display          = 'none';     // Sembunyikan elemen
kotak.style.display          = 'block';    // Tampilkan kembali
kotak.style.display          = '';         // Reset ke nilai CSS asli

// Membaca style yang DITERAPKAN (termasuk dari stylesheet)
const styleKomputasi = window.getComputedStyle(kotak);
console.log(styleKomputasi.fontSize);      // "16px" (nilai aktual)
console.log(styleKomputasi.color);         // "rgb(0, 0, 0)"
```

## `classList`: Mengelola Class CSS

Cara terbaik dan paling elegan — buat class CSS di stylesheet Anda, lalu tambah/hapus/toggle dari JavaScript.

```javascript
const tombol = document.querySelector('#tombol-tema');

// Memeriksa apakah class ada
console.log(tombol.classList.contains('aktif'));    // true/false

// Menambah class
tombol.classList.add('aktif');
tombol.classList.add('animasi', 'terang', 'besar'); // Bisa banyak sekaligus

// Menghapus class
tombol.classList.remove('nonaktif');

// Toggle: tambah jika tidak ada, hapus jika ada (SEMPURNA untuk on/off!)
tombol.classList.toggle('mode-gelap');

// Replace: ganti satu class dengan class lain
tombol.classList.replace('loading', 'selesai');

// Lihat semua class
console.log([...tombol.classList]); // ["btn", "aktif", "animasi"]
```

## Contoh Nyata: Dark Mode Toggle

```css
/* Di file CSS Anda */
body {
    background: #ffffff;
    color: #111827;
    transition: all 0.3s ease;
}
body.dark {
    background: #111827;
    color: #f9fafb;
}
.tombol-tema.dark {
    background: #374151;
}
```

```javascript
const tombolTema = document.querySelector('#tombol-tema');

tombolTema.addEventListener('click', () => {
    // Toggle class 'dark' di body dan tombol sekaligus
    document.body.classList.toggle('dark');
    tombolTema.classList.toggle('dark');
    
    // Simpan preferensi ke localStorage
    const modeSaatIni = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', modeSaatIni);
    
    // Update teks tombol
    tombolTema.textContent = modeSaatIni ? '☀️ Mode Terang' : '🌙 Mode Gelap';
});

// Saat halaman dimuat, terapkan preferensi tersimpan
const preferensiGelap = localStorage.getItem('darkMode') === 'true';
if (preferensiGelap) {
    document.body.classList.add('dark');
    tombolTema.classList.add('dark');
    tombolTema.textContent = '☀️ Mode Terang';
}
```

## Contoh: Validasi Form Visual

```javascript
function validasiInput(inputEl) {
    const nilai = inputEl.value.trim();
    
    // Hapus class lama terlebih dahulu
    inputEl.classList.remove('input-valid', 'input-error');
    
    if (nilai.length < 3) {
        inputEl.classList.add('input-error');
        return false;
    } else {
        inputEl.classList.add('input-valid');
        return true;
    }
}

document.querySelector('#input-nama').addEventListener('input', function() {
    validasiInput(this);
});
```

## CSS Custom Properties (Variables) via JavaScript

```javascript
// Ubah variabel CSS global dari JavaScript!
const root = document.documentElement; // Merujuk ke elemen <html>

// Membaca nilai CSS variable
const warnaPrimer = getComputedStyle(root).getPropertyValue('--warna-primer');

// Mengubah CSS variable — semua elemen yang memakainya langsung berubah!
root.style.setProperty('--warna-primer', '#10b981'); // Ganti tema hijau
root.style.setProperty('--font-size-base', '18px');  // Perbesar semua font
```
