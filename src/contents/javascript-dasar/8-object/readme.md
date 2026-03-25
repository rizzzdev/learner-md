# 8. Object: Menciptakan Benda Nyata Virtual

Kadang data Array yang berisi kumpulan angka tunggal atau kata-kata saja tidak cukup untuk menggambarkan betapa kompleksnya keadaan di dunia nyata. Untuk meniru wujud di dunia nyata, Javascript memiliki kotak yang jauh lebih megah dari Variabel bernama **Object**.

## Analogi: Ciri Khas Fisik Mobil
Perhatikan sebuah "Mobil". Mobil punya warna (Merah), tahun rilis (2018), kecepatan, punya plat nama, dsb. Semuanya merujuk pada **satu benda yang sama**. Daripada kita membuat banyak variabel pisah (`let platNomor`, `let warna`), lebih baik kita buat *kerangka tubuh* mobilnya secara ekslusif.

Object menggunakan kunci & nilai (disebut **Kunci : Nilai / Key-Value**).

## Implementasi Kode
```javascript
// Object dibuka menggunakan kurung kurawal { } 
let mobilSaya = {
    merk: "Toyota",
    mesinNyala: false,
    tahunRilis: 2022,
    warna: ["Merah", "Biru"], // Kita juga bisa memasukkan Array laci di dalamnya loh!
    platNomor: "B 1234 CD"
};

// Mengakses data milik si mobil menggunakan "Titik"
console.log("Mobil saya buatan merk:", mobilSaya.merk);
console.log("Warna utamanya adalah:", mobilSaya.warna[0]);

// Mengubah isi mobil perlahan-lahan
mobilSaya.mesinNyala = true;
console.log("Apakah mesin menyala? ", mobilSaya.mesinNyala);
```

### Kehebatan Object
Dengan menggunakan gabungan Array `[ ]` dan Object `{ }`, Anda sungguh-sungguh menduplikasi betapa rumitnya hal di kehidupan sehari-hari ke dalam layar laptop Anda! Semua profil Facebook, Postingan Instagram, Chat WhatsApp di HP Anda nyatanya diproses dan dikirimkan utamanya dalam bentuk *Object*-*Object* di balik layarnya!
