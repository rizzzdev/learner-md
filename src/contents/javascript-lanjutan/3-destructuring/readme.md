# Destructuring: Membongkar Isi Array dan Object

Destructuring adalah salah satu fitur ES6 yang paling sering digunakan. Ia memungkinkan kita mengekstrak nilai dari Array atau Object ke dalam variabel-variabel terpisah dengan cara yang elegan dan singkat.

## Analogi: Membongkar Koper Oleh-oleh

Bayangkan Anda pulang dari liburan Bali membawa koper berisi: baju batik, kopi kintamani, dan gantungan kunci. Tanpa destructuring, Anda harus mengeluarkannya satu-satu secara manual. Dengan destructuring, seperti ada asisten yang membongkar koper dan langsung menaruh setiap barang di tempat yang sudah diberi label.

## Destructuring Array

```javascript
// Koper berisi 3 barang (Array)
const olehOleh = ["Baju Batik", "Kopi Kintamani", "Gantungan Kunci"];

// ❌ Cara lama: ambil satu per satu
const barang1 = olehOleh[0];
const barang2 = olehOleh[1];
const barang3 = olehOleh[2];

// ✅ Destructuring: satu baris, semua langsung tersimpan!
const [bajuBatik, kopiKintamani, gantunganKunci] = olehOleh;

console.log(bajuBatik);      // Baju Batik
console.log(kopiKintamani);  // Kopi Kintamani
console.log(gantunganKunci); // Gantungan Kunci

// Melewati elemen yang tidak dibutuhkan dengan koma kosong
const [pertama, , ketiga] = olehOleh;
console.log(pertama); // Baju Batik
console.log(ketiga);  // Gantungan Kunci

// Default value jika elemen tidak ada
const [a, b, c, d = "Tidak Ada"] = olehOleh;
console.log(d); // Tidak Ada
```

## Destructuring Object

```javascript
const profil = {
    nama: "Sari Dewi",
    umur: 25,
    kota: "Bandung",
    pekerjaan: "Designer"
};

// ❌ Cara lama
const nama = profil.nama;
const umur = profil.umur;

// ✅ Object Destructuring: nama variabel harus SAMA dengan key object
const { nama: namaUser, umur: umurUser, kota, pekerjaan } = profil;
console.log(namaUser);   // Sari Dewi
console.log(umurUser);   // 25
console.log(kota);       // Bandung

// Atau lebih singkat jika nama variabel sama dengan key-nya
const { nama: n, umur: u, kota: k } = profil;
```

## Rename Variabel Saat Destructuring

```javascript
const data = { x: 10, y: 20 };

// Rename: ambil 'x' tapi simpan ke variabel bernama 'sumbu_x'
const { x: sumbuX, y: sumbuY } = data;
console.log(sumbuX); // 10
console.log(sumbuY); // 20
```

## Nested Destructuring (Object di Dalam Object)

```javascript
const karyawan = {
    nama: "Budi",
    alamat: {
        jalan: "Jl. Merdeka No. 1",
        kota: "Jakarta",
        kodePos: "10110"
    }
};

// Membongkar level dalam sekaligus
const { nama: nmKaryawan, alamat: { kota: kotaKaryawan, kodePos } } = karyawan;
console.log(nmKaryawan);   // Budi
console.log(kotaKaryawan); // Jakarta
console.log(kodePos);      // 10110
```

## Destructuring di Parameter Fungsi

Ini pola yang sangat umum dipakai di React!

```javascript
// Tanpa destructuring
function tampilkanProfil(pengguna) {
    console.log(pengguna.nama + " tinggal di " + pengguna.kota);
}

// ✅ Dengan destructuring langsung di parameter
function tampilkanProfil({ nama, kota, umur = 0 }) {
    console.log(`${nama} (${umur} thn) tinggal di ${kota}`);
}

tampilkanProfil({ nama: "Rina", kota: "Surabaya", umur: 30 });
// Rina (30 thn) tinggal di Surabaya
```

## Swap Variabel Tanpa Variabel Sementara

```javascript
let a = 1;
let b = 2;

// ❌ Cara lama: butuh variabel sementara
let temp = a;
a = b;
b = temp;

// ✅ Dengan destructuring: satu baris!
[a, b] = [b, a];
console.log(a, b); // 2 1
```
