# 3. Module System: Sistem Pinjam-Meminjam Antar Tetangga

Ketika kode Anda sudah mencapai ratusan bahkan ribuan baris, meletakkan semuanya dalam satu file adalah bencana. Bayangkan buku resep setebal 1000 halaman tanpa bab — mustahil mencari resep yang Anda butuhkan! **Module System** memungkinkan kita memecah kode ke dalam file-file terpisah yang saling berbagi fungsionalitas.

## Analogi: Kompleks Perumahan

Bayangkan sebuah kompleks perumahan kecil. Setiap rumah (file) memiliki peralatan masing-masing:
- **Rumah Pak Budi** punya mesin bor dan gergaji
- **Rumah Bu Sari** punya mesin jahit dan setrika uap
- **Rumah Pak Andi** punya mixer dan oven kue

Ketika Pak Andi butuh bor, dia tidak beli baru — dia **meminjam (require)** dari Pak Budi. Dan Pak Budi **menyediakan untuk dipinjam (module.exports)** bornya.

- **Rumah** = File JavaScript
- **Peralatan** = Fungsi, variabel, class
- **Meminjam** = `require()`
- **Menyediakan** = `module.exports`

## Tiga Jenis Modul di Node.js

| Jenis | Contoh | Cara Import |
|---|---|---|
| **Built-in** (bawaan Node.js) | `fs`, `path`, `http`, `os` | `require('fs')` |
| **Custom** (buatan sendiri) | file `.js` Anda | `require('./namafile')` |
| **Third-party** (dari NPM) | `express`, `lodash` | `require('express')` |

## module.exports: Menyediakan Peralatan

### Export Satu Nilai

```javascript
// File: sapa.js (Rumah yang punya mesin sapa)

function sapa(nama) {
    return `Halo, ${nama}! Selamat datang!`;
}

// Menyediakan fungsi ini untuk dipinjam file lain
module.exports = sapa;
```

```javascript
// File: app.js (Rumah yang meminjam)

const sapa = require('./sapa'); // './' artinya "file di folder yang sama"

console.log(sapa("Budi"));  // Halo, Budi! Selamat datang!
console.log(sapa("Sari"));  // Halo, Sari! Selamat datang!
```

### Export Banyak Nilai (Object)

```javascript
// File: matematika.js

function tambah(a, b) {
    return a + b;
}

function kurang(a, b) {
    return a - b;
}

function kali(a, b) {
    return a * b;
}

const PI = 3.14159;

// Export banyak hal sekaligus sebagai object
module.exports = {
    tambah,
    kurang,
    kali,
    PI
};
```

```javascript
// File: app.js

const matematika = require('./matematika');

console.log(matematika.tambah(10, 5));   // 15
console.log(matematika.kurang(10, 5));   // 5
console.log(matematika.kali(10, 5));     // 50
console.log(matematika.PI);             // 3.14159

// Atau gunakan destructuring!
const { tambah, kali, PI } = require('./matematika');
console.log(tambah(3, 7));   // 10
console.log(kali(4, 5));     // 20
```

### Export dengan `exports` (Shortcut)

```javascript
// File: helper.js

// exports adalah shortcut ke module.exports
exports.formatRupiah = function(angka) {
    return `Rp ${angka.toLocaleString('id-ID')}`;
};

exports.formatTanggal = function(tanggal) {
    return new Date(tanggal).toLocaleDateString('id-ID');
};

// ❌ JANGAN lakukan ini — ini menimpa referensi exports!
// exports = { sesuatu: 'nilai' };

// ✅ Jika ingin export satu objek utuh, gunakan module.exports
// module.exports = { sesuatu: 'nilai' };
```

## require(): Meminjam Peralatan

### Mengimpor Built-in Module

```javascript
// Built-in module tidak perlu './' di depannya
const fs = require('fs');       // File System
const path = require('path');   // Path utilities
const os = require('os');       // Operating System info
const http = require('http');   // HTTP Server

// Contoh penggunaan
console.log("Nama komputer:", os.hostname());
console.log("Home directory:", os.homedir());
console.log("Jumlah CPU:", os.cpus().length);
```

