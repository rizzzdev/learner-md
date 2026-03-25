# Promise: Kontrak Asinkronus

Promise adalah objek yang merepresentasikan **nilai yang belum tersedia**, tapi *dijanjikan* akan ada di masa depan — baik dalam keadaan berhasil maupun gagal. Promise menyelesaikan masalah callback hell dengan cara berantai (*chaining*) yang lebih bersih.

## Analogi: Pesan Makanan Online

Saat Anda memesan makanan via GoFood, Anda mendapatkan **struk pesanan (Promise)**. Struk itu belum berisi makanan, tapi ia menjamin bahwa nanti salah satu dari dua hal akan terjadi:
- ✅ **Makanan datang** (Promise **fulfilled/resolved**)
- ❌ **Pesanan dibatalkan** (Promise **rejected**)

Selama menunggu, struk itu dalam kondisi **pending**.

## Tiga Status Promise

| Status | Arti |
|---|---|
| `pending` | Masih dalam proses, belum selesai |
| `fulfilled` | Selesai dengan sukses |
| `rejected` | Selesai dengan kegagalan |

## Membuat Promise

```javascript
// Membuat Promise dari nol
const janjikanData = new Promise((resolve, reject) => {
    // Simulasi operasi async (ambil data dari server)
    setTimeout(() => {
        const berhasil = Math.random() > 0.3; // 70% peluang berhasil
        
        if (berhasil) {
            resolve({ id: 1, nama: "Laptop Gaming", harga: 15000000 }); // Kirim data
        } else {
            reject(new Error("Server sedang sibuk, coba lagi nanti!")); // Kirim error
        }
    }, 2000);
});

// Menggunakan Promise dengan .then() dan .catch()
janjikanData
    .then(data => {
        // Dipanggil jika resolve() dipicu
        console.log("✅ Data berhasil:", data.nama, "-", data.harga);
    })
    .catch(error => {
        // Dipanggil jika reject() dipicu
        console.error("❌ Gagal:", error.message);
    })
    .finally(() => {
        // SELALU dipanggil, sukses atau gagal
        console.log("Proses selesai, sembunyikan loading spinner.");
    });
```

## Promise Chaining: Mengganti Callback Hell

```javascript
function login(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === "admin") resolve({ token: "abc123" });
            else reject(new Error("Username tidak ditemukan"));
        }, 500);
    });
}

function ambilProfil(token) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: 42, nama: "Budi", token }), 500);
    });
}

function ambilPesanan(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve([{ id: 1, produk: "Laptop" }]), 500);
    });
}

// ✅ JAUH lebih bersih dari callback hell!
login("admin", "password123")
    .then(({ token }) => ambilProfil(token))     // Setiap .then() kembalikan promise berikutnya
    .then(profil => ambilPesanan(profil.id))
    .then(pesanan => {
        console.log("Pesanan:", pesanan);
    })
    .catch(error => {
        // SATU catch untuk menangkap error dari SELURUH rantai!
        console.error("Terjadi kesalahan:", error.message);
    });
```

## Promise Statis Berguna

```javascript
// Promise.resolve() — langsung membuat promise yang sudah fulfilled
const sudahAda = Promise.resolve("Data dari cache");
sudahAda.then(data => console.log(data)); // Data dari cache

// Promise.reject() — langsung membuat promise yang sudah rejected
const gagalTotal = Promise.reject(new Error("Tidak ada koneksi"));
gagalTotal.catch(e => console.error(e.message));
```
