# Async / Await: Kode Async yang Terasa Sinkronus

`async/await` adalah "gula sintaksis" (syntactic sugar) di atas Promise yang membuat kode asinkronus terasa seperti kode sinkronus biasa. Ia tidak menambah fitur baru, tapi cara penulisannya jauh lebih bersih dan mudah dibaca.

## Analogi: Resep Masakan Berurutan

Ketika mengikuti resep, Anda melakukannya satu per satu: *tunggu air mendidih*, *lalu masukkan pasta*, *tunggu 10 menit*, *lalu tiriskan*. Kata **"tunggu"** itu adalah `await` — Anda tidak melanjutkan langkah berikutnya sebelum langkah sini selesai, tapi dapur (komputer) tetap bisa melakukan hal lain (seperti mendengarkan timer).

## Sintaks Dasar

```javascript
// Fungsi HARUS ditandai 'async' untuk bisa menggunakan 'await' di dalamnya
async function ambilDataPengguna(id) {
    // 'await' akan MENUNGGU Promise selesai sebelum lanjut ke baris berikutnya
    // Tapi ia tidak memblokir seluruh program — hanya fungsi ini yang "berhenti"
    const respons = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await respons.json();
    return data;
}

// Memanggil fungsi async mengembalikan PROMISE
ambilDataPengguna(1)
    .then(pengguna => console.log("Pengguna:", pengguna.name));
```

## Error Handling dengan Try-Catch

Salah satu keunggulan async/await: kita bisa menggunakan `try...catch` biasa untuk menangani error, alih-alih `.catch()`.

```javascript
async function ambilProduk(id) {
    try {
        const respons = await fetch(`https://api.toko.com/produk/${id}`);
        
        if (!respons.ok) {
            // Lempar error manual jika HTTP gagal (404, 500, dll)
            throw new Error(`HTTP Error: ${respons.status}`);
        }
        
        const produk = await respons.json();
        console.log(`✅ Produk ditemukan: ${produk.nama}`);
        return produk;
        
    } catch (error) {
        console.error(`❌ Gagal mengambil produk ID ${id}:`, error.message);
        return null;
    } finally {
        console.log("Loading selesai.");
    }
}

ambilProduk(99);
```

## Perbandingan: Promise Chaining vs Async/Await

```javascript
// Skenario: Login → Ambil Profil → Ambil Pesanan

// ❌ Dengan Promise chaining (lebih panjang, indent berulang)
function prosesLoginPromise() {
    return login("admin", "pass")
        .then(token => ambilProfil(token))
        .then(profil => ambilPesanan(profil.id))
        .then(pesanan => {
            console.log("Pesanan:", pesanan);
        })
        .catch(err => console.error(err));
}

// ✅ Dengan Async/Await (seperti kode biasa, dari atas ke bawah)
async function prosesLoginAsync() {
    try {
        const token   = await login("admin", "pass");
        const profil  = await ambilProfil(token);
        const pesanan = await ambilPesanan(profil.id);
        console.log("Pesanan:", pesanan);
    } catch (err) {
        console.error("Gagal:", err.message);
    }
}
```

## Menjalankan Beberapa Async Secara Paralel

Jangan biarkan `await` dijalankan berurutan jika operasinya tidak bergantung satu sama lain!

```javascript
async function ambilSemuaData() {
    // ❌ LAMBAT: Berurutan — total waktu = waktu A + waktu B + waktu C
    const a = await ambilA(); // tunggu A selesai
    const b = await ambilB(); // baru mulai B
    const c = await ambilC(); // baru mulai C

    // ✅ CEPAT: Paralel dengan Promise.all — total waktu = max(waktuA, waktuB, waktuC)
    const [hasilA, hasilB, hasilC] = await Promise.all([ambilA(), ambilB(), ambilC()]);
}
```

## Async di Top Level (Modern)

```javascript
// Di module modern (.mjs) atau browser dengan type="module",
// Anda bisa langsung await di level paling atas tanpa async function!

const data = await fetch('/api/data').then(r => r.json());
console.log(data);
```
