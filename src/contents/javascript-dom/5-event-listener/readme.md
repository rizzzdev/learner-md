# Event Listener: Membuat Halaman Bereaksi

Event Listener adalah cara JavaScript "mendengarkan" tindakan pengguna — klik, ketikan, scroll, hover, submit form — dan merespons dengan menjalankan fungsi tertentu.

## Analogi: Satpam dengan Bel Tamu

Event Listener itu seperti satpam yang menunggu di depan pintu. Ketika tamu menekan bel (event terjadi), satpam langsung mengeksekusi tugasnya (fungsi handler dipanggil). Tanpa satpam itu berjaga, bel tidak akan direspons.

## `addEventListener`: Cara Modern

```javascript
const tombol = document.querySelector('#tombol-kirim');

// addEventListener(namaEvent, fungsiHandler)
tombol.addEventListener('click', function(event) {
    console.log("Tombol diklik!");
    console.log("Event object:", event); // Berisi semua info tentang event
    console.log("Elemen yang diklik:", event.target);
});

// Dengan Arrow Function
tombol.addEventListener('click', (e) => {
    console.log("Diklik pada koordinat:", e.clientX, e.clientY);
});
```

## Objek Event (`e` / `event`)

```javascript
document.querySelector('#link').addEventListener('click', (e) => {
    // Hentikan perilaku default (link tidak jadi berpindah halaman)
    e.preventDefault();
    
    // Hentikan event agar tidak "naik" ke elemen induk (event bubbling)
    e.stopPropagation();
    
    console.log("Type event:", e.type);       // "click"
    console.log("Elemen target:", e.target);  // Elemen yang memicu event
    console.log("Elemen saat ini:", e.currentTarget); // Elemen yang dipasang listener
    console.log("Waktu:", e.timeStamp);       // Milidetik sejak halaman dibuka
});
```

## Jenis-Jenis Event Populer

```javascript
const el = document.querySelector('#elemen');

// === MOUSE EVENTS ===
el.addEventListener('click',     () => console.log('Diklik'));
el.addEventListener('dblclick',  () => console.log('Double klik'));
el.addEventListener('mouseenter',() => console.log('Kursor masuk'));
el.addEventListener('mouseleave',() => console.log('Kursor keluar'));
el.addEventListener('mousemove', (e) => console.log(`Posisi: ${e.clientX}, ${e.clientY}`));

// === KEYBOARD EVENTS ===
document.addEventListener('keydown', (e) => {
    console.log('Tombol ditekan:', e.key);  // "a", "Enter", "Escape", dll.
    console.log('Kode:', e.code);           // "KeyA", "Enter", "Escape"
    
    if (e.key === 'Escape') {
        tutupModal();
    }
    if (e.ctrlKey && e.key === 's') { // Ctrl+S
        e.preventDefault();
        simpanDokumen();
    }
});

// === FORM EVENTS ===
const input = document.querySelector('#input-cari');
input.addEventListener('input',  (e) => console.log('Diketik:', e.target.value));
input.addEventListener('change', (e) => console.log('Berubah:', e.target.value));
input.addEventListener('focus',  () => console.log('Input aktif'));
input.addEventListener('blur',   () => console.log('Input ditinggalkan'));

// === WINDOW / DOCUMENT EVENTS ===
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 300) {
        document.querySelector('#btn-top').classList.add('tampil');
    }
});

window.addEventListener('resize', () => {
    console.log('Ukuran window:', window.innerWidth, 'x', window.innerHeight);
});

document.addEventListener('DOMContentLoaded', () => {
    // Kode di sini HANYA berjalan setelah HTML selesai diparse
    console.log('DOM siap!');
});
```

## Menghapus Event Listener

```javascript
// HARUS menggunakan referensi fungsi yang sama untuk bisa dihapus!
function handleKlik() {
    console.log("Diklik!");
}

const tombol = document.querySelector('#tombol');
tombol.addEventListener('click', handleKlik);

// Nanti, saat tidak diperlukan lagi (misal: setelah form submit)
tombol.removeEventListener('click', handleKlik);

// Arrow function yang ditulis langsung TIDAK BISA dihapus!
// el.addEventListener('click', () => {}); // ← Ini tidak bisa di-removeEventListener
```

## Option: `once` dan `passive`

```javascript
// once: listener otomatis terhapus setelah dipanggil SEKALI
tombol.addEventListener('click', tutorialSelamatDatang, { once: true });

// passive: beritahu browser bahwa handler tidak akan memanggil preventDefault()
// Browser bisa scroll lebih lancar karena tidak perlu menunggu
window.addEventListener('scroll', updateHeader, { passive: true });
```
