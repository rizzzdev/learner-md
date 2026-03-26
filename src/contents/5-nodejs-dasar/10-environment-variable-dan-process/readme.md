# 10. Environment Variable dan Process: Pengaturan Rahasia Setiap Cabang

Bayangkan Anda memiliki franchise restoran dengan cabang di Jakarta, Bandung, dan Surabaya. Resepnya (kode) sama persis di semua cabang. Tapi **harga sewa**, **nomor telepon**, **nama manajer**, dan **password Wi-Fi** berbeda-beda. Informasi yang berbeda per cabang ini disimpan terpisah dari buku resep — inilah **Environment Variable**.

## Analogi: Franchise Restoran

- **Kode program** = Buku resep (sama di semua cabang)
- **Environment Variable** = Pengaturan lokal cabang (berbeda-beda)
- **`.env` file** = Buku catatan rahasia manajer setiap cabang
- **`process.env`** = Cara koki membaca catatan manajer
- **Development vs Production** = Cabang latihan (dapur uji coba) vs cabang resmi (buka untuk umum)

## Apa itu Environment Variable?

Environment variable adalah **nilai konfigurasi** yang hidup **di luar kode** — di lingkungan (environment) tempat program berjalan. Contohnya: password database, API key, nomor port, dan mode aplikasi.

```javascript
// ❌ JANGAN PERNAH tulis rahasia langsung di kode!
const passwordDB = "rahasia123";             // Ini BERBAHAYA!
const apiKey = "sk-abc123xyz";               // Siapapun bisa lihat!

// ✅ Gunakan environment variable
const passwordDB = process.env.DB_PASSWORD;  // Aman, dari luar kode
const apiKey = process.env.API_KEY;          // Tidak masuk ke Git
```

## process.env: Membaca Environment Variable

```javascript
// File: config-demo.js

// process.env berisi SEMUA environment variable dari sistem
console.log("=== Environment Variables ===\n");

// Beberapa env var bawaan sistem
console.log("User:", process.env.USERNAME || process.env.USER);
console.log("Home:", process.env.HOME || process.env.USERPROFILE);
console.log("PATH:", process.env.PATH);

// Env var kustom (kita set sendiri)
console.log("\n=== Konfigurasi Aplikasi ===\n");
console.log("Port:", process.env.PORT || 3000);
console.log("Mode:", process.env.NODE_ENV || 'development');
console.log("DB Host:", process.env.DB_HOST || 'localhost');
```

### Menset Environment Variable dari Terminal

```bash
# Linux/Mac: Langsung di depan perintah node
PORT=5000 NODE_ENV=production node config-demo.js

# Windows (Command Prompt)
set PORT=5000 && set NODE_ENV=production && node config-demo.js

# Windows (PowerShell)
$env:PORT=5000; $env:NODE_ENV="production"; node config-demo.js

# Cross-platform (gunakan paket cross-env)
npx cross-env PORT=5000 NODE_ENV=production node config-demo.js
```

## File .env dan Paket dotenv

Mengetik env var di terminal setiap kali menjalankan aplikasi itu merepotkan. Solusinya: simpan di file **`.env`** dan gunakan paket **dotenv** untuk membacanya.

```bash
# Install dotenv
npm install dotenv
```

```
# File: .env (di root folder proyek)
# CATATAN: File ini TIDAK BOLEH masuk ke Git!

PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=27017
DB_NAME=toko_online
DB_PASSWORD=rahasia123
JWT_SECRET=kunci-super-rahasia-jangan-kasih-tau-siapapun
API_KEY=sk-abc123xyz789
```

```javascript
// File: app.js

// Muat .env di BARIS PALING ATAS (sebelum kode lainnya)
require('dotenv').config();

// Sekarang semua variabel dari .env bisa diakses lewat process.env
console.log("Port:", process.env.PORT);           // 3000
console.log("Mode:", process.env.NODE_ENV);       // development
console.log("Database:", process.env.DB_NAME);    // toko_online
console.log("DB Password:", process.env.DB_PASSWORD); // rahasia123

// Contoh penggunaan di koneksi database
const mongoose = require('mongoose');
const DB_URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
// mongoose.connect(DB_URI);
console.log("DB URI:", DB_URI);
```

## PENTING: Keamanan .env

```
# File: .gitignore
# WAJIB tambahkan .env agar tidak masuk ke Git!

node_modules/
.env
.env.local
.env.production
```

```
# File: .env.example (INI yang di-commit ke Git sebagai template)
# Berisi nama variabel tanpa nilai asli

PORT=3000
NODE_ENV=development
DB_HOST=
DB_PORT=
DB_NAME=
DB_PASSWORD=
JWT_SECRET=
API_KEY=
```

## Objek Process: Kartu Identitas Aplikasi

`process` adalah objek global di Node.js yang berisi informasi tentang proses yang sedang berjalan.

