# Spread dan Rest Operator: Tiga Titik Ajaib (`...`)

Keduanya menggunakan simbol yang sama persis: tiga titik (`...`). Namun fungsinya **berlawanan** tergantung konteks pemakaiannya.

- **Spread**: menyebarkan isi array/object ke luar
- **Rest**: mengumpulkan banyak nilai menjadi satu array

## Analogi: Kartu dan Dek

- **Spread** seperti **mengocok/menyebarkan kartu** dari satu dek ke atas meja — satu tumpukan jadi banyak kartu terpisah.
- **Rest** seperti **mengumpulkan kembali** semua kartu yang tersisa di atas meja menjadi satu tumpukan.

## Spread Operator

### 1. Menyalin dan Menggabungkan Array

```javascript
const buahTropik = ["Mangga", "Pepaya", "Pisang"];
const buahImpor  = ["Apel", "Anggur", "Kiwi"];

// Salin array tanpa referensi (independen)
const salinan = [...buahTropik];
salinan.push("Jeruk");
console.log(buahTropik); // ["Mangga", "Pepaya", "Pisang"] — tidak berubah!
console.log(salinan);    // ["Mangga", "Pepaya", "Pisang", "Jeruk"]

// Gabungkan dua array
const semuaBuah = [...buahTropik, ...buahImpor];
console.log(semuaBuah);
// ["Mangga", "Pepaya", "Pisang", "Apel", "Anggur", "Kiwi"]
```

### 2. Menyalin Object

```javascript
const pengaturanDefault = { tema: "gelap", bahasa: "id", fontSize: 14 };
const pengaturanUser = { bahasa: "en", fontSize: 16 };

// Gabungkan — jika ada key yang sama, yang belakangan menang
const pengaturanFinal = { ...pengaturanDefault, ...pengaturanUser };
console.log(pengaturanFinal);
// { tema: "gelap", bahasa: "en", fontSize: 16 }
```

### 3. Meneruskan Array sebagai Argumen Fungsi

```javascript
const angka = [5, 3, 8, 1, 9, 2];

// Math.max() butuh argumen terpisah, bukan array
console.log(Math.max(...angka)); // 9 ✅
// Math.max(angka) akan menghasilkan NaN ❌
```

## Rest Operator

Rest digunakan di **parameter fungsi** atau saat **destructuring** untuk menangkap "sisanya".

### 1. Rest di Parameter Fungsi

```javascript
// Membuat fungsi yang bisa menerima BERAPA SAJA argumen
function jumlahkanSemua(...angka) {
    // 'angka' di sini adalah Array berisi semua argumen yang masuk
    return angka.reduce((total, n) => total + n, 0);
}

console.log(jumlahkanSemua(1, 2));             // 3
console.log(jumlahkanSemua(10, 20, 30));       // 60
console.log(jumlahkanSemua(5, 5, 5, 5, 5));   // 25
```

### 2. Rest di Destructuring Array

```javascript
const [juara1, juara2, ...sisanya] = ["Andi", "Budi", "Cici", "Dodi", "Eka"];

console.log(juara1);   // Andi
console.log(juara2);   // Budi
console.log(sisanya);  // ["Cici", "Dodi", "Eka"] — semua sisa dikumpulkan!
```

### 3. Rest di Destructuring Object

```javascript
const { nama, umur, ...infoLainnya } = {
    nama: "Ratna",
    umur: 30,
    kota: "Yogyakarta",
    pekerjaan: "Guru",
    hobi: "Memasak"
};

console.log(nama);         // Ratna
console.log(umur);         // 30
console.log(infoLainnya);  // { kota: "Yogyakarta", pekerjaan: "Guru", hobi: "Memasak" }
```

## Rangkuman Mudah

| Konteks | Operator | Apa yang Dilakukan |
|---|---|---|
| Di luar (sebagai argumen / nilai) | Spread `...arr` | Menyebarkan isi keluar |
| Di dalam (sebagai parameter / variabel) | Rest `...sisa` | Mengumpulkan sisanya |
