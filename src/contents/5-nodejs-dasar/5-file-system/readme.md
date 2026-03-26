# 5. File System: Sekretaris Digital yang Serba Bisa

Di browser, JavaScript tidak bisa menyentuh file di komputer Anda (demi keamanan). Tapi di Node.js, kita punya **modul `fs`** (File System) — kemampuan untuk membaca, menulis, menghapus, dan mengelola file serta folder. Ini seperti memiliki sekretaris pribadi yang bisa mengurus semua dokumen di kantor Anda.

## Analogi: Sekretaris Pribadi Digital

Bayangkan modul `fs` adalah sekretaris pribadi Anda di kantor:
- **Membaca file** (`readFile`) = Sekretaris membuka laci arsip dan membacakan isi dokumen
- **Menulis file** (`writeFile`) = Sekretaris mengetik dokumen baru dan menyimpannya ke laci
- **Menambah isi** (`appendFile`) = Sekretaris menambah catatan di akhir dokumen yang sudah ada
- **Menghapus file** (`unlink`) = Sekretaris menghancurkan dokumen dengan mesin penghancur kertas
- **Membuat folder** (`mkdir`) = Sekretaris membuat laci arsip baru
- **Mengecek keberadaan** (`existsSync`) = Sekretaris mengecek apakah dokumen ada di laci

## Mengimpor Modul fs

```javascript
// Cara 1: CommonJS (default Node.js)
const fs = require('fs');

// Cara 2: Versi Promise-based (lebih modern)
const fsPromises = require('fs').promises;
```

## Membaca File

### Synchronous (Menunggu Sampai Selesai)

```javascript
const fs = require('fs');

// ✅ Membaca file secara sinkronus (program berhenti menunggu)
try {
    const isi = fs.readFileSync('catatan.txt', 'utf8');
    console.log("Isi file:", isi);
} catch (error) {
    console.error("File tidak ditemukan!", error.message);
}
```

### Asynchronous dengan Callback (Tidak Menunggu)

```javascript
const fs = require('fs');

console.log("1. Mulai membaca file...");

// ✅ Membaca file secara asinkronus (program lanjut jalan)
fs.readFile('catatan.txt', 'utf8', (error, isi) => {
    if (error) {
        console.error("Gagal membaca:", error.message);
        return;
    }
    console.log("3. Isi file:", isi);
});

console.log("2. Program lanjut (tidak menunggu file selesai dibaca)");

// Output urutan:
// 1. Mulai membaca file...
// 2. Program lanjut (tidak menunggu file selesai dibaca)
// 3. Isi file: [isi catatan.txt]
```

### Asynchronous dengan Promises (Modern)

```javascript
const fs = require('fs').promises;

async function bacaFile() {
    try {
        const isi = await fs.readFile('catatan.txt', 'utf8');
        console.log("Isi file:", isi);
    } catch (error) {
        console.error("Gagal membaca:", error.message);
    }
}

bacaFile();
```

## Menulis File

```javascript
const fs = require('fs');

// ✅ Menulis file baru (jika file sudah ada, isinya DITIMPA!)
const konten = "Halo! Ini catatan pertama saya.\nDibuat oleh Node.js.";

fs.writeFileSync('catatan-baru.txt', konten, 'utf8');
console.log("File berhasil ditulis!");

// ✅ Menulis file secara asinkronus
fs.writeFile('pesan.txt', 'Pesan rahasia dari Node.js', 'utf8', (err) => {
    if (err) {
        console.error("Gagal menulis:", err.message);
        return;
    }
    console.log("Pesan berhasil disimpan!");
});
```

## Menambahkan Isi ke File (Append)

```javascript
const fs = require('fs');

// Menambah teks di akhir file (tidak menimpa isi yang sudah ada)
fs.appendFileSync('log.txt', `[${new Date().toISOString()}] Aplikasi dimulai\n`);
fs.appendFileSync('log.txt', `[${new Date().toISOString()}] Pengguna login\n`);
fs.appendFileSync('log.txt', `[${new Date().toISOString()}] Data berhasil disimpan\n`);

console.log("Log berhasil ditambahkan!");
```

## Menghapus File

```javascript
const fs = require('fs');

// Cek dulu apakah file ada sebelum menghapus
if (fs.existsSync('file-sampah.txt')) {
    fs.unlinkSync('file-sampah.txt');
    console.log("File berhasil dihapus!");
} else {
    console.log("File tidak ditemukan, tidak perlu dihapus.");
}
```

