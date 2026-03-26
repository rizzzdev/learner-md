# 8. Event dan EventEmitter: Sistem Bel di Restoran

Node.js adalah platform yang **event-driven** — semua hal digerakkan oleh "kejadian" (event). Ketika file selesai dibaca, itu event. Ketika ada koneksi baru ke server, itu event. Ketika data diterima, itu event. Memahami event adalah kunci untuk memahami cara kerja Node.js secara keseluruhan.

## Analogi: Sistem Bel di Restoran Cepat Saji

Bayangkan Anda di restoran cepat saji (seperti McDonald's):

1. Anda **memesan** di kasir dan mendapat **nomor antrian**
2. Anda **duduk dan menunggu** — tidak berdiri di depan dapur
3. Ketika pesanan siap, **bel berbunyi** dan nomor Anda ditampilkan
4. Anda **datang mengambil** pesanan

Dalam Node.js:
- **Bel berbunyi** = `emit()` — mengirimkan event (memberitahu bahwa sesuatu terjadi)
- **Anda mendengar bel** = `.on()` — mendaftarkan listener (siap bereaksi saat event terjadi)
- **Nomor antrian** = Nama event (identifier agar tahu event mana yang terjadi)
- **Mengambil pesanan** = Callback function (aksi yang dilakukan saat event terjadi)

## EventEmitter: Kelas Induk Semua Event

```javascript
// Mengimpor kelas EventEmitter dari modul 'events'
const EventEmitter = require('events');

// Membuat objek emitter baru (seperti memasang sistem bel di restoran)
const bel = new EventEmitter();

// 1. MENDAFTARKAN LISTENER — "Siapa yang mendengar bel?"
// .on(namaEvent, callback) — mendaftar untuk mendengar event tertentu
bel.on('pesananSiap', (nomorAntrian, menu) => {
    console.log(`🔔 Bel berbunyi! Nomor ${nomorAntrian}, pesanan "${menu}" sudah siap!`);
});

// 2. MENGIRIM EVENT — "Bunyikan bel!"
// .emit(namaEvent, ...data) — mengirim event dengan data tambahan
bel.emit('pesananSiap', 42, 'Nasi Goreng');
// Output: 🔔 Bel berbunyi! Nomor 42, pesanan "Nasi Goreng" sudah siap!

bel.emit('pesananSiap', 43, 'Mie Ayam');
// Output: 🔔 Bel berbunyi! Nomor 43, pesanan "Mie Ayam" sudah siap!
```

## Beberapa Listener untuk Satu Event

Satu event bisa didengar oleh banyak listener — seperti bel restoran yang didengar oleh pelanggan DAN manajer.

```javascript
const EventEmitter = require('events');
const toko = new EventEmitter();

// Listener 1: Sistem kasir
toko.on('pembelian', (item, harga) => {
    console.log(`💰 Kasir: "${item}" seharga Rp${harga.toLocaleString()} tercatat`);
});

// Listener 2: Sistem stok
toko.on('pembelian', (item) => {
    console.log(`📦 Gudang: Stok "${item}" berkurang 1`);
});

// Listener 3: Sistem notifikasi
toko.on('pembelian', (item, harga) => {
    if (harga > 100000) {
        console.log(`🎉 Promo: Pembelian besar terdeteksi!`);
    }
});

// Satu emit, tiga listener merespon!
toko.emit('pembelian', 'Laptop Gaming', 15000000);
// Output:
// 💰 Kasir: "Laptop Gaming" seharga Rp15.000.000 tercatat
// 📦 Gudang: Stok "Laptop Gaming" berkurang 1
// 🎉 Promo: Pembelian besar terdeteksi!
```

## .once() — Mendengar Hanya Sekali

Kadang kita hanya ingin merespon event pertama kali saja — seperti hadiah selamat datang yang hanya diberikan sekali.

```javascript
const EventEmitter = require('events');
const app = new EventEmitter();

// .once() — listener ini hanya aktif SATU KALI
app.once('mulai', () => {
    console.log('🚀 Aplikasi dimulai untuk pertama kali!');
    console.log('🎁 Selamat datang! Ini hadiah pendaftaran Anda.');
});

app.emit('mulai');  // ✅ Listener aktif
// Output: 🚀 Aplikasi dimulai untuk pertama kali!
//         🎁 Selamat datang! Ini hadiah pendaftaran Anda.

app.emit('mulai');  // ❌ Listener sudah dihapus, tidak terjadi apa-apa
app.emit('mulai');  // ❌ Masih tidak terjadi apa-apa
```

## Menghapus Listener

```javascript
const EventEmitter = require('events');
const radio = new EventEmitter();

// Fungsi listener (harus disimpan di variabel agar bisa dihapus)
function pendengarMusik(lagu) {
    console.log(`🎵 Sedang memutar: ${lagu}`);
}

// Mendaftarkan listener
radio.on('putarLagu', pendengarMusik);

radio.emit('putarLagu', 'Bohemian Rhapsody');  // ✅ Terdengar

// Menghapus listener (berhenti mendengarkan)
radio.removeListener('putarLagu', pendengarMusik);
// Atau gunakan: radio.off('putarLagu', pendengarMusik);

radio.emit('putarLagu', 'Hotel California');  // ❌ Tidak terdengar lagi

// Menghapus SEMUA listener untuk suatu event
radio.removeAllListeners('putarLagu');
```

## Contoh Praktis: Sistem Pemesanan Makanan

```javascript
const EventEmitter = require('events');

class Restoran extends EventEmitter {
    constructor(nama) {
        super();
        this.nama = nama;
        this.antrian = [];
        this.nomorAntrian = 0;
    }

    terimaPesanan(pelanggan, menu) {
        this.nomorAntrian++;
        const pesanan = {
            nomor: this.nomorAntrian,
            pelanggan,
            menu,
            waktu: new Date().toLocaleTimeString('id-ID')
        };
        this.antrian.push(pesanan);

        // Emit event: pesanan baru diterima
        this.emit('pesananMasuk', pesanan);

        // Simulasi memasak (2 detik)
        setTimeout(() => {
            this.emit('pesananSiap', pesanan);
            this.antrian = this.antrian.filter(p => p.nomor !== pesanan.nomor);
        }, 2000);
    }
}

// Membuat restoran
const warung = new Restoran('Warung Bahagia');

// Mendaftarkan listener untuk berbagai event
warung.on('pesananMasuk', (pesanan) => {
    console.log(`📝 Pesanan #${pesanan.nomor} diterima: ${pesanan.menu} untuk ${pesanan.pelanggan}`);
    console.log(`   ⏰ Waktu: ${pesanan.waktu}`);
});

