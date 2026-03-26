# 1. Apa itu Node.js: Membawa JavaScript ke Luar Browser

Selama ini, JavaScript hanya bisa berjalan di dalam browser (Chrome, Firefox, Safari). Ia seperti koki yang hanya bisa memasak di satu dapur restoran. Lalu datanglah **Node.js** pada tahun 2009 — membawa JavaScript keluar dari browser sehingga bisa berjalan di mana saja: di server, di laptop, bahkan di perangkat IoT.

Node.js adalah **runtime environment** — bukan bahasa baru, bukan framework. Ia adalah "mesin" yang memungkinkan JavaScript berjalan di luar browser. Node.js dibangun di atas **V8 Engine** milik Google Chrome, mesin yang sama yang menjalankan JavaScript di browser Chrome Anda.

## Analogi: Koki yang Bisa Masak di Mana Saja

Bayangkan seorang koki handal yang selama bertahun-tahun hanya boleh memasak di dapur restoran (browser). Dia bisa membuat hidangan lezat, tapi hanya di dapur itu saja.

Suatu hari, seseorang memberikan **kitchen set portable** kepada koki tersebut. Sekarang dia bisa memasak di mana saja — di rumah, di acara outdoor, di food truck, bahkan di atas kapal! Keahliannya (JavaScript) sama persis, hanya sekarang dia tidak terbatas di satu tempat.

- **Koki** = JavaScript
- **Dapur restoran** = Browser
- **Kitchen set portable** = Node.js
- **Masak di luar restoran** = Menjalankan JS di server/komputer

## Mengapa Node.js Spesial?

### 1. Non-Blocking I/O (Tidak Mengantre)

Node.js menggunakan model **non-blocking** yang mirip dengan pelayan restoran yang cerdas.

```javascript
// Analogi: Pelayan restoran yang CERDAS
// Dia tidak menunggu dapur selesai memasak sebelum melayani meja lain

// Ini TIDAK membuat program berhenti menunggu
const fs = require('fs');

console.log("1. Pelayan menerima pesanan Meja A");

// Membaca file (seperti mengirim pesanan ke dapur)
fs.readFile('menu.txt', 'utf8', (err, data) => {
    console.log("3. Pesanan Meja A sudah siap dari dapur!");
});

console.log("2. Pelayan langsung melayani Meja B (tidak menunggu dapur)");

// Output:
// 1. Pelayan menerima pesanan Meja A
// 2. Pelayan langsung melayani Meja B (tidak menunggu dapur)
// 3. Pesanan Meja A sudah siap dari dapur!
```

### 2. Event-Driven (Berbasis Kejadian)

Node.js bekerja berdasarkan **event** (kejadian). Seperti bel di restoran cepat saji — ketika pesanan siap, bel berbunyi dan pelanggan datang mengambil.

### 3. Single-Threaded tapi Powerful

Node.js hanya punya satu "pekerja" (single-threaded), tapi pekerja ini sangat efisien karena tidak pernah menganggur — selalu mengerjakan sesuatu sambil menunggu tugas lain selesai.

## Node.js vs JavaScript di Browser

| Fitur | Browser | Node.js |
|---|---|---|
| DOM (document, window) | ✅ Ada | ❌ Tidak ada |
| Manipulasi HTML/CSS | ✅ Bisa | ❌ Tidak bisa |
| File System (baca/tulis file) | ❌ Tidak bisa | ✅ Bisa |
| Membuat Web Server | ❌ Tidak bisa | ✅ Bisa |
| Akses Database | ❌ Tidak langsung | ✅ Bisa |
| `console.log()` | ✅ Ada | ✅ Ada |
| `setTimeout/setInterval` | ✅ Ada | ✅ Ada |
| `require()` / `import` | ✅ import | ✅ Keduanya |
| Modul `os`, `fs`, `http` | ❌ Tidak ada | ✅ Ada |

## Apa yang Bisa Dilakukan Node.js?

```javascript
// 1. Membuat Web Server
const http = require('http');
const server = http.createServer((req, res) => {
    res.end('Halo dari server Node.js!');
});

// 2. Membaca dan Menulis File
const fs = require('fs');
fs.writeFileSync('catatan.txt', 'Node.js bisa menulis file!');

// 3. Mengakses Sistem Operasi
const os = require('os');
console.log('Komputer:', os.hostname());
console.log('RAM Total:', os.totalmem() / 1024 / 1024, 'MB');

// 4. Membuat CLI Tools (aplikasi terminal)
console.log('Argumen dari terminal:', process.argv);

// 5. Mengakses Database, Membuat REST API, Real-time Chat, dll.
```

## Mencoba Node.js: REPL

REPL (Read-Eval-Print-Loop) adalah mode interaktif Node.js — seperti kalkulator. Ketik perintah, langsung lihat hasilnya.

```javascript
// Buka terminal/command prompt, ketik: node
// Lalu coba ketik:

> 2 + 3
5

> "Halo".toUpperCase()
'HALO'

> const nama = "Budi"
undefined

> `Selamat datang, ${nama}!`
'Selamat datang, Budi!'

> process.version
'v20.11.0'    // versi Node.js Anda

> .exit       // keluar dari REPL
```

## Menjalankan File JavaScript

```javascript
// Buat file: halo.js
console.log("Halo! Ini JavaScript yang berjalan di Node.js!");
console.log("Versi Node.js:", process.version);
console.log("Sistem Operasi:", process.platform);
console.log("Folder saat ini:", process.cwd());
```

```
# Di terminal, jalankan:
node halo.js
```

Node.js membuka dunia baru untuk JavaScript — dari yang awalnya hanya bisa membuat website interaktif di browser, sekarang bisa membuat server, aplikasi command line, dan masih banyak lagi. Di pelajaran selanjutnya, kita akan mulai menginstal dan menulis program Node.js pertama kita!
