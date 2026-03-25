# Modul: Memecah Kode Menjadi File Terpisah

Seiring aplikasi bertumbuh besar, meletakkan semua kode di satu file adalah bencana. Modul (Modules) adalah sistem yang memungkinkan kita memecah kode ke dalam **file-file terpisah** yang saling berbagi fungsionalitas.

## Analogi: Sistem Perpustakaan

Bayangkan sebuah perpustakaan besar. Tidak semua buku ditumpuk di satu ruangan. Ada ruang Matematika, ruang Sastra, ruang Sejarah. Saat Anda butuh buku Matematika, Anda pergi ke ruang itu dan **meminjam (import)** buku yang spesifik Anda butuhkan. Setiap ruangan **menyediakan (export)** koleksinya untuk dipinjam.

## Export: Menyediakan Fungsionalitas

### Named Export (bisa banyak)

```javascript
// File: matematika.js

// Export beberapa fungsi/variabel sekaligus
export const PI = 3.14159;

export function luas_lingkaran(r) {
    return PI * r * r;
}

export function keliling_lingkaran(r) {
    return 2 * PI * r;
}

export class Kalkulator {
    tambah(a, b) { return a + b; }
    kurang(a, b) { return a - b; }
}
```

### Default Export (hanya satu per file)

```javascript
// File: sapaan.js

// Default export: nilai utama yang diekspor dari file ini
export default function sapa(nama) {
    return `Halo, ${nama}! Selamat datang.`;
}
```

## Import: Menggunakan Fungsionalitas dari File Lain

```javascript
// File: main.js

// 1. Import Named Export: gunakan kurung kurawal {}
import { PI, luas_lingkaran, Kalkulator } from './matematika.js';

console.log(PI);                        // 3.14159
console.log(luas_lingkaran(7));         // 153.938...
const calc = new Kalkulator();
console.log(calc.tambah(10, 5));        // 15

// 2. Import Default Export: bebas beri nama apa saja, tanpa {}
import sapa from './sapaan.js';
console.log(sapa("Budi"));             // Halo, Budi! Selamat datang.

// 3. Import semua sekaligus dengan alias (namespace)
import * as Mat from './matematika.js';
console.log(Mat.PI);                    // 3.14159
console.log(Mat.keliling_lingkaran(5)); // 31.4159
```

## Contoh Struktur Proyek Nyata

```
src/
├── utils/
│   ├── format.js      ← fungsi pemformatan (mata uang, tanggal)
│   ├── validasi.js    ← fungsi validasi input
│   └── konstanta.js   ← nilai-nilai konstan
├── services/
│   ├── api.js         ← semua pemanggilan API
│   └── auth.js        ← logika otentikasi
└── main.js            ← file utama yang mengimpor semuanya
```

```javascript
// File: utils/format.js
export function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(angka);
}

export function formatTanggal(tanggal) {
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    }).format(new Date(tanggal));
}

// File: main.js
import { formatRupiah, formatTanggal } from './utils/format.js';

console.log(formatRupiah(150000));    // Rp 150.000
console.log(formatTanggal("2025-01-15")); // 15 Januari 2025
```

## Dynamic Import (Import Saat Dibutuhkan)

```javascript
// Terkadang kita hanya ingin memuat modul jika benar-benar diperlukan
// untuk menghemat memori dan mempercepat loading awal aplikasi.

async function muatKalkulator() {
    if (penggunaNeedsCalculator) {
        // Modul hanya dimuat saat tombol diklik, bukan dari awal
        const { Kalkulator } = await import('./matematika.js');
        const calc = new Kalkulator();
        console.log(calc.tambah(20, 30));
    }
}
```

> **Catatan**: Untuk menggunakan modul ES6 (`import`/`export`) di browser langsung, tambahkan atribut `type="module"` pada tag `<script>`. Di Node.js, pastikan file berekstensi `.mjs` atau `"type": "module"` ada di `package.json`.
