# 2. Variabel & Tipe Data: Menyimpan Sesuatu ke Dalam Kotak

Dalam coding, kita sering sekali perlu menyimpan informasi sementara untuk digunakan di langkah selanjutnya. Di sinilah Variabel dan Tipe Data berperan.

## Analogi: Kardus Penyimpanan yang Diberikan Label
Bayangkan Anda sedang pindah rumah. Anda memiliki banyak barang, dan agar tidak bingung, Anda memasukkannya ke dalam **kardus** lalu menempelkan **label stiker (nama kardus)** pada kardus tersebut. 
- **Variabel**: Adalah si "kardus" tempat menyimpan.
- **Tipe Data**: Adalah bentuk/jenis benda apa yang ada di dalam kardusnya (Air tidak bisa dicampur dengan batu).

Di JavaScript modern, kita menggunakan kardus berjenis `let` (kardus yang isinya bisa diganti nanti) dan `const` (kardus brankas permanen, isinya tidak bisa diganti).

### Berbagai Bentuk Kardus (Tipe Data)
- **String (Teks)** : Ibarat pakaian, bentuknya berupa huruf dan kata-kata (`"Budi"`, `"Apel"`).
- **Number (Angka)** : Ibarat koin/uang, bentuknya pasti angka murni (`10`, `3.14`).
- **Boolean (Benar/Salah)** : Ibarat saklar lampu, hanya ada dua kemungkinan: nyala/hidup (`true`) atau mati/salah (`false`).

## Implementasi Kode
```javascript
// 1. Membuat kardus "nama", dan mengisinya dengan String (teks)
let nama = "Budi Santoso";

// 2. Membuat kardus "umur", dan mengisinya dengan Angka
let umur = 25;

// 3. Membuat kardus "sudahMenikah", dan isinya adalah kondisi
let sudahMenikah = false;

// 4. Kardus permanen (konstanta), nilainya mutlak tidak bisa diubah
const TANGGAL_LAHIR = "15 Agustus 1999";

console.log("Nama saya adalah " + nama);
console.log("Umur saya tahun ini: ", umur);
```

### Hal yang Perlu Diingat
- Gunakan `let` kalau isi dari informasi tersebut akan berubah seiring waktu (seperti `umur` bertambah).
- Gunakan `const` jika informasinya pasti dan paten (seperti tanggal lahir kita).
