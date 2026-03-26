# 4. NPM: Supermarket Raksasa untuk Programmer

Bayangkan Anda ingin membuat kue ulang tahun. Anda bisa membuat semuanya dari nol — menanam gandum, memanen, menggiling jadi tepung, memerah susu sapi... Atau, Anda tinggal pergi ke **supermarket** dan membeli tepung, susu, telur, dan cokelat yang sudah jadi. **NPM** (Node Package Manager) adalah supermarket itu untuk programmer.

NPM adalah **pengelola paket** bawaan Node.js yang memungkinkan kita mengunduh, menginstal, dan mengelola library/paket kode buatan developer lain dari seluruh dunia. Dengan lebih dari **2 juta paket** tersedia, hampir semua kebutuhan Anda sudah ada solusinya.

## Analogi: Supermarket untuk Programmer

- **NPM Registry** = Supermarket raksasa (gudang online berisi jutaan paket)
- **npm install** = Mengambil barang dari rak dan memasukkan ke troli
- **package.json** = Daftar belanja / struk belanja (catatan apa saja yang dibeli)
- **node_modules** = Gudang penyimpanan di rumah (tempat barang-barang disimpan)
- **package-lock.json** = Struk belanja detail (catat merk dan versi persis setiap barang)

## Inisialisasi Proyek: npm init

Sebelum mulai menginstal paket, kita harus membuat "kartu identitas" proyek — yaitu file **package.json**.

```bash
# Buat folder proyek baru
mkdir proyek-pertama
cd proyek-pertama

# Inisialisasi proyek (jawab pertanyaan satu per satu)
npm init

# Atau langsung dengan default (lebih cepat)
npm init -y
```

### Isi package.json

```javascript
// package.json yang dihasilkan oleh npm init -y
{
    "name": "proyek-pertama",        // Nama proyek
    "version": "1.0.0",              // Versi proyek
    "description": "",               // Deskripsi proyek
    "main": "index.js",              // File utama
    "scripts": {                     // Perintah-perintah kustom
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],                  // Kata kunci untuk pencarian
    "author": "",                    // Pembuat
    "license": "ISC"                 // Lisensi
}
```

## Menginstal Paket

### Install untuk Produksi (dependencies)

```bash
# Install satu paket
npm install express

# Install beberapa sekaligus
npm install express mongoose dotenv

# Shortcut
npm i express
```

Paket akan masuk ke bagian `dependencies` di package.json:

```javascript
{
    "dependencies": {
        "express": "^4.18.2",     // Dibutuhkan saat aplikasi berjalan
        "mongoose": "^7.6.3",
        "dotenv": "^16.3.1"
    }
}
```

### Install untuk Development (devDependencies)

```bash
# Paket yang hanya dibutuhkan saat development
npm install nodemon --save-dev
npm install jest --save-dev

# Shortcut
npm i nodemon -D
```

```javascript
{
    "devDependencies": {
        "nodemon": "^3.0.1",     // Hanya untuk development
        "jest": "^29.7.0"        // Hanya untuk testing
    }
}
```

### Install Global

```bash
# Paket yang bisa digunakan di mana saja di komputer
npm install -g nodemon

# Cek paket global yang terinstal
npm list -g --depth=0
```

## Folder node_modules

Ketika Anda menjalankan `npm install`, semua paket diunduh ke folder **node_modules**. Folder ini bisa sangat besar (ratusan MB!) karena setiap paket juga membawa paket lain yang dibutuhkannya (dependensi berantai).

```bash
# ❌ JANGAN pernah commit node_modules ke Git!
# Buat file .gitignore dan tambahkan:
node_modules/
```

```bash
# Jika Anda clone proyek orang lain, cukup jalankan:
npm install
# NPM akan membaca package.json dan mengunduh semua yang dibutuhkan
```

## package-lock.json

File ini mencatat **versi persis** dari setiap paket yang diinstal, termasuk semua sub-dependensinya. Ini memastikan bahwa setiap anggota tim menggunakan versi yang sama persis.

> **Aturan**: Selalu commit `package-lock.json` ke Git. Jangan pernah mengeditnya secara manual.

