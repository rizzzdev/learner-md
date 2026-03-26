# 2. Instalasi dan Menjalankan File: Menyalakan Mesin untuk Pertama Kali

Sebelum bisa membuat aplikasi dengan Node.js, kita perlu memasangnya terlebih dahulu di komputer. Ini seperti membeli dan memasang mesin baru di bengkel — setelah terpasang, barulah kita bisa mulai bekerja.

## Analogi: Memasang Mesin di Bengkel

Bayangkan Anda baru saja membeli sebuah mesin canggih untuk bengkel Anda:
1. **Download & Install** = Membeli mesin dan memasangnya di bengkel
2. **Verifikasi instalasi** = Menyalakan mesin untuk memastikan berfungsi
3. **Menjalankan file .js** = Memberikan bahan mentah ke mesin dan melihat hasilnya
4. **REPL** = Mode uji coba — menekan tombol satu per satu untuk lihat apa yang terjadi

## Cara Menginstal Node.js

### Langkah 1: Download dari Website Resmi

Kunjungi **nodejs.org** dan Anda akan melihat dua pilihan:

| Versi | Keterangan | Untuk Siapa? |
|---|---|---|
| **LTS** (Long Term Support) | Versi stabil, jarang berubah | ✅ Pemula & Produksi |
| **Current** | Versi terbaru, fitur terkini | Eksperimen & Developer berpengalaman |

> **Saran**: Selalu pilih versi **LTS** untuk belajar dan proyek nyata.

### Langkah 2: Install

- **Windows**: Jalankan file `.msi` yang didownload, klik Next sampai selesai
- **Mac**: Jalankan file `.pkg`, ikuti petunjuknya
- **Linux**: Gunakan package manager (apt, yum, dll)

### Langkah 3: Verifikasi Instalasi

Buka terminal (Command Prompt / PowerShell / Terminal) dan ketik:

```bash
# Cek versi Node.js
node -v
# Output contoh: v20.11.0

# Cek versi NPM (otomatis terinstal bersama Node.js)
npm -v
# Output contoh: 10.2.4
```

Jika muncul nomor versi, selamat — Node.js sudah siap digunakan!

## Menjalankan File JavaScript

### Cara 1: Membuat dan Menjalankan File .js

```javascript
// Buat file bernama: belajar.js

// Menyapa pengguna
console.log("===================================");
console.log("  Selamat datang di Node.js! ");
console.log("===================================");

// Operasi matematika
const panjang = 10;
const lebar = 5;
const luas = panjang * lebar;
console.log(`Luas persegi panjang: ${panjang} x ${lebar} = ${luas}`);

// Menggunakan fitur ES6+
const buah = ["Apel", "Mangga", "Jeruk", "Durian"];
buah.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
});

// Menampilkan waktu saat ini
const sekarang = new Date();
console.log(`\nWaktu saat ini: ${sekarang.toLocaleString('id-ID')}`);
```

```bash
# Jalankan di terminal:
node belajar.js
```

### Cara 2: Mode REPL (Interactive)

REPL seperti kalkulator — ketik perintah, langsung lihat hasilnya.

```bash
# Ketik 'node' tanpa nama file:
node

# Sekarang Anda masuk mode REPL
> const nama = "Andi"
> console.log(`Halo, ${nama}!`)
Halo, Andi!

> Math.random()
0.7234567890

> [1,2,3].map(x => x * 10)
[10, 20, 30]

> .exit    # keluar dari REPL
```

| Perintah REPL | Fungsi |
|---|---|
| `.exit` | Keluar dari REPL |
| `.help` | Menampilkan bantuan |
| `.clear` | Membersihkan konteks |
| `.save namafile` | Simpan sesi ke file |
| `.load namafile` | Muat file ke sesi |

## Mengenal Objek `process`

Di Node.js, ada objek global bernama `process` yang menyimpan informasi tentang proses yang sedang berjalan — seperti kartu identitas dari mesin Node.js itu sendiri.

```javascript
// Buat file: info-proses.js

// Versi Node.js yang digunakan
console.log("Versi Node.js:", process.version);

// Sistem operasi
console.log("Platform:", process.platform);
// Contoh output: win32, darwin (Mac), linux

// Folder kerja saat ini
console.log("Direktori kerja:", process.cwd());

// Argumen dari command line
console.log("Argumen:", process.argv);

// Penggunaan memori
const memori = process.memoryUsage();
console.log("Memori digunakan:", Math.round(memori.heapUsed / 1024 / 1024), "MB");

// Waktu proses berjalan (dalam detik)
console.log("Uptime:", process.uptime(), "detik");
```

## Menerima Input dari Terminal

```javascript
// Buat file: argumen.js

// process.argv adalah array berisi argumen dari terminal
// Index 0: path ke node
// Index 1: path ke file yang dijalankan
// Index 2+: argumen yang kita berikan

const argumen = process.argv.slice(2); // Ambil mulai index 2

if (argumen.length === 0) {
    console.log("Penggunaan: node argumen.js <nama_anda>");
    console.log("Contoh: node argumen.js Budi");
} else {
    const nama = argumen[0];
    console.log(`Halo, ${nama}! Selamat belajar Node.js!`);

    if (argumen[1]) {
        console.log(`Umur Anda: ${argumen[1]} tahun`);
    }
}
```

```bash
# Jalankan dengan argumen:
node argumen.js Budi 25
# Output:
# Halo, Budi! Selamat belajar Node.js!
# Umur Anda: 25 tahun
```

Sekarang Anda sudah bisa menginstal Node.js, menjalankan file JavaScript, menggunakan REPL, dan bahkan menerima input dari terminal. Di pelajaran selanjutnya, kita akan belajar bagaimana memecah kode menjadi file-file terpisah menggunakan **Module System**.