## Mengelola Folder (Direktori)

```javascript
const fs = require('fs');

// Membuat folder baru
if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
    console.log("Folder 'data' berhasil dibuat!");
}

// Membuat folder bersarang (nested)
fs.mkdirSync('data/laporan/2024', { recursive: true });
console.log("Folder bersarang berhasil dibuat!");

// Membaca isi folder
const isiFolder = fs.readdirSync('.');
console.log("Isi folder saat ini:", isiFolder);

// Menghapus folder (harus kosong)
fs.rmdirSync('folder-kosong');

// Menghapus folder beserta isinya (Node.js 14+)
fs.rmSync('folder-berisi', { recursive: true, force: true });
```

## Informasi File (Stats)

```javascript
const fs = require('fs');

const info = fs.statSync('catatan.txt');

console.log("Ukuran file:", info.size, "bytes");
console.log("Dibuat pada:", info.birthtime);
console.log("Terakhir diubah:", info.mtime);
console.log("Apakah file?", info.isFile());
console.log("Apakah folder?", info.isDirectory());
```

## Contoh Praktis: Aplikasi Catatan Sederhana

```javascript
// File: catatan-app.js
const fs = require('fs');
const path = require('path');

const FILE_CATATAN = path.join(__dirname, 'catatan.json');

// Fungsi untuk memuat catatan dari file
function muatCatatan() {
    if (!fs.existsSync(FILE_CATATAN)) {
        return [];
    }
    const data = fs.readFileSync(FILE_CATATAN, 'utf8');
    return JSON.parse(data);
}

// Fungsi untuk menyimpan catatan ke file
function simpanCatatan(daftarCatatan) {
    fs.writeFileSync(FILE_CATATAN, JSON.stringify(daftarCatatan, null, 2), 'utf8');
}

// Fungsi untuk menambah catatan baru
function tambahCatatan(judul, isi) {
    const daftarCatatan = muatCatatan();
    daftarCatatan.push({
        id: Date.now(),
        judul,
        isi,
        tanggal: new Date().toLocaleString('id-ID')
    });
    simpanCatatan(daftarCatatan);
    console.log(`✅ Catatan "${judul}" berhasil ditambahkan!`);
}

// Fungsi untuk menampilkan semua catatan
function tampilkanCatatan() {
    const daftarCatatan = muatCatatan();
    if (daftarCatatan.length === 0) {
        console.log("📝 Belum ada catatan.");
        return;
    }
    console.log("\n=== Daftar Catatan ===\n");
    daftarCatatan.forEach((catatan, i) => {
        console.log(`${i + 1}. [${catatan.judul}]`);
        console.log(`   ${catatan.isi}`);
        console.log(`   📅 ${catatan.tanggal}\n`);
    });
}

// Menggunakan argumen dari terminal
const perintah = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (perintah) {
    case 'tambah':
        if (!arg1 || !arg2) {
            console.log('Penggunaan: node catatan-app.js tambah "Judul" "Isi"');
        } else {
            tambahCatatan(arg1, arg2);
        }
        break;
    case 'lihat':
        tampilkanCatatan();
        break;
    default:
        console.log("Perintah tersedia:");
        console.log('  node catatan-app.js tambah "Judul" "Isi catatan"');
        console.log("  node catatan-app.js lihat");
}

// Cara pakai:
// node catatan-app.js tambah "Belanja" "Beli susu dan roti"
// node catatan-app.js tambah "Meeting" "Zoom jam 3 sore"
// node catatan-app.js lihat
```

## Sync vs Async: Kapan Menggunakan yang Mana?

| Situasi | Gunakan | Alasan |
|---|---|---|
| Script sekali jalan | `readFileSync` | Sederhana, tidak masalah blocking |
| Web server | `readFile` / `promises` | Tidak boleh blocking — server harus tetap responsif |
| Baca config saat startup | `readFileSync` | Hanya sekali di awal, blocking tidak masalah |
| Baca file saat ada request | `readFile` / `promises` | Harus non-blocking agar user lain tidak menunggu |

Modul `fs` memberi Node.js kemampuan yang tidak dimiliki JavaScript di browser — mengakses file system komputer. Dengan kemampuan ini, Anda bisa membuat aplikasi yang membaca konfigurasi, menulis log, mengelola data, dan banyak lagi. Di pelajaran selanjutnya, kita akan belajar tentang **Path Module** yang membantu mengelola alamat file dan folder!
