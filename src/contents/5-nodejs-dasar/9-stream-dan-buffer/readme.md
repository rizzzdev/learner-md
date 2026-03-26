# 9. Stream dan Buffer: Menonton Netflix Tanpa Download

Bayangkan Anda ingin menonton film 2 jam di Netflix. Ada dua cara:
1. **Download dulu seluruh film** (2GB), baru nonton → Menunggu lama, boros memori
2. **Streaming** — film mengalir sedikit demi sedikit → Langsung nonton, hemat memori

Node.js bekerja dengan cara kedua melalui **Stream**. Dan potongan-potongan kecil data yang mengalir itu disebut **Buffer**.

## Analogi: Air Mengalir di Pipa

- **Stream** = Pipa air. Air (data) mengalir terus-menerus, sedikit demi sedikit
- **Buffer** = Ember penampung. Menampung air sementara sebelum diproses
- **Readable Stream** = Keran air (sumber air mengalir keluar)
- **Writable Stream** = Lubang pembuangan (tempat air mengalir masuk)
- **Pipe** = Menyambungkan pipa langsung dari keran ke pembuangan

## Buffer: Wadah Sementara untuk Data Mentah

Buffer adalah area memori yang menyimpan data biner mentah (angka 0 dan 1). Ia seperti ember yang menampung air sebelum Anda meminumnya.

```javascript
// Membuat Buffer dari teks
const buf1 = Buffer.from('Halo Node.js!');
console.log(buf1);
// Output: <Buffer 48 61 6c 6f 20 4e 6f 64 65 2e 6a 73 21>
// (representasi heksadesimal dari setiap karakter)

// Mengubah Buffer kembali ke teks
console.log(buf1.toString());
// Output: Halo Node.js!

// Membuat Buffer kosong dengan ukuran tertentu
const buf2 = Buffer.alloc(10); // 10 bytes, diisi 0
console.log(buf2);
// Output: <Buffer 00 00 00 00 00 00 00 00 00 00>

// Menulis ke Buffer
buf2.write('Hi!');
console.log(buf2.toString());
// Output: Hi!

// Ukuran Buffer
console.log(`Ukuran buffer: ${buf1.length} bytes`);
// Output: Ukuran buffer: 13 bytes
```

## Stream: Data yang Mengalir

### 4 Jenis Stream di Node.js

| Jenis | Fungsi | Analogi | Contoh |
|---|---|---|---|
| **Readable** | Membaca data | Keran air | `fs.createReadStream()` |
| **Writable** | Menulis data | Ember penampung | `fs.createWriteStream()` |
| **Duplex** | Baca & tulis | Telepon (bicara & dengar) | Koneksi TCP |
| **Transform** | Ubah data saat mengalir | Filter air | Kompresi gzip |

### Readable Stream: Membaca File Besar

```javascript
const fs = require('fs');

// ❌ CARA LAMA: Membaca seluruh file sekaligus
// Jika file 1GB, butuh 1GB RAM!
// fs.readFile('film.mp4', (err, data) => {
//     console.log(data); // 1GB data dimuat ke memori sekaligus!
// });

// ✅ CARA STREAM: Membaca file sedikit demi sedikit
const stream = fs.createReadStream('data-besar.txt', {
    encoding: 'utf8',
    highWaterMark: 64 * 1024  // 64KB per potongan (chunk)
});

let jumlahChunk = 0;

// Event 'data' — dipanggil setiap ada potongan data yang masuk
stream.on('data', (chunk) => {
    jumlahChunk++;
    console.log(`📦 Chunk #${jumlahChunk} diterima (${chunk.length} bytes)`);
});

// Event 'end' — dipanggil ketika semua data sudah selesai dibaca
stream.on('end', () => {
    console.log(`\n✅ Selesai! Total ${jumlahChunk} chunk dibaca`);
});

// Event 'error' — dipanggil jika terjadi error
stream.on('error', (err) => {
    console.error('❌ Error:', err.message);
});
```

### Writable Stream: Menulis Data Besar

```javascript
const fs = require('fs');

// Membuat writable stream
const penulis = fs.createWriteStream('log-aplikasi.txt');

// Menulis data sedikit demi sedikit
for (let i = 1; i <= 10000; i++) {
    penulis.write(`[${new Date().toISOString()}] Log entri ke-${i}\n`);
}

