# 6. Perulangan While: Terus Lakukan Selama Masih Benar

Bayangkan Anda harus memompa ban sepeda yang kempes. Anda tidak tahu pasti berapa kali Anda harus menekan pompa, Anda hanya tahu bahwa Anda harus "terus memompa SELAMA (While) ban belum keras". Inilah konsep `while` loop di dalam pemrograman.

## Analogi: Memompa Ban Sepeda
Komputer malas diberi perintah berulang satu per satu. Daripada Anda menyuruh "pompa", lalu "pompa", lalu "pompa", Anda cukup membuat satu peraturan blok kondisi. Komputer akan terus mengulangi tindakan di dalamnya **sampai** kondisi syaratnya tidak lagi memenuhi kriteria.

## Implementasi Kode
```javascript
let tekananBan = 0;
let tekananIdeal = 30; // Batas ideal tekanan yang diinginkan

// Selama tekanan ban masih DI BAWAH tekanan ideal...
while (tekananBan < tekananIdeal) {
    console.log("Ban masih kurang angin, ayo pompa lagi!");
    
    // Setiap kali dipompa, tekanannya bertambah 5 tingkat
    tekananBan = tekananBan + 5;
    
    console.log("Tekanan sekarang:", tekananBan);
}

// Terus berulang sampai 30, lalu loop berhenti dan mengeksekusi ini
console.log("Wah ban sudah keras, siap digunakan!");
```

### Hati-hati dengan "Infinite Loop" (Perulangan Tanpa Henti)
Jika di dalam kode di atas kita lupa menambahkan `tekananBan = tekananBan + 5;`, komputer akan memompa terus dan membaca `tekananBan < tekananIdeal` seumur hidup karena nilai tekanan tidak pernah bertambah! Ini akan membuat aplikasi error (crash). Pastikan untuk selalu mengubah nilai pengecek agar perulangan bisa berakhir.
