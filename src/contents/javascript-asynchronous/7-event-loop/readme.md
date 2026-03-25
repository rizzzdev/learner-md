# Event Loop: Mesin Penjadwal JavaScript

Ini adalah salah satu konsep paling penting — dan paling sering disalahpahami — di JavaScript. Memahami Event Loop akan membuat Anda benar-benar mengerti *mengapa* kode async berperilaku seperti yang ia lakukan.

## Fakta Mengejutkan: JavaScript Hanya Punya Satu Thread

JavaScript adalah bahasa **single-threaded** — ia hanya bisa melakukan satu hal dalam satu waktu. Tapi bagaimana ia bisa menangani banyak operasi async tanpa macet? Jawabannya: **Event Loop**.

## Analogi: Satpam Hotel dengan Walkie-Talkie

Bayangkan seorang satpam hotel sendirian (single-thread) yang harus mengurus banyak tamu:
- Saat tamu minta antar koper ke kamar, satpam tidak angkat sendiri — ia **delegasikan ke bellboy** (Web API) dan **catat di memo** bahwa bellboy akan lapor balik jika selesai.
- Satpam terus melayani tamu lain selagi menunggu.
- Ketika bellboy selesai, ia kirim laporan ke **kotak masuk** (Callback Queue).
- Satpam mengecek kotak masuk saat sedang kosong, lalu menangani laporan itu.

Satpam ini adalah **Call Stack**, catatan delegasinya adalah **Web API**, kotak masuknya adalah **Callback/Task Queue**, dan rutinitas mengecek kotak masuk itulah **Event Loop**.

## Komponen-Komponen Event Loop

```
┌─────────────────────────────────────────────────────┐
│                  JavaScript Engine                   │
│  ┌─────────────┐    ┌──────────────────────────────┐ │
│  │ Call Stack  │    │          Web APIs             │ │
│  │             │    │  (setTimeout, fetch, DOM      │ │
│  │ [sayHello]  │───>│   events, dll.) ← BUKAN      │ │
│  │ [main]      │    │   bagian dari JS Engine!      │ │
│  └─────────────┘    └───────────────┬───────────────┘ │
│         ↑                           │                  │
│         │ Event Loop mengambil      │ callback masuk   │
│         │ jika Call Stack KOSONG    ↓                  │
│  ┌──────┴──────────────────────────────────────────┐  │
│  │  Callback Queue (Task Queue)                    │  │
│  │  [onTimeout, onFetchComplete, onClick, ...]     │  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Demo: Urutan Eksekusi

```javascript
console.log("1 - Mulai");            // Langsung ke Call Stack

setTimeout(() => {
    console.log("2 - setTimeout 0ms"); // Masuk ke Web API, lalu Callback Queue
}, 0);

Promise.resolve().then(() => {
    console.log("3 - Promise.then");   // Masuk ke Microtask Queue (PRIORITAS TINGGI!)
});

console.log("4 - Selesai");           // Langsung ke Call Stack

// Output:
// 1 - Mulai
// 4 - Selesai
// 3 - Promise.then    ← Microtask dijalankan SEBELUM setTimeout!
// 2 - setTimeout 0ms  ← Baru setelah semua microtask selesai
```

## Microtask Queue vs Callback Queue

Ada dua antrian, dan **Microtask Queue** selalu dikosongkan terlebih dahulu:

| Antrian | Isinya | Prioritas |
|---|---|---|
| **Microtask Queue** | Promise `.then()`, `queueMicrotask()`, `MutationObserver` | **Tinggi** — dikosongkan sebelum render |
| **Callback/Task Queue** | `setTimeout`, `setInterval`, Event DOM, Fetch callback | **Rendah** — diambil satu per satu |

```javascript
console.log("Mulai");

setTimeout(() => console.log("Timeout 1"), 0);
setTimeout(() => console.log("Timeout 2"), 0);

Promise.resolve()
    .then(() => {
        console.log("Microtask 1");
        return Promise.resolve(); // Tambah lagi microtask baru
    })
    .then(() => console.log("Microtask 2"))
    .then(() => console.log("Microtask 3"));

console.log("Selesai");

// Output:
// Mulai
// Selesai
// Microtask 1   ← Seluruh microtask queue diuras dulu
// Microtask 2
// Microtask 3
// Timeout 1     ← Baru setelah microtask habis
// Timeout 2
```

## Kenapa Ini Penting dalam Praktik?

```javascript
// Contoh bug klasik karena tidak paham Event Loop
async function contohBug() {
    let data = null;

    fetch('/api/users')
        .then(r => r.json())
        .then(users => {
            data = users; // Ini diset NANTI (di microtask queue)
        });

    // ❌ Bug: console.log ini jalan SEKARANG, sebelum fetch selesai!
    console.log("Data:", data); // null — belum terisi!
}

// ✅ Solusi: gunakan await
async function solusi() {
    const data = await fetch('/api/users').then(r => r.json());
    console.log("Data:", data); // Sekarang pasti sudah terisi!
}
```
