# Error Handling: Jaring Pengaman Aplikasi Anda

Tidak ada kode yang sempurna. Server bisa down, pengguna bisa memasukkan data aneh, file bisa tidak ditemukan. Error handling adalah seni menangkap kegagalan tersebut dengan anggun — tanpa membuat seluruh aplikasi crash dan mempermalukan diri sendiri.

## Analogi: Pilot dan Prosedur Darurat

Seorang pilot profesional tidak mengharapkan darurat, tapi **selalu bersiap** menghadapinya. Ada checklist, prosedur, dan protokol untuk setiap skenario buruk. Aplikasi yang baik pun harus punya "prosedur darurat" tersendiri — inilah `try...catch`.

## Sintaks Dasar Try-Catch

```javascript
try {
    // "Blok percobaan" — kode yang mungkin menyebabkan error
    const hasil = 10 / 0;           // Ini tidak error (menghasilkan Infinity)
    
    const data = JSON.parse("ini bukan JSON valid {{{"); // INI error!
    console.log(data); // Baris ini tidak akan dieksekusi di situasi error
    
} catch (error) {
    // Blok ini dieksekusi HANYA jika ada error di blok try
    console.log("Terjadi kesalahan!");
    console.log("Pesan error:", error.message);
    console.log("Jenis error:", error.name);
    
} finally {
    // Blok ini SELALU dieksekusi, baik ada error maupun tidak
    // Biasanya digunakan untuk "membersihkan" (tutup koneksi, sembunyikan loading, dll)
    console.log("Blok try-catch selesai diproses.");
}
```

## Jenis-Jenis Error Bawaan JavaScript

```javascript
// 1. SyntaxError — Biasanya terdeteksi saat parsing kode
try {
    JSON.parse("{tidak valid}");
} catch (e) {
    console.log(e instanceof SyntaxError); // true
    console.log(e.message); // "Unexpected token t in JSON at position 1"
}

// 2. TypeError — Mengakses property dari nilai null/undefined
try {
    let x = null;
    x.toString();
} catch (e) {
    console.log(e instanceof TypeError); // true
}

// 3. RangeError — Nilai di luar batas yang diizinkan
try {
    new Array(-5); // Array tidak bisa berukuran negatif
} catch (e) {
    console.log(e instanceof RangeError); // true
}

// 4. ReferenceError — Memanggil variabel yang tidak ada
try {
    console.log(variabelTidakAda);
} catch (e) {
    console.log(e instanceof ReferenceError); // true
}
```

## Membuat Custom Error

Untuk aplikasi yang lebih besar, seringkali kita perlu error yang lebih spesifik dan informatif.

```javascript
// Buat class custom Error dengan inherit dari Error bawaan
class ErrorValidasi extends Error {
    constructor(pesan, namaField) {
        super(pesan);
        this.name = "ErrorValidasi";
        this.namaField = namaField;
    }
}

class ErrorTidakLogin extends Error {
    constructor() {
        super("Anda harus login untuk mengakses halaman ini.");
        this.name = "ErrorTidakLogin";
        this.kodeStatus = 401;
    }
}

function validasiUmur(umur) {
    if (typeof umur !== 'number') {
        throw new ErrorValidasi("Umur harus berupa angka!", "umur");
    }
    if (umur < 0 || umur > 150) {
        throw new ErrorValidasi("Umur tidak valid (0-150)", "umur");
    }
    return true;
}

// Tangkap error dengan instanceof untuk membedakan jenisnya
try {
    validasiUmur("dua puluh"); // Akan melempar ErrorValidasi
} catch (error) {
    if (error instanceof ErrorValidasi) {
        console.log(`❌ Field '${error.namaField}': ${error.message}`);
    } else if (error instanceof ErrorTidakLogin) {
        console.log(`🔒 ${error.message}`);
        window.location.href = "/login"; // Redirect ke halaman login
    } else {
        console.error("Error tidak dikenali:", error);
    }
}
```

## Error Handling di Async/Await

```javascript
async function ambilDataPengguna(idPengguna) {
    try {
        const respons = await fetch(`https://api.example.com/users/${idPengguna}`);
        
        if (!respons.ok) {
            // HTTP error (404, 500, dll) tidak otomatis throw — harus manual
            throw new Error(`HTTP Error! Status: ${respons.status}`);
        }
        
        const data = await respons.json();
        return data;
        
    } catch (error) {
        if (error.name === 'TypeError') {
            // Biasanya network error / tidak ada koneksi internet
            console.error("❌ Tidak dapat terhubung ke server. Cek koneksi internet Anda.");
        } else {
            console.error("❌ Gagal mengambil data:", error.message);
        }
        return null; // Kembalikan null agar pemanggil tahu ada kegagalan
        
    } finally {
        // Sembunyikan loading spinner meskipun terjadi error
        document.getElementById('loading').classList.add('hidden');
    }
}
```

## Best Practice Error Handling

```javascript
// ✅ BAIK: Spesifik dan informatif
try {
    prosesPembayaran(data);
} catch (error) {
    if (error instanceof ErrorKartuAbis) {
        tampilkanPesan("Saldo kartu tidak mencukupi");
    } else if (error instanceof ErrorKoneksi) {
        tampilkanPesan("Gagal terhubung ke bank. Coba beberapa saat lagi.");
    } else {
        // Catat error yang tidak dikenal untuk di-debug nanti
        logErrorKeServer(error);
        tampilkanPesan("Terjadi kesalahan. Tim kami sedang memperbaikinya.");
    }
}

// ❌ BURUK: Menelan error tanpa penanganan
try {
    prosesPembayaran(data);
} catch (e) {
    // Kosong! Error menghilang tanpa jejak — sangat berbahaya!
}
```
