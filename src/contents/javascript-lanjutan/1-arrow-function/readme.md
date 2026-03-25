# Arrow Function: Menulis Fungsi Lebih Ringkas

Sebelumnya kita sudah mengenal fungsi biasa (`function`). Di JavaScript modern (ES6+), ada cara baru menulis fungsi yang jauh lebih singkat dan elegan: **Arrow Function**.

## Analogi: Pesan Teks vs Surat Resmi

Bayangkan Anda ingin memberi kabar ke teman: "Saya sudah tiba". Anda punya dua pilihan:
1. **Surat resmi** (seperti `function` biasa): tulis di kertas, lipat, masukkan amplop, tempel perangko, kirim lewat pos. Efektif, tapi panjang.
2. **Pesan teks/WhatsApp** (seperti `arrow function`): cukup ketik singkat dan kirim. Pesan yang sama, cara yang jauh lebih cepat.

Arrow function adalah "pesan teks"-nya JavaScript.

## Perbandingan: Fungsi Biasa vs Arrow Function

```javascript
// CARA LAMA: Function Declaration biasa
function sapa(nama) {
    return "Halo, " + nama + "!";
}

// CARA BARU: Arrow Function — jauh lebih ringkas!
const sapaArrow = (nama) => {
    return "Halo, " + nama + "!";
};

// Bahkan jika hanya satu baris, bisa dipersingkat lagi tanpa return dan tanpa {}
const sapaSuper = (nama) => "Halo, " + nama + "!";

console.log(sapa("Budi"));        // Halo, Budi!
console.log(sapaArrow("Andi"));   // Halo, Andi!
console.log(sapaSuper("Tini"));   // Halo, Tini!
```

## Aturan Singkatan Arrow Function

```javascript
// 1. Jika parameter hanya SATU, kurung boleh dihilangkan
const kuadrat = angka => angka * angka;
console.log(kuadrat(5)); // 25

// 2. Jika parameter NOL atau LEBIH DARI SATU, kurung WAJIB ada
const tambah = (a, b) => a + b;
const ucapanSelamat = () => "Selamat Datang!";

console.log(tambah(3, 4));       // 7
console.log(ucapanSelamat());    // Selamat Datang!

// 3. Jika isi lebih dari satu baris, kurung kurawal dan return tetap diperlukan
const hitung = (a, b) => {
    const hasil = a * b;
    const pajaknya = hasil * 0.1;
    return hasil + pajaknya;
};
console.log(hitung(100, 5)); // 550
```

## Arrow Function dan `this`

Ini bagian yang sedikit lebih dalam namun sangat penting. Arrow function **tidak punya `this` sendiri** — ia meminjam `this` dari konteks di luarnya. Ini berbeda dengan `function` biasa.

```javascript
// Contoh masalah dengan function biasa di dalam Object
const jam = {
    detik: 0,
    mulai: function() {
        // Di sini, 'this' merujuk ke objek 'jam' ✓
        setInterval(function() {
            // Di sini, 'this' BUKAN lagi 'jam', melainkan window/global! ✗
            // this.detik++; // Ini tidak akan bekerja!
        }, 1000);
    }
};

// Solusinya: pakai Arrow Function!
const jamBaru = {
    detik: 0,
    mulai: function() {
        setInterval(() => {
            // Arrow function meminjam 'this' dari 'mulai', yaitu 'jamBaru' ✓
            this.detik++;
            console.log("Detik ke-" + this.detik);
        }, 1000);
    }
};
```

## Kapan Pakai Arrow Function?

| Situasi | Rekomendasi |
|---|---|
| Callback sederhana (`.map`, `.filter`) | ✅ Arrow function |
| Method di dalam Object | ⚠️ Gunakan `function` biasa |
| Constructor (dengan `new`) | ❌ Arrow function tidak bisa |
| Event handler yang butuh `this` | ⚠️ Tergantung kebutuhan |

Arrow function adalah salah satu fitur favorit developer modern karena membuat kode lebih bersih dan mudah dibaca.
