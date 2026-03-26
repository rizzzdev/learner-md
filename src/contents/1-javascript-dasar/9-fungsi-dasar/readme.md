# 9. Function: Cetakan Resep Masakan Ajaib

Salah satu larangan terkeras bagi Programmer adalah mengetik "Hal yang sama berulang-ulang". Konsep `Function` adalah senjata ampuh kita agar baris kode bisa dibungkus lalu dipanggil berkali-kali semudah menjentikkan jari.

## Analogi: Mesin Kopi Otomatis atau Resep Indomie
Ketika Anda memesan Latte di kopi otomatis, Anda cuma menekan **Satu Tombol**. Padahal secara riil, mesinnya sibuk melakukan pekerjaan super panjang (menghaluskan biji, memasak air, memanaskan susu, mencampurkannya, mengalirkannya ke gelas). 
- Tombol yang ditekan itu namanya = **Cara Memanggil Fungsi**
- Pabrik yang merangkai mesin rahasia panjangnya = **Mendeklarasikan Fungsi**

## Implementasi Kode
```javascript
// --- BAGIAN 1: PERAKITAN / DEKLARASI FUNGSI ---
// Kita merangkai mesin ini 1 kali saja seumur hidup
function bikinKopi() {
    console.log("1. Menggerus Biji Kopi...");
    console.log("2. Merebus air...");
    console.log("3. Teteskan Kopi ke dalam cangkir...");
    console.log(">> Secangkir kopi hangat sudah jadi!");
}

// --- BAGIAN 2: PENGGUNAAN / PEMANGGILAN FUNGSI ---
console.log("Pagi hari, waktunya kerja!");
bikinKopi(); // kita tinggal tekan tombol fungsi dengan sepasang kurung ()! 

console.log("Ah, ngantuk nih udah sore...");
bikinKopi(); // Mesin dipanggil lagi tanpa nulis ulang rakitannya

console.log("Lembur malam...");
bikinKopi();
```

Fungsi mempermudah kita saat nantinya kode sudah mencapai 10.000+ baris. Memilahnya per-fungsi (seperti perabotan kecil) membuat otak dan folder Anda tetap bersih dan rapi!
