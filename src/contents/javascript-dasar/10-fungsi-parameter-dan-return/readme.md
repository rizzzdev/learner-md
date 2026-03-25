# 10. Function Parameter dan Return: Pabrik Pemeras Jeruk

Modul terakhir dan paling kuat adalah meningkatkan fungsi/mesin yang kita rakit dengan bahan masukan (Input) dan hasil murni (Output).

## Analogi: Mesin Pembuat Jus Jeruk
- **Fungsi:** Pabrik Pemeras Jus Jeruk.
- **Parameter (Input Masukan):** Buah jeruk mentah di satu ranjang dan wadah es batu. (Anda yang menentukan berapa jumlah buah mentahnya untuk dituang ke corong)
- **Return (Hasil Balik / Output):** Gelas berisi Sari Pati (Jus) Jeruk siap minum. (Bukan sekadar proses cuap-cuap, melainkan diubah menjadi hasil jadi).

Ketika kita mendefinisikan sebuah parameter (yang ada di dalam kurung fungsi), nilai atau input dapat dimasukkan ketika fungsi tersebut akan dijalankan nantinya.

## Implementasi Kode
```javascript
// Merakit mesin pembuat jus. (buahApel, banyakEsBatu) dinamakan PARAMETER.
// Dia siap menampung berapapun nilai apel yang kita tuangkan nanti.
function blenderJus(buahYgDipilih, banyakEsBatu) {
    console.log("Sedang memblender", buahYgDipilih, "sebanyak", banyakEsBatu, "es batu...");
    
    // Hasil Blender
    let minumanJadi = "Jus Penuh Kesegaran dari Spesies " + buahYgDipilih;
    
    // RETURN: artinya Mesin memberikan hasil nyata ini ke tangan pemesan
    // Fungsi pun akan selesai jika sudah bertemu kata return.
    return minumanJadi;
}


// WAKTUNYA MENGGUNAKAN MESIN!
// Kita masukkan bahan mentah: ("Alpukat", 5) dan mesin langsung memprosesnya.
// Karena mesin "Me-return (memberikan)" teh, kita wadahi jus jadi tersebut ke variabel kardus `jusSiJoko`.
let jusSiJoko = blenderJus("Alpukat", 5);

// Mari buktikan hasil Return-nya
console.log("Ini dia pesanan Joko:", jusSiJoko);

// Pesanan Sari, tidak harus Alpukat! Modifikasi mudah lewat parameter!
let jusSiSari = blenderJus("Mangga", 2);
console.log("Ini dia pesanan Sari:", jusSiSari);
```

Dengan `return`, Anda membuat rantai pengambil keputusan tanpa henti. Satu minuman jus ini, dapat kita lempar lagi menjadi resep masakan parameter lain untuk "Pabrik Pembuat Sup"!

Itulah 10 Dasar fundamental pemrograman. Jika Anda sudah bisa menguasai 10 konsep dari modul ini, percayalah, Anda hanya perlu belajar sintaks dan hal rumit lainnya karena konsep logika mesin komputer selamanya tidak pernah berubah sedikit pun! Terus semangat belajar!
