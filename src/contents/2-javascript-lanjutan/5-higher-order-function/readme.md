# Higher-Order Function: Fungsi yang Menerima Fungsi

Higher-Order Function (HOF) adalah fungsi yang **menerima fungsi lain sebagai argumen** dan/atau **mengembalikan fungsi**. Ini adalah pondasi dari gaya pemrograman fungsional di JavaScript.

## Analogi: Manajer yang Mendelegasikan Tugas

Bayangkan seorang Manajer Produksi yang punya dua karyawan ahli: **Bu Rini si ahli filter** dan **Pak Budi si ahli hitung**. Manajer tidak melakukan pekerjaan sendiri — ia **menyerahkan tugasnya kepada ahlinya**. Inilah Higher-Order Function: fungsi induk yang mendelegasikan operasinya ke fungsi yang diterima sebagai parameter.

## Tiga HOF Paling Penting di Array

### 1. `.map()` — Mengubah Setiap Elemen

`.map()` seperti pabrik yang mengambil setiap produk, memprosesnya, lalu mengembalikan produk baru. Array asli **tidak berubah**.

```javascript
const hargaAsli = [10000, 25000, 15000, 50000];

// Terapkan diskon 20% ke setiap harga
const hargaDiskon = hargaAsli.map(harga => harga * 0.8);
console.log(hargaAsli);    // [10000, 25000, 15000, 50000] — tidak berubah!
console.log(hargaDiskon);  // [8000, 20000, 12000, 40000] — hasil baru

// Contoh: ubah array object
const siswa = [
    { nama: "Andi", nilai: 78 },
    { nama: "Budi", nilai: 92 },
    { nama: "Cici", nilai: 65 }
];

const hasilUjian = siswa.map(s => ({
    nama: s.nama,
    nilai: s.nilai,
    lulus: s.nilai >= 70 ? "Lulus ✅" : "Tidak Lulus ❌"
}));

console.log(hasilUjian);
```

### 2. `.filter()` — Menyaring Elemen

`.filter()` seperti ayakan — hanya elemen yang memenuhi syarat yang "lolos".

```javascript
const produk = [
    { nama: "Laptop",  harga: 12000000, stok: 5 },
    { nama: "Mouse",   harga: 150000,   stok: 0 },
    { nama: "Monitor", harga: 3500000,  stok: 2 },
    { nama: "Keyboard",harga: 500000,   stok: 0 },
    { nama: "Webcam",  harga: 750000,   stok: 8 }
];

// Filter hanya produk yang masih ada stoknya
const tersedia = produk.filter(p => p.stok > 0);
console.log(tersedia.map(p => p.nama));
// ["Laptop", "Monitor", "Webcam"]

// Filter produk di bawah 1 juta DAN ada stoknya
const murahTersedia = produk.filter(p => p.harga < 1000000 && p.stok > 0);
console.log(murahTersedia);
```

### 3. `.reduce()` — Merangkum Semua Elemen Menjadi Satu Nilai

`.reduce()` seperti menghitung total tagihan dari tumpukan struk. Anda terus "mengakumulasi" hingga menghasilkan satu nilai akhir.

```javascript
const pengeluaranHarian = [50000, 25000, 80000, 30000, 45000];

// Hitung total pengeluaran
const totalPengeluaran = pengeluaranHarian.reduce((akumulasi, nilai) => {
    return akumulasi + nilai;
}, 0); // '0' adalah nilai awal akumulasi

console.log("Total pengeluaran minggu ini: Rp", totalPengeluaran); // Rp 230000

// Reduce untuk hal yang lebih kompleks: hitung stok total per kategori
const inventori = [
    { kategori: "elektronik", jumlah: 5 },
    { kategori: "pakaian",    jumlah: 12 },
    { kategori: "elektronik", jumlah: 3 },
    { kategori: "pakaian",    jumlah: 7 }
];

const totalPerKategori = inventori.reduce((acc, item) => {
    acc[item.kategori] = (acc[item.kategori] || 0) + item.jumlah;
    return acc;
}, {});

console.log(totalPerKategori);
// { elektronik: 8, pakaian: 19 }
```

## Membuat HOF Sendiri

```javascript
// Fungsi yang MEMBUAT fungsi (mengembalikan fungsi)
function buatPengali(faktor) {
    // Fungsi di dalam fungsi!
    return function(angka) {
        return angka * faktor;
    };
}

const kalikanDua   = buatPengali(2);
const kalikanTiga  = buatPengali(3);
const kalikanSepuluh = buatPengali(10);

console.log(kalikanDua(5));      // 10
console.log(kalikanTiga(7));     // 21
console.log(kalikanSepuluh(99)); // 990
```

## Chaining: Menggabungkan HOF

```javascript
const karyawan = [
    { nama: "Adi",  departemen: "IT",  gaji: 8000000 },
    { nama: "Beni", departemen: "HR",  gaji: 6000000 },
    { nama: "Cita", departemen: "IT",  gaji: 9500000 },
    { nama: "Dian", departemen: "IT",  gaji: 7000000 },
    { nama: "Eka",  departemen: "HR",  gaji: 6500000 }
];

// Filter karyawan IT → hitung total gajinya
const totalGajiIT = karyawan
    .filter(k => k.departemen === "IT")         // ambil yang IT saja
    .map(k => k.gaji)                           // ambil hanya nilai gajinya
    .reduce((total, gaji) => total + gaji, 0);  // jumlahkan semua

console.log("Total gaji departemen IT: Rp", totalGajiIT.toLocaleString('id-ID'));
// Total gaji departemen IT: Rp 24.500.000
```
