# 6. Path Module: GPS untuk Sistem File

Setiap file di komputer memiliki alamat — seperti rumah yang punya alamat lengkap. Masalahnya, format alamat berbeda-beda di setiap sistem operasi: Windows menggunakan backslash (`C:\Users\dokumen`), sedangkan Mac/Linux menggunakan forward slash (`/home/users/dokumen`). Modul **path** adalah GPS yang menangani semua perbedaan ini secara otomatis.

## Analogi: GPS / Google Maps untuk File

Bayangkan modul `path` adalah Google Maps khusus untuk file di komputer:
- **path.join()** = Menggabungkan rute jalan ("Jl. Merdeka" + "No. 17" = "Jl. Merdeka/No. 17")
- **path.resolve()** = Mendapatkan alamat lengkap dari titik saat ini ke tujuan
- **path.basename()** = Melihat nama gedung saja dari alamat lengkap
- **path.dirname()** = Melihat nama jalan saja (tanpa nama gedung)
- **path.extname()** = Melihat jenis gedung (.rumah, .kantor, .toko)

## Mengimpor Path Module

```javascript
const path = require('path');
// Modul bawaan Node.js — tidak perlu npm install
```

## path.join() — Menggabungkan Alamat dengan Aman

Fungsi paling sering digunakan. Menggabungkan potongan-potongan path menjadi satu path yang valid.

```javascript
const path = require('path');

// ✅ Menggunakan path.join() — aman di semua OS
const alamatFile = path.join('data', 'pengguna', 'profil.json');
console.log(alamatFile);
// Windows: data\pengguna\profil.json
// Mac/Linux: data/pengguna/profil.json

// ✅ Menggabungkan dengan __dirname (folder file saat ini)
const alamatLengkap = path.join(__dirname, 'data', 'config.json');
console.log(alamatLengkap);
// Contoh: /proyek/src/data/config.json

// ✅ Naik satu folder dengan '..'
const folderInduk = path.join(__dirname, '..', 'public', 'gambar');
console.log(folderInduk);
// Dari /proyek/src → /proyek/public/gambar

// ❌ JANGAN gabung path manual dengan string concatenation
const salah = 'data' + '/' + 'file.txt';  // Tidak aman di Windows!
const salah2 = 'data' + '\\' + 'file.txt'; // Tidak aman di Mac/Linux!
```

## path.resolve() — Mendapatkan Alamat Absolut

Seperti GPS yang selalu memberikan alamat lengkap, bukan arah relatif.

```javascript
const path = require('path');

// Mengubah path relatif menjadi absolut
const absolut = path.resolve('data', 'pengguna.json');
console.log(absolut);
// Contoh: /home/user/proyek/data/pengguna.json

// Jika dimulai dengan '/', dianggap dari root
const dariRoot = path.resolve('/tmp', 'log.txt');
console.log(dariRoot);
// Output: /tmp/log.txt

// Perbedaan join vs resolve
console.log(path.join('src', 'data'));      // src/data (relatif)
console.log(path.resolve('src', 'data'));   // /home/user/proyek/src/data (absolut)
```

## path.basename() — Mengambil Nama File

```javascript
const path = require('path');

// Mendapatkan nama file dari path lengkap
console.log(path.basename('/proyek/data/laporan.pdf'));
// Output: laporan.pdf

// Menghilangkan ekstensi
console.log(path.basename('/proyek/data/laporan.pdf', '.pdf'));
// Output: laporan

// Berguna untuk menampilkan nama file ke pengguna
const filePath = '/upload/gambar/foto-profil-2024.jpg';
console.log(`File yang diupload: ${path.basename(filePath)}`);
// Output: File yang diupload: foto-profil-2024.jpg
```

## path.dirname() — Mengambil Nama Direktori

```javascript
const path = require('path');

// Mendapatkan folder dari path lengkap
console.log(path.dirname('/proyek/data/laporan.pdf'));
// Output: /proyek/data

console.log(path.dirname('/proyek/src/utils/helper.js'));
// Output: /proyek/src/utils
```

## path.extname() — Mengambil Ekstensi File

