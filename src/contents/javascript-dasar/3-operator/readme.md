# 3. Operator: Kalkulator dan Timbangan Komputer

Aplikasi komputer pada dasarnya sangat ahli dalam berhitung logika. Operator adalah simbol-simbol yang kita gunakan untuk menginstruksikan perhitungan matematika atau perbandingan.

## Analogi: Mesin Kasir di Minimarket (Matematika) dan Timbangan Buah (Logika)
- **Operator Matematika (+, -, *, /)**: Anggap komputer seperti kalkulator mesin kasir. Jika Anda membeli dua permen yang harganya 500 perak, mesin kasir akan menjumlahkannya (`500 + 500 = 1000`).
- **Operator Perbandingan (>, <, ==, !==)**: Anggap seperti timbangan di pasar. Jika ditaruh apel di sisi kiri dan batu di sisi kanan, timbangan akan "mengecek/membandingkan" sisi mana yang lebih berat. Operator ini tidak memutar angka, melainkan memutar jawaban `Benar (true)` atau `Salah (false)`.

## Implementasi Kode
```javascript
// --- 1. OPERATOR MATEMATIKA ---
let hargaPermen = 500;
let jumlahBeli = 3;

// Kita suruh Javascript menghitung (dikali dengan *)
let totalBelanja = hargaPermen * jumlahBeli; 
console.log("Total yang harus dibayar: Rp", totalBelanja); // Hasil: 1500

// --- 2. OPERATOR PERBANDINGAN ---
let uangDiDompet = 2000;

// Mengecek: Apakah uang di dompet lebih besar / cukup dari total belanja?
let apakahUangCukup = uangDiDompet > totalBelanja;
console.log("Apakah uang cukup?", apakahUangCukup); // Hasil: true

// Mengecek: Apakah sisa uang sama dengan 0? (== digunakan untuk mengecek kesamaan)
let sisa = uangDiDompet - totalBelanja;
console.log("Apakah uang pas tanpa kembalian?", sisa == 0); // Hasil: false
```

### Kesimpulan
- Selalu gunakan `*` untuk kali dan `/` untuk bagi.
- Menggunakan `==` artinya menanyakan "apakah nilainya sama?", sedangkan `=` artinya "masukkan nilai ke dalam variabel (kardus)". Hati-hati jangan tertukar!