warung.on('pesananSiap', (pesanan) => {
    console.log(`\n✅ Pesanan #${pesanan.nomor} SIAP!`);
    console.log(`   🍽️ ${pesanan.menu} untuk ${pesanan.pelanggan}`);
    console.log(`   🔔 "${pesanan.pelanggan}, pesanan Anda sudah siap!"\n`);
});

// Simulasi pesanan masuk
warung.terimaPesanan('Budi', 'Nasi Goreng Spesial');
warung.terimaPesanan('Sari', 'Mie Ayam Bakso');

setTimeout(() => {
    warung.terimaPesanan('Andi', 'Sate Ayam 10 Tusuk');
}, 1000);
```

## Event Bawaan di Node.js

Node.js menggunakan event di mana-mana. Banyak modul bawaan yang sudah menggunakan EventEmitter:

```javascript
// 1. HTTP Server — event 'request'
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
    console.log(`Request masuk: ${req.method} ${req.url}`);
    res.end('Halo!');
});

server.on('listening', () => {
    console.log('Server sudah siap!');
});

server.listen(3000);

// 2. Stream — event 'data', 'end', 'error'
const fs = require('fs');
const stream = fs.createReadStream('file-besar.txt');

stream.on('data', (chunk) => {
    console.log('Menerima potongan data...');
});

stream.on('end', () => {
    console.log('Selesai membaca file!');
});

stream.on('error', (err) => {
    console.error('Error:', err.message);
});

// 3. Process — event 'exit', 'uncaughtException'
process.on('exit', (kode) => {
    console.log(`Aplikasi berhenti dengan kode: ${kode}`);
});
```

## Menangani Event Error

Event `error` bersifat spesial di Node.js — jika tidak ditangani, aplikasi akan crash!

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// ✅ SELALU tangani event 'error'
emitter.on('error', (err) => {
    console.error('Terjadi error:', err.message);
});

// Jika kita emit error, handler di atas akan menangkapnya
emitter.emit('error', new Error('Koneksi database gagal'));

// ❌ Tanpa handler 'error', baris berikut akan CRASH aplikasi!
// emitter.emit('error', new Error('Crash!')); // JANGAN!
```

## Cheatsheet EventEmitter

| Method | Fungsi | Analogi |
|---|---|---|
| `.on(event, fn)` | Dengarkan event | Memasang telinga untuk bel tertentu |
| `.once(event, fn)` | Dengarkan sekali saja | Kupon promo sekali pakai |
| `.emit(event, ...args)` | Kirim/trigger event | Membunyikan bel |
| `.off(event, fn)` | Berhenti mendengarkan | Melepas headset |
| `.removeAllListeners(event)` | Hapus semua listener | Matikan semua alarm |
| `.listenerCount(event)` | Hitung jumlah listener | Cek berapa orang yang mendengarkan |
| `.eventNames()` | Lihat semua event aktif | Daftar semua jenis bel |

Event-driven architecture adalah jantung dari Node.js. Konsep ini memungkinkan Node.js menangani ribuan koneksi secara efisien dengan satu thread saja — karena ia tidak menunggu, melainkan bereaksi saat ada event. Di pelajaran selanjutnya, kita akan belajar tentang **Stream dan Buffer** yang juga sangat bergantung pada event!
