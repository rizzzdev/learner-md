# 4. Pengkondisian If-Else: Pengambil Keputusan

Dalam membuat aplikasi, keadaan tidak selalu datar. Akan ada banyak kondisi bercabang yang mengharuskan aplikasi komputer mengambil "Keputusan".

## Analogi: Satpam Penjaga Bioskop
Bayangkan Anda ingin masuk ke sebuah ruang teater Bioskop untuk menonton film dewasa. Di depan pintu, ada seorang Satpam pemeriksa KTP.
- Satpam punya panduan: **"JIKA (IF)"** penonton sudah berusia di atas 17 tahun, maka persilakan masuk.
- **"SELAIN ITU (ELSE)"**, suruh pulang atau berikan peringatan bahwa ia belum remaja.

Konsep `if` dan `else` di Javascript sangat mirip dengan panduan operasi berpikir seorang Satpam!

## Implementasi Kode
```javascript
let umurPenonton = 15;

// Blok If: "Pak Satpam, tolong evaluasi kondisinya"
if (umurPenonton >= 17) {
    // Area ini dieksekusi HANYA JIKA kondisinya benar (true)
    console.log("Silakan masuk bioskop. Selamat menonton!");
} else {
    // Area ini dieksekusi JIKA SEMUA GAGAL (false)
    console.log("Mohon maaf, Anda belum cukup umur untuk menonton film ini.");
}

// CONTOH CABANG LEBIH BANYAK (Else If)
let cuaca = "hujan";

if (cuaca == "cerah") {
    console.log("Mari kita main bola di lapangan!");
} else if (cuaca == "hujan") {
    // Else IF digunakan untuk mengecek kemungkinan spesifik alternatif
    console.log("Yah, mari kita main game saja di rumah.");
} else {
    console.log("Saya tidak yakin mau ngapain.");
}
```

Blok di dalam kurung kurawal `{ }` menggambarkan "tindakan (aksi)" yang diambil jika syarat di dalam kurung bulat `( )` terpenuhi. Anda bisa membuat percabangan serumit dan sebanyak apa pun.