### process.argv — Argumen dari Terminal

```javascript
// File: cli-app.js

// process.argv = array argumen dari command line
// [0] = path ke executable node
// [1] = path ke file yang dijalankan
// [2+] = argumen yang kita berikan

const args = process.argv.slice(2);

console.log("Semua argumen:", args);

// Contoh: membuat CLI sederhana
const perintah = args[0];

switch (perintah) {
    case 'sapa':
        const nama = args[1] || 'Dunia';
        console.log(`Halo, ${nama}! 👋`);
        break;
    case 'hitung':
        const angka = args.slice(1).map(Number);
        const total = angka.reduce((sum, n) => sum + n, 0);
        console.log(`Total: ${total}`);
        break;
    case 'waktu':
        console.log(`Waktu sekarang: ${new Date().toLocaleString('id-ID')}`);
        break;
    default:
        console.log("Perintah tersedia: sapa, hitung, waktu");
        console.log("Contoh: node cli-app.js sapa Budi");
        console.log("        node cli-app.js hitung 10 20 30");
}

// Cara pakai:
// node cli-app.js sapa Budi        → Halo, Budi! 👋
// node cli-app.js hitung 10 20 30  → Total: 60
// node cli-app.js waktu            → Waktu sekarang: 26/3/2026 10:30:00
```

### process.exit() — Menghentikan Aplikasi

```javascript
// Keluar dengan kode 0 = sukses
process.exit(0);

// Keluar dengan kode 1 = error
process.exit(1);

// Contoh praktis
const port = process.env.PORT;
if (!port) {
    console.error("❌ ERROR: PORT belum diset di environment variable!");
    console.error("Silakan buat file .env atau set PORT=3000");
    process.exit(1); // Berhenti dengan kode error
}
```

### process.stdin dan process.stdout — Input/Output Terminal

```javascript
// File: tanya-jawab.js

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Siapa nama Anda? ', (nama) => {
    rl.question('Berapa umur Anda? ', (umur) => {
        console.log(`\nHalo ${nama}! Anda berumur ${umur} tahun.`);

        const tahunLahir = new Date().getFullYear() - parseInt(umur);
        console.log(`Anda lahir sekitar tahun ${tahunLahir}.`);

        rl.close();
    });
});
```

## Contoh Praktis: Konfigurasi Aplikasi Lengkap

```javascript
// File: config.js
require('dotenv').config();

const config = {
    port: parseInt(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 27017,
        name: process.env.DB_NAME || 'myapp_dev',
        password: process.env.DB_PASSWORD || ''
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'default-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    },
    isDevelopment: (process.env.NODE_ENV || 'development') === 'development',
    isProduction: process.env.NODE_ENV === 'production'
};

// Validasi: pastikan variabel penting sudah diset di production
if (config.isProduction) {
    const wajibAda = ['DB_PASSWORD', 'JWT_SECRET', 'API_KEY'];
    const belumDiset = wajibAda.filter(key => !process.env[key]);

    if (belumDiset.length > 0) {
        console.error('❌ Environment variable berikut WAJIB diset di production:');
        belumDiset.forEach(key => console.error(`   - ${key}`));
        process.exit(1);
    }
}

module.exports = config;
```

```javascript
// File: server.js
const config = require('./config');

console.log(`🚀 Server berjalan di port ${config.port}`);
console.log(`📦 Mode: ${config.nodeEnv}`);
console.log(`🗄️ Database: ${config.db.host}:${config.db.port}/${config.db.name}`);

if (config.isDevelopment) {
    console.log('🔧 Mode development — fitur debug aktif');
}

if (config.isProduction) {
    console.log('🏭 Mode production — optimasi aktif');
}
```

## Cheatsheet

| Konsep | Penjelasan | Contoh |
|---|---|---|
| `process.env.NAMA` | Baca env variable | `process.env.PORT` |
| `dotenv` | Muat file .env | `require('dotenv').config()` |
| `.env` | File konfigurasi rahasia | `PORT=3000` |
| `.env.example` | Template .env (commit ke Git) | `PORT=` |
| `process.argv` | Argumen dari terminal | `['node', 'app.js', 'arg1']` |
| `process.exit(kode)` | Hentikan aplikasi | `process.exit(1)` |
| `process.cwd()` | Folder kerja saat ini | `/home/user/proyek` |
| `process.pid` | ID proses | `12345` |
| `process.uptime()` | Lama berjalan (detik) | `120.5` |

Selamat! Anda telah menyelesaikan seluruh kursus **Node.js Dasar**. Sekarang Anda menguasai fondasi yang kuat: dari memahami apa itu Node.js, module system, NPM, file system, HTTP server, event, stream, hingga environment variable. Fondasi ini akan sangat berguna saat Anda melanjutkan ke kursus berikutnya — **Express.js** — framework yang membuat pengembangan web server menjadi jauh lebih mudah dan menyenangkan!
