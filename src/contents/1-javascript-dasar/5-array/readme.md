# 5. Array: Lemari Berisi Banyak Laci

Kita tahu bahwa *Variabel* adalah "kardus penyimpan". Tetapi, apa yang terjadi jika kita punya 100 murid di sekolah? Masa kita harus membuat 100 kardus/variabel (`murid1`, `murid2`, ... `murid100`) secara manual? Tentu tidak efisien! Oleh karenanya kita membutuhkan **Array**.

## Analogi: Lemari Loker di Gym
Array itu seperti lemari besar di sekolah atau tempat Gym yang memiliki rak laci-laci kecil berjejer berurutan. Di lemari besar itu, rak lacinya diberikan nomor identitas dari atas sampai bawah. 

*(Perhatian anehnya programmer: Programmer selalu mulai perhitungan dari angka Nol (0), bukan angka (1)! Laci paling pertama disebuah Laci nomor 0).*

Jadi, Array adalah "satu variabel" yang sanggup menyimpan "Banyak Data Sekaligus" dalam sebuah urutan.

## Implementasi Kode
```javascript
// Array diapit menggunakan kurung siku [ dan dipisah koma ]
let daftarMurid = ["Budi", "Andi", "Tini", "Sari"];

// Menampilkan semua rak
console.log(daftarMurid);

// Mari kita lihat siapa murid yang tersimpan di laci nomor 0 (paling pertama)
console.log("Murid pertama adalah:", daftarMurid[0]); // Budi

// Mari kita lihat murid kedua (laci nomor 1)
console.log("Murid kedua adalah:", daftarMurid[1]); // Andi

// Menambahkan murid baru di laci terakhir (nge-push ke rak)
daftarMurid.push("Dono");
console.log("Daftar murid terbaru:", daftarMurid);
```

### Tips Penggunaan
- Selalu ingat nomor di Array (yang kita sebut sebagai *Index*) selalu dimulai dari **0**, dan kalau ada 4 buah data, maka *Index* tertingginya yaitu **3**.
- Anda juga dapat menggunakan perintah pembantu bawaan seperti `.length` untuk mengecek total ada berapa item di dalam kardusnya (contoh `daftarMurid.length` menghasilkan nilai `5`).