### Mengimpor Custom Module

```javascript
// Custom module HARUS pakai './' atau '../'
const sapa = require('./sapa');           // file di folder sama
const helper = require('./utils/helper'); // file di subfolder
const config = require('../config');      // file di folder induk
```

## __dirname dan __filename

Dua variabel spesial yang selalu tersedia di setiap file Node.js:

```javascript
// File: info.js (lokasi: /proyek/src/info.js)

console.log("Nama file ini:", __filename);
// Output: /proyek/src/info.js

console.log("Folder file ini:", __dirname);
// Output: /proyek/src

// Berguna untuk membuat path yang relatif terhadap lokasi file
const path = require('path');
const pathData = path.join(__dirname, 'data', 'pengguna.json');
console.log("Path ke data:", pathData);
// Output: /proyek/src/data/pengguna.json
```

## Contoh Proyek: Kalkulator Sederhana

```
proyek-kalkulator/
├── operasi.js       ← modul berisi fungsi matematika
├── validasi.js      ← modul berisi fungsi validasi
└── app.js           ← file utama
```

```javascript
// File: operasi.js
function tambah(a, b) { return a + b; }
function kurang(a, b) { return a - b; }
function kali(a, b) { return a * b; }
function bagi(a, b) {
    if (b === 0) throw new Error("Tidak bisa membagi dengan nol!");
    return a / b;
}

module.exports = { tambah, kurang, kali, bagi };
```

```javascript
// File: validasi.js
function validasiAngka(nilai) {
    if (typeof nilai !== 'number' || isNaN(nilai)) {
        throw new Error(`"${nilai}" bukan angka yang valid!`);
    }
    return true;
}

function validasiOperator(op) {
    const operatorValid = ['+', '-', '*', '/'];
    if (!operatorValid.includes(op)) {
        throw new Error(`Operator "${op}" tidak dikenali! Gunakan: ${operatorValid.join(', ')}`);
    }
    return true;
}

module.exports = { validasiAngka, validasiOperator };
```

```javascript
// File: app.js (file utama)
const { tambah, kurang, kali, bagi } = require('./operasi');
const { validasiAngka, validasiOperator } = require('./validasi');

function kalkulator(a, operator, b) {
    validasiAngka(a);
    validasiAngka(b);
    validasiOperator(operator);

    switch (operator) {
        case '+': return tambah(a, b);
        case '-': return kurang(a, b);
        case '*': return kali(a, b);
        case '/': return bagi(a, b);
    }
}

// Menggunakan argumen dari terminal
const args = process.argv.slice(2);
const angka1 = parseFloat(args[0]);
const operator = args[1];
const angka2 = parseFloat(args[2]);

try {
    const hasil = kalkulator(angka1, operator, angka2);
    console.log(`${angka1} ${operator} ${angka2} = ${hasil}`);
} catch (error) {
    console.error("Error:", error.message);
}

// Jalankan: node app.js 10 + 5
// Output: 10 + 5 = 15
```

## CommonJS vs ES Modules

Node.js mendukung dua sistem modul. Yang kita pelajari di atas adalah **CommonJS** (default):

| Fitur | CommonJS | ES Modules |
|---|---|---|
| Syntax export | `module.exports = ...` | `export default ...` / `export ...` |
| Syntax import | `const x = require('...')` | `import x from '...'` |
| Loading | Synchronous | Asynchronous |
| Ekstensi file | `.js` (default) | `.mjs` atau `"type": "module"` di package.json |
| Digunakan di | Node.js (default) | Browser & Node.js modern |

> **Catatan**: Untuk saat ini, kita akan menggunakan CommonJS (`require`/`module.exports`) karena masih menjadi standar di banyak proyek Node.js. Anda sudah belajar ES Modules (`import`/`export`) di kursus JavaScript Lanjutan.

Dengan module system, kode Anda bisa diorganisir dengan rapi — setiap file punya tanggung jawab spesifik, mudah dipelihara, dan bisa digunakan ulang. Di pelajaran selanjutnya, kita akan belajar tentang **NPM** — toko raksasa yang berisi jutaan modul siap pakai dari developer seluruh dunia!
