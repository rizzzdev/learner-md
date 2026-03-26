# Sinkronus vs Asinkronus: Antrian Kasir vs Drive-Thru

Sebelum belajar Promise dan async/await, kita perlu benar-benar paham perbedaan fundamental antara dua cara JavaScript mengeksekusi kode.

## Sinkronus: Antrian Kasir Minimarket

Bayangkan antrian kasir di minimarket. Kasir melayani **satu pelanggan satu per satu secara berurutan**. Pelanggan di urutan ke-5 tidak akan dilayani sebelum pelanggan 1, 2, 3, dan 4 selesai. Tidak peduli berapa lama pelanggan ke-2 menghabiskan koin recehnya.

Inilah cara JavaScript bekerja **secara default** — **single-threaded**, satu antrean, satu demi satu.

```javascript
console.log("1. Pelanggan pertama dilayani");
console.log("2. Pelanggan kedua dilayani");
console.log("3. Pelanggan ketiga dilayani");
// Output SELALU berurutan: 1, 2, 3
```

## Masalah Sinkronus: Blocking

```javascript
// Simulasi operasi lama yang "memblokir" semua yang lain
function hitungLama() {
    console.log("Mulai hitung...");
    // Loop 1 miliar kali — akan MEMBEKUKAN browser selama beberapa detik!
    for (let i = 0; i < 1_000_000_000; i++) {}
    console.log("Selesai hitung.");
}

console.log("Sebelum hitung");
hitungLama(); // Browser/terminal BEKU selama ini berjalan
console.log("Setelah hitung"); // Ini baru muncul setelah hitung selesai
```

Bayangkan ini di browser: **tidak ada yang bisa di-scroll, diklik, atau diketik** selama operasi berlangsung. Ini pengalaman pengguna yang sangat buruk.

## Asinkronus: Drive-Thru

Bayangkan restoran drive-thru. Anda memesan makanan, lalu **tempat parkir menunggu** sambil restoran meracik. Sementara itu, mobil di belakang Anda bisa langsung maju dan memesan juga! Ketika makanan Anda siap, petugas akan memanggil nomor antrean Anda.

JavaScript menangani operasi asinkronus (I/O, network, timer) dengan cara ini — **mendaftarkan tugasnya lalu lanjut ke tugas berikutnya**, dan callback/promise akan dipanggil nanti saat tugasnya selesai.

```javascript
console.log("1. Pesan diterima");

// setTimeout adalah operasi ASINKRONUS — berjalan di latar belakang
setTimeout(() => {
    console.log("3. Makanan sudah siap! (2 detik kemudian)");
}, 2000);

// Kode ini LANGSUNG dieksekusi tanpa menunggu setTimeout selesai
console.log("2. Antrian berikutnya, silakan pesan...");

// Output:
// 1. Pesan diterima
// 2. Antrian berikutnya, silakan pesan...
// 3. Makanan sudah siap! (2 detik kemudian)
```

## Operasi Mana yang Asinkronus?

| Operasi | Tipe | Penjelasan |
|---|---|---|
| Aritmatika, logika | Sinkronus | Langsung selesai di CPU |
| `setTimeout` / `setInterval` | Asinkronus | Menunggu timer |
| `fetch()` / HTTP request | Asinkronus | Menunggu respons server |
| Membaca file (Node.js) | Asinkronus | Menunggu disk I/O |
| Query database | Asinkronus | Menunggu database |
| Geolocation browser | Asinkronus | Menunggu izin & sinyal GPS |

## Ringkasan

- **Sinkronus** = aman, mudah diprediksi, tapi bisa **memblokir** eksekusi
- **Asinkronus** = tidak memblokir, lebih responsif, tapi **lebih kompleks** pengelolaannya
- JavaScript mengatasi kompleksitas ini dengan: **Callback → Promise → Async/Await**
