# Callback: "Nanti Kabari Saya ya!"

Callback adalah teknik asinkronus paling tua dan paling sederhana di JavaScript. Intinya: Anda menyerahkan sebuah fungsi sebagai "penjawab" yang akan dipanggil nanti ketika suatu operasi selesai.

## Analogi: Servis Motor ke Bengkel

Anda membawa motor ke bengkel. Mekanik berkata "Nanti 2 jam lagi selesai — tinggalkan nomor HP, nanti kami telepon kalau sudah beres." Anda tidak duduk diam di bengkel menunggu (sinkronus). Anda pergi belanja dulu. Ketika motor selesai, mekanik **"callback"** (menghubungi kembali) ke Anda.

Fungsi yang Anda "titipkan" ke operasi agar dipanggil nanti itulah yang disebut **callback function**.

## Callback Sederhana

```javascript
// Fungsi biasa sebagai callback
function selesai(hasilPekerjaan) {
    console.log("Motor sudah selesai:", hasilPekerjaan);
}

function servisMotor(nomorPolisi, callback) {
    console.log(`Motor ${nomorPolisi} sedang diservis...`);
    
    // Simulasi menunggu 2 detik (seperti proses servis)
    setTimeout(() => {
        const hasil = "Mesin sudah bersih, ban sudah diganti";
        callback(hasil); // << Memanggil callback saat selesai
    }, 2000);
}

// "Titipkan" fungsi 'selesai' sebagai callback
servisMotor("B 1234 AB", selesai);

// Atau gunakan arrow function langsung
servisMotor("D 5678 CD", (hasil) => {
    console.log("Notifikasi masuk:", hasil);
});

console.log("Sambil menunggu, saya belanja dulu...");
// Output:
// Motor B 1234 AB sedang diservis...
// Motor D 5678 CD sedang diservis...
// Sambil menunggu, saya belanja dulu...
// (2 detik kemudian...)
// Motor sudah selesai: Mesin sudah bersih...
```

## Callback dengan Error (Error-First Pattern)

Di Node.js, ada konvensi populer: argumen **pertama** callback adalah error (`null` jika sukses), argumen **kedua** adalah hasil.

```javascript
function ambilData(id, callback) {
    setTimeout(() => {
        if (id <= 0) {
            // Gagal: kirim error sebagai argumen pertama
            callback(new Error("ID tidak valid!"), null);
        } else {
            // Sukses: argumen pertama null, argumen kedua adalah data
            const data = { id, nama: "Produk " + id, harga: id * 10000 };
            callback(null, data);
        }
    }, 1000);
}

// Selalu cek error di argumen pertama!
ambilData(5, (error, data) => {
    if (error) {
        console.error("❌ Gagal:", error.message);
        return;
    }
    console.log("✅ Data diterima:", data);
});

ambilData(-1, (error, data) => {
    if (error) {
        console.error("❌ Gagal:", error.message); // ❌ Gagal: ID tidak valid!
        return;
    }
    console.log("✅ Data diterima:", data);
});
```

## Masalah: Callback Hell (Pyramid of Doom)

Ketika operasi asinkronus bergantung satu sama lain, callback menjadi bertumpuk-tumpuk seperti piramida. Ini yang disebut **callback hell**.

```javascript
// Bayangkan: Login → Ambil Profil → Ambil Riwayat Pesanan → Tampilkan
login(username, password, (errLogin, token) => {
    if (errLogin) { console.error(errLogin); return; }
    
    ambilProfil(token, (errProfil, profil) => {
        if (errProfil) { console.error(errProfil); return; }
        
        ambilPesanan(profil.id, (errPesanan, pesanan) => {
            if (errPesanan) { console.error(errPesanan); return; }
            
            tampilkanDashboard(profil, pesanan, (errTampil, hasil) => {
                if (errTampil) { console.error(errTampil); return; }
                console.log("Dashboard siap:", hasil);
                // Semakin ke kanan, semakin dalam, semakin sulit dibaca!
            });
        });
    });
});
```

Kode ini sangat sulit dibaca dan di-debug. Inilah alasan utama mengapa **Promise** diciptakan sebagai solusi yang lebih elegan.
