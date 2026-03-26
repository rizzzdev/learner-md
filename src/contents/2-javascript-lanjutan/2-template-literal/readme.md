# Template Literal: Menyisipkan Variabel ke Dalam Teks

Sebelum ES6, menggabungkan teks dengan variabel terasa awkward dan rawan salah. Template Literal hadir sebagai solusi yang jauh lebih bersih dan ekspresif.

## Analogi: Formulir dengan Titik-titik Isian

Bayangkan blanko formulir lamaran kerja: *"Saya, _____ (nama), berusia _____ tahun, melamar posisi _____."*

Titik-titik kosong itu adalah "slot" yang menunggu diisi. Template Literal bekerja persis seperti itu — Anda menyiapkan template teks, lalu "slot" diisi nilai variabel secara otomatis.

## Cara Lama vs Template Literal

```javascript
const nama = "Andi";
const umur = 28;
const kota = "Jakarta";

// ❌ CARA LAMA: penggabungan string dengan + (rawan typo, susah dibaca)
const pesanLama = "Halo, nama saya " + nama + ". Saya berumur " + umur + " tahun dari " + kota + ".";
console.log(pesanLama);

// ✅ CARA BARU: Template Literal dengan backtick (`) dan ${ekspresi}
const pesanBaru = `Halo, nama saya ${nama}. Saya berumur ${umur} tahun dari ${kota}.`;
console.log(pesanBaru);
// Output: Halo, nama saya Andi. Saya berumur 28 tahun dari Jakarta.
```

## Ekspresi di Dalam `${}` Bukan Hanya Variabel

Di dalam `${}` Anda bisa memasukkan **perhitungan, kondisi, atau pemanggilan fungsi** apa pun, bukan hanya variabel sederhana.

```javascript
const harga = 50000;
const jumlah = 3;
const diskon = 10; // persen

// Menghitung langsung di dalam template
const struk = `
=== STRUK BELANJA ===
Harga satuan  : Rp ${harga.toLocaleString('id-ID')}
Jumlah item   : ${jumlah}
Subtotal      : Rp ${(harga * jumlah).toLocaleString('id-ID')}
Diskon ${diskon}%    : Rp ${(harga * jumlah * diskon / 100).toLocaleString('id-ID')}
Total Bayar   : Rp ${(harga * jumlah * (1 - diskon/100)).toLocaleString('id-ID')}
=====================
`;
console.log(struk);
```

## Multi-baris Tanpa `\n`

Salah satu keunggulan terbesar Template Literal: Anda bisa menulis teks multi-baris secara literal, tanpa karakter escape `\n`.

```javascript
// ❌ Cara lama: harus pakai \n
const htmlLama = "<div>\n  <h1>Judul</h1>\n  <p>Isi paragraf.</p>\n</div>";

// ✅ Template Literal: tulis saja apa adanya!
const htmlBaru = `
<div>
  <h1>Judul</h1>
  <p>Isi paragraf.</p>
</div>
`;

console.log(htmlBaru);
```

## Tagged Template Literal (Tingkat Lanjut)

Ini fitur super power dari Template Literal. Anda bisa memanggil sebuah *fungsi* sebagai "tag" di depannya untuk memproses hasilnya.

```javascript
// Fungsi tag yang mengubah semua variabel menjadi HURUF BESAR
function sorot(teks, ...nilai) {
    return teks.reduce((hasil, bagian, i) => {
        return hasil + bagian + (nilai[i] ? `<strong>${nilai[i].toString().toUpperCase()}</strong>` : '');
    }, '');
}

const produk = "baju";
const hargaTag = 120000;

// Panggil fungsi 'sorot' sebagai tag — tanpa tanda kurung!
const hasilnya = sorot`Anda membeli ${produk} seharga Rp ${hargaTag}.`;
console.log(hasilnya);
// Output: Anda membeli <strong>BAJU</strong> seharga Rp <strong>120000</strong>.
```

Tagged Template sangat sering digunakan di library populer seperti `styled-components` di React dan `graphql` untuk query.
