# Fetch API: Berkomunikasi dengan Server

`fetch()` adalah API bawaan browser untuk membuat HTTP request — mengambil data dari server, mengirim data, mengupdate, atau menghapus. Ia berbasis Promise sehingga bekerja sempurna bersama `async/await`.

## Analogi: Pesan via Kurir

Fetch itu seperti sistem kurir. Anda:
1. **Menulis permintaan** (URL + metode HTTP)
2. **Menitipkan ke kurir** (`fetch()`)
3. **Menunggu balasan** (`await`)
4. **Membuka paket** (`.json()`)

## GET Request: Mengambil Data

```javascript
async function ambilDaftarPengguna() {
    try {
        // Kirim request GET ke URL ini
        const respons = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Cek apakah server merespons dengan sukses (kode 200-299)
        if (!respons.ok) {
            throw new Error(`Server error! Status: ${respons.status}`);
        }
        
        // Parsing body response dari JSON string ke JavaScript object
        const pengguna = await respons.json();
        
        console.log(`Berhasil mengambil ${pengguna.length} pengguna`);
        console.log("Pengguna pertama:", pengguna[0].name);
        return pengguna;
        
    } catch (error) {
        // Ini menangkap: network error, CORS error, parsing error, dll
        console.error("❌ Gagal mengambil data:", error.message);
    }
}

ambilDaftarPengguna();
```

## Respons Headers dan Status

```javascript
async function cekRespons() {
    const respons = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    console.log("Status Code:", respons.status);       // 200
    console.log("Status Text:", respons.statusText);   // "OK"
    console.log("Sukses?:", respons.ok);               // true
    console.log("Content-Type:", respons.headers.get('content-type'));
    
    const data = await respons.json();
    console.log("Judul:", data.title);
}
```

## POST Request: Mengirim Data Baru

```javascript
async function buatPengguna(dataPengguna) {
    const respons = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',                         // Metode HTTP
        headers: {
            'Content-Type': 'application/json', // Kasih tahu server format yang dikirim
            'Authorization': 'Bearer token123'  // Token autentikasi jika diperlukan
        },
        body: JSON.stringify(dataPengguna)      // Konversikan object ke JSON string
    });
    
    const pengguna = await respons.json();
    console.log("✅ Pengguna dibuat dengan ID:", pengguna.id);
    return pengguna;
}

buatPengguna({
    nama: "Budi Santoso",
    email: "budi@example.com",
    umur: 28
});
```

## PUT/PATCH Request: Update Data

```javascript
// PUT: update seluruh resource
async function updatePengguna(id, data) {
    const respons = await fetch(`https://api.example.com/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await respons.json();
}

// PATCH: update sebagian field saja
async function updateEmail(id, emailBaru) {
    const respons = await fetch(`https://api.example.com/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailBaru })
    });
    return await respons.json();
}
```

## DELETE Request: Menghapus Data

```javascript
async function hapusPengguna(id) {
    const respons = await fetch(`https://api.example.com/users/${id}`, {
        method: 'DELETE'
    });
    
    if (respons.ok) {
        console.log(`✅ Pengguna ID ${id} berhasil dihapus`);
    } else {
        throw new Error(`Gagal menghapus: ${respons.status}`);
    }
}
```

## Jenis-Jenis Response

```javascript
const respons = await fetch('/api/data');

const jsonData = await respons.json();     // Parsing sebagai JSON object
const teksData = await respons.text();     // Membaca sebagai string biasa
const blobData = await respons.blob();     // Untuk file/gambar (binary)
const formData = await respons.formData(); // Untuk form data
```

## Timeout dan Abort

```javascript
// Fetch tidak punya timeout bawaan — harus pakai AbortController
async function fetchDenganTimeout(url, batasWaktuMs = 5000) {
    const controller = new AbortController();
    
    // Set timer — batalkan request jika lebih dari batasWaktu
    const timerId = setTimeout(() => controller.abort(), batasWaktuMs);
    
    try {
        const respons = await fetch(url, { signal: controller.signal });
        clearTimeout(timerId); // Batalkan timer jika berhasil
        return await respons.json();
        
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error(`Request timeout setelah ${batasWaktuMs}ms`);
        }
        throw error;
    }
}
```