## NPM Scripts: Perintah Kustom

NPM Scripts memungkinkan kita membuat shortcut untuk perintah-perintah yang sering digunakan — seperti membuat speed dial di telepon.

```javascript
// package.json
{
    "scripts": {
        "start": "node server.js",                    // npm start
        "dev": "nodemon server.js",                   // npm run dev
        "test": "jest",                               // npm test
        "seed": "node database/seed.js",              // npm run seed
        "lint": "eslint .",                            // npm run lint
        "build": "webpack --mode production"           // npm run build
    }
}
```

```bash
# Menjalankan script
npm start          # 'start' dan 'test' tidak perlu 'run'
npm test           # langsung jalan
npm run dev        # script lainnya HARUS pakai 'run'
npm run seed
```

## Paket-Paket Populer untuk Pemula

| Paket | Fungsi | Install |
|---|---|---|
| **nodemon** | Auto-restart saat file berubah | `npm i -D nodemon` |
| **dotenv** | Membaca file .env | `npm i dotenv` |
| **chalk** | Warnai teks di terminal | `npm i chalk` |
| **express** | Framework web server | `npm i express` |
| **mongoose** | ODM untuk MongoDB | `npm i mongoose` |
| **axios** | HTTP client (seperti fetch) | `npm i axios` |
| **uuid** | Generate ID unik | `npm i uuid` |
| **dayjs** | Manipulasi tanggal/waktu | `npm i dayjs` |

## Contoh Praktis: Proyek dengan NPM

```bash
# 1. Buat dan inisialisasi proyek
mkdir aplikasi-catatan
cd aplikasi-catatan
npm init -y

# 2. Install paket yang dibutuhkan
npm install chalk dayjs
npm install nodemon --save-dev
```

```javascript
// package.json — tambahkan script
{
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
    }
}
```

```javascript
// index.js
const chalk = require('chalk');
const dayjs = require('dayjs');

const waktu = dayjs().format('DD MMMM YYYY, HH:mm:ss');

console.log(chalk.green.bold('=== Aplikasi Catatan ==='));
console.log(chalk.gray(`Dijalankan pada: ${waktu}`));
console.log('');

const catatan = [
    { judul: "Belanja", isi: "Beli susu dan roti" },
    { judul: "Tugas", isi: "Kerjakan PR matematika" },
    { judul: "Meeting", isi: "Zoom jam 3 sore" }
];

catatan.forEach((item, i) => {
    console.log(chalk.yellow.bold(`${i + 1}. ${item.judul}`));
    console.log(chalk.white(`   ${item.isi}`));
});

console.log(chalk.cyan('\nTotal catatan:'), catatan.length);
```

```bash
# Jalankan
npm run dev    # dengan auto-reload (nodemon)
npm start      # tanpa auto-reload
```

## npx: Menjalankan Paket Tanpa Install

**npx** memungkinkan kita menjalankan paket tanpa harus menginstalnya secara permanen — seperti menyewa alat daripada membeli.

```bash
# Contoh: menjalankan create-react-app tanpa install global
npx create-react-app nama-proyek

# Menjalankan cowsay (paket lucu)
npx cowsay "Halo dari NPM!"
```

## Perintah NPM Penting

| Perintah | Fungsi |
|---|---|
| `npm init -y` | Buat package.json baru |
| `npm install` / `npm i` | Install semua dari package.json |
| `npm install <paket>` | Install paket tertentu |
| `npm install <paket> -D` | Install sebagai devDependency |
| `npm install <paket> -g` | Install secara global |
| `npm uninstall <paket>` | Hapus paket |
| `npm update` | Update semua paket |
| `npm list` | Lihat paket terinstal |
| `npm outdated` | Cek paket yang perlu diupdate |
| `npm run <script>` | Jalankan NPM script |

NPM membuka akses Anda ke ekosistem JavaScript yang luar biasa besar. Daripada menulis semuanya dari nol, manfaatkan paket-paket yang sudah teruji dan digunakan jutaan developer. Di pelajaran selanjutnya, kita akan belajar cara membaca dan menulis **file** menggunakan modul `fs`!
