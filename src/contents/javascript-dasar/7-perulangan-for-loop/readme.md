# 7. Perulangan For Loop: Eksekusi Sesuai Hitungan Pasti

Berbeda dengan `While` yang dianalogikan sebagai aktivitas di mana kita tidak tahu pasti jumlahnya, `For` loop jauh lebih tertata dan jumlahnya sudah sangat terencana sejak awal jalannya aktivitas.

## Analogi: Guru Membagikan Rapor ke Murid
Seorang guru ingin membagikan buku rapor dari urutan laci terbawah (nomor absen 1) sampai absen terakhir (absen 30). Guru tersebut menanamkan 3 aturan di kepalanya secara bersamaan:
1. Mulai dari mana? (Mulai dari murid absen 1)
2. Sampai kapan batasnya? (Sampai ke absen bernomor kurang dari sama dengan 30)
3. Apa yang diubah setelah memberikan satu buku? (Lanjut memanggil absen berikutnya (tambah 1)).

Ini adalah konsep `for (Mulai; Batas; Perubahan)`!

## Implementasi Kode
```javascript
// Struktur: for( 1. Mulai; 2. Batas Akhir; 3. Langkah )
for (let absen = 1; absen <= 30; absen = absen + 1) {
    console.log("Membagikan rapor ke murid nomor urut: " + absen);
}

// Tips: "absen = absen + 1" biasanya disingkat oleh programmer menjadi "absen++"!

console.log("Hore, semua murid sudah dapat rapor!");
```

### Mengambil Barang Dari Dalam Array
For Loop paling bersahabat dengan Array (Lemari banyak laci). Kita bisa menggunakan gabungan dari urutan angka For Loop ke dalam nomor urut Laci si Array!

```javascript
let daftarBuah = ["Apel", "Pisang", "Jeruk", "Mangga"];

// i dimulai dari 0 (ingat laci pertama = 0), dan batas maksimalnya i kurang dari total panjang buah laci
for (let i = 0; i < daftarBuah.length; i++) {
    console.log("Laci nomor", i, "berisi:", daftarBuah[i]);
}
```