```javascript
const path = require('path');

console.log(path.extname('foto.jpg'));        // .jpg
console.log(path.extname('dokumen.pdf'));      // .pdf
console.log(path.extname('script.min.js'));    // .js
console.log(path.extname('README'));           // '' (tidak ada ekstensi)
console.log(path.extname('.gitignore'));       // '' (tidak ada ekstensi)

// Contoh: Filter file berdasarkan ekstensi
const files = ['data.json', 'foto.png', 'style.css', 'app.js', 'readme.md'];
const fileJS = files.filter(f => path.extname(f) === '.js');
console.log("File JavaScript:", fileJS);  // ['app.js']
```

## path.parse() dan path.format()

```javascript
const path = require('path');

// parse: Memecah path menjadi komponen-komponen
const info = path.parse('/proyek/src/utils/helper.js');
console.log(info);
// {
//   root: '/',
//   dir: '/proyek/src/utils',
//   base: 'helper.js',
//   ext: '.js',
//   name: 'helper'
// }

// format: Merangkai komponen menjadi path lengkap
const pathBaru = path.format({
    dir: '/proyek/output',
    name: 'laporan-2024',
    ext: '.pdf'
});
console.log(pathBaru);  // /proyek/output/laporan-2024.pdf
```

## path.isAbsolute() — Mengecek Jenis Path

```javascript
const path = require('path');

// Path absolut dimulai dari root
console.log(path.isAbsolute('/home/user/file.txt'));  // true
console.log(path.isAbsolute('C:\\Users\\file.txt'));   // true (Windows)

// Path relatif dimulai dari lokasi saat ini
console.log(path.isAbsolute('data/file.txt'));         // false
console.log(path.isAbsolute('./src/app.js'));           // false
console.log(path.isAbsolute('../config.json'));         // false
```

## Contoh Praktis: File Manager Sederhana

```javascript
// File: file-manager.js
const fs = require('fs');
const path = require('path');

function analisisFolder(folderPath) {
    const targetFolder = path.resolve(folderPath);
    console.log(`\n📁 Menganalisis: ${targetFolder}\n`);

    const isiFolder = fs.readdirSync(targetFolder);

    const hasil = {
        folder: [],
        file: {}
    };

    isiFolder.forEach(item => {
        const itemPath = path.join(targetFolder, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            hasil.folder.push(item);
        } else {
            const ext = path.extname(item) || '(tanpa ekstensi)';
            if (!hasil.file[ext]) hasil.file[ext] = [];
            hasil.file[ext].push({
                nama: path.basename(item, ext),
                ukuran: `${(stats.size / 1024).toFixed(1)} KB`
            });
        }
    });

    // Tampilkan folder
    if (hasil.folder.length > 0) {
        console.log("📂 Folder:");
        hasil.folder.forEach(f => console.log(`   └── ${f}/`));
    }

    // Tampilkan file per ekstensi
    console.log("\n📄 File (dikelompokkan per jenis):");
    Object.keys(hasil.file).forEach(ext => {
        console.log(`\n   ${ext}:`);
        hasil.file[ext].forEach(f => {
            console.log(`      - ${f.nama}${ext} (${f.ukuran})`);
        });
    });

    console.log(`\nTotal: ${hasil.folder.length} folder, ${isiFolder.length - hasil.folder.length} file`);
}

// Analisis folder saat ini atau folder yang diberikan
const targetFolder = process.argv[2] || '.';
analisisFolder(targetFolder);

// Cara pakai: node file-manager.js /path/to/folder
```

## Cheatsheet Path Module

| Method | Fungsi | Contoh Output |
|---|---|---|
| `path.join('a','b','c.txt')` | Gabung path | `a/b/c.txt` |
| `path.resolve('data')` | Path absolut | `/home/user/proyek/data` |
| `path.basename('/a/b/c.txt')` | Nama file | `c.txt` |
| `path.dirname('/a/b/c.txt')` | Nama folder | `/a/b` |
| `path.extname('c.txt')` | Ekstensi | `.txt` |
| `path.parse('/a/b/c.txt')` | Pecah komponen | `{root, dir, base, ext, name}` |
| `path.isAbsolute('/a')` | Cek absolut? | `true` |

Selalu gunakan modul `path` saat bekerja dengan alamat file dan folder — jangan pernah menggabungkan path secara manual dengan string. Ini memastikan kode Anda berjalan dengan benar di semua sistem operasi!