// Menandai bahwa penulisan sudah selesai
penulis.end('--- Akhir dari log ---\n');

// Event 'finish' — dipanggil setelah semua data ditulis
penulis.on('finish', () => {
    console.log('✅ Semua log berhasil ditulis!');
});

penulis.on('error', (err) => {
    console.error('❌ Gagal menulis:', err.message);
});
```

## Pipe: Menyambungkan Pipa

**Pipe** adalah cara paling elegan untuk menghubungkan readable stream ke writable stream — seperti menyambungkan dua pipa air langsung.

```javascript
const fs = require('fs');

// ✅ Menyalin file besar dengan stream pipe
const sumber = fs.createReadStream('video-besar.mp4');
const tujuan = fs.createWriteStream('salinan-video.mp4');

// Pipe: alirkan data dari sumber langsung ke tujuan
sumber.pipe(tujuan);

tujuan.on('finish', () => {
    console.log('✅ File berhasil disalin!');
});

// Perbandingan memori:
// readFile + writeFile: Butuh RAM sebesar ukuran file (1GB file = 1GB RAM)
// Stream + pipe: Hanya butuh ~64KB RAM, berapapun ukuran filenya!
```

### Chaining Pipe (Pipa Berantai)

```javascript
const fs = require('fs');
const zlib = require('zlib'); // modul kompresi bawaan Node.js

// Membaca file → Kompres → Simpan file terkompresi
// Seperti: Air dari keran → Filter → Botol penyimpanan
fs.createReadStream('data-besar.txt')
    .pipe(zlib.createGzip())                      // Transform: kompres
    .pipe(fs.createWriteStream('data-besar.txt.gz')) // Tulis hasil
    .on('finish', () => {
        console.log('✅ File berhasil dikompres!');
    });

// Dekompresi (kebalikannya)
fs.createReadStream('data-besar.txt.gz')
    .pipe(zlib.createGunzip())                     // Transform: dekompresi
    .pipe(fs.createWriteStream('data-besar-asli.txt'))
    .on('finish', () => {
        console.log('✅ File berhasil didekompresi!');
    });
```

## Contoh Praktis: HTTP Server dengan Stream

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/video') {
        // ❌ TANPA Stream: Memuat seluruh video ke memori dulu
        // fs.readFile('video.mp4', (err, data) => {
        //     res.end(data); // 500MB video = 500MB RAM per request!
        // });

        // ✅ DENGAN Stream: Mengalirkan video langsung ke response
        const videoStream = fs.createReadStream('video.mp4');
        res.writeHead(200, { 'Content-Type': 'video/mp4' });
        videoStream.pipe(res);
        // 500MB video = hanya ~64KB RAM per request!
    }
});

server.listen(3000, () => {
    console.log('Server streaming berjalan di http://localhost:3000');
});
```

## Perbandingan: readFile vs Stream

```javascript
const fs = require('fs');

// Skenario: Membaca file 500MB

// ❌ readFile — Muat semua ke memori
console.log('Memori sebelum readFile:', process.memoryUsage().heapUsed);
// Bayangkan ini memakan 500MB RAM!

// ✅ Stream — Proses sedikit demi sedikit
const stream = fs.createReadStream('file-500mb.dat');
let totalBytes = 0;

stream.on('data', (chunk) => {
    totalBytes += chunk.length;
    // Setiap chunk hanya ~64KB di memori
});

stream.on('end', () => {
    console.log(`Total dibaca: ${totalBytes} bytes`);
    console.log('Memori tetap rendah karena stream!');
});
```

| Aspek | `readFile` | Stream |
|---|---|---|
| Memori | Seluruh file dimuat | Hanya potongan kecil |
| Kecepatan mulai | Harus tunggu selesai | Bisa mulai langsung |
| File 10MB | ✅ Masih OK | ✅ OK |
| File 1GB+ | ❌ Bisa crash/lambat | ✅ Lancar |
| Cocok untuk | File kecil, config | File besar, video, log |

Stream dan Buffer adalah konsep fundamental yang membuat Node.js sangat efisien dalam menangani data besar. Dari streaming video, upload file, hingga memproses log berukuran gigabyte — semuanya bisa dilakukan tanpa membebani memori server!
