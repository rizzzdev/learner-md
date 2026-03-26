# Promise.all dan Promise.race: Koordinasi Beberapa Operasi Async

Sering kali kita perlu menjalankan beberapa operasi asinkronus sekaligus dan mengelola hasilnya bersama. JavaScript menyediakan beberapa helper Promise statis untuk ini.

## Analogi: Tim Balap Relay vs Balapan Solo

- **`Promise.all`** = Tim relay: **semua** anggota harus selesai lari sebelum dianggap menang. Jika satu jatuh, tim kalah.
- **`Promise.race`** = Balapan solo: siapa yang **paling cepat** tiba di garis finish, dialah pemenangnya.
- **`Promise.allSettled`** = Ujian kelas: **semua siswa** menyelesaikan ujian (tidak peduli nilainya), baru hasilnya dikumpulkan.
- **`Promise.any`** = Casting: cari **satu** kandidat yang berhasil; kalau semua gagal, baru ditolak.

## `Promise.all`: Tunggu Semua Selesai

```javascript
async function muatDashboard(userId) {
    console.time('loading');
    
    // Jalankan ketiganya BERSAMAAN, bukan satu per satu!
    const [profil, pesanan, notifikasi] = await Promise.all([
        fetch(`/api/users/${userId}`).then(r => r.json()),
        fetch(`/api/orders?user=${userId}`).then(r => r.json()),
        fetch(`/api/notifications/${userId}`).then(r => r.json())
    ]);
    
    console.timeEnd('loading'); // Jauh lebih cepat dari jika berurutan!
    
    console.log("Profil:", profil.nama);
    console.log("Jumlah Pesanan:", pesanan.length);
    console.log("Notifikasi baru:", notifikasi.filter(n => !n.dibaca).length);
}

// ⚠️ Jika SALAH SATU promise gagal, Promise.all langsung reject!
async function contohGagal() {
    try {
        const hasil = await Promise.all([
            Promise.resolve("Sukses A"),
            Promise.reject(new Error("Gagal B")), // Satu gagal...
            Promise.resolve("Sukses C")
        ]);
    } catch (error) {
        console.error("Semua dibatalkan karena:", error.message); // ...seluruhnya gagal
    }
}
```

## `Promise.allSettled`: Tunggu Semua, Terima Apapun Hasilnya

```javascript
async function muatSemuaWidget() {
    const promises = [
        fetch('/api/berita').then(r => r.json()),
        fetch('/api/widget-cuaca').then(r => r.json()),   // Mungkin down
        fetch('/api/iklan').then(r => r.json()),           // Mungkin down
    ];
    
    const hasil = await Promise.allSettled(promises);
    
    // Setiap item punya 'status' dan 'value' atau 'reason'
    hasil.forEach((item, i) => {
        if (item.status === 'fulfilled') {
            console.log(`Widget ${i}: ✅`, item.value);
        } else {
            console.log(`Widget ${i}: ❌`, item.reason.message);
            // Tampilkan placeholder/fallback untuk widget yang gagal
        }
    });
}
```

## `Promise.race`: Ambil yang Paling Cepat

```javascript
// Use case: Gunakan CDN terdekat — ambil dari server mana yang lebih cepat
async function ambilDariServer() {
    const hasil = await Promise.race([
        fetch('https://cdn-jakarta.example.com/data.json').then(r => r.json()),
        fetch('https://cdn-singapore.example.com/data.json').then(r => r.json()),
        fetch('https://cdn-tokyo.example.com/data.json').then(r => r.json()),
    ]);
    
    // Siapapun yang paling cepat respons, itulah yang dipakai
    return hasil;
}

// Use case: Implementasi timeout dengan Promise.race
function withTimeout(promise, ms) {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout setelah ${ms}ms`)), ms)
    );
    return Promise.race([promise, timeout]);
}

// Jika fetchData tidak selesai dalam 3 detik → error
try {
    const data = await withTimeout(fetchData(), 3000);
} catch (e) {
    console.error(e.message);
}
```

## `Promise.any`: Cukup Satu yang Berhasil

```javascript
// Coba dari tiga server backup — pakai yang pertama berhasil
async function ambilDenganFallback(id) {
    try {
        const data = await Promise.any([
            fetch(`https://server1.com/api/${id}`).then(r => r.json()),
            fetch(`https://server2.com/api/${id}`).then(r => r.json()),
            fetch(`https://server3.com/api/${id}`).then(r => r.json()),
        ]);
        console.log("Berhasil dari salah satu server:", data);
        return data;
    } catch (aggregateError) {
        // AggregateError — semua server gagal
        console.error("Semua server tidak bisa dihubungi!");
    }
}
```

## Ringkasan Perbandingan

| Method | Berhasil jika... | Gagal jika... |
|---|---|---|
| `Promise.all` | **Semua** resolve | **Satu pun** reject |
| `Promise.allSettled` | **Selalu** selesai | Tidak pernah reject |
| `Promise.race` | **Satu tercepat** resolve atau reject | - |
| `Promise.any` | **Satu** resolve | **Semua** reject |
