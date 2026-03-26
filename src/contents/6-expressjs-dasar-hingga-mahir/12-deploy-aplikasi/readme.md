# Deploy Aplikasi: Membuka Toko untuk Dunia

Aplikasi sehebat apapun tidak ada gunanya jika hanya ada di laptop Anda. Proses membawa aplikasi dari komputer Anda ke server internet disebut **Deployment**.

## Analogi: Membuka Toko Fisik

1. **Development (Laptop Anda)**: Seperti Anda merancang dekorasi toko di dalam gudang rumah. Tidak ada pelanggan yang bisa masuk.
2. **Production (Internet)**: Seperti Anda menyewa ruko di pinggir jalan raya, memasang papan nama, dan membuka pintu lebar-lebar untuk pelanggan.

Agar "ruko" (Server) kita berjalan lancar, kita butuh beberapa persiapan.

---

## 1. Persiapan Go-Live

Sebelum mengunggah kode, ada tiga peraturan penting:

### A. Gunakan Port Dinamis
Di laptop, kita mungkin pakai port `3000`. Tapi di server, port ditentukan oleh penyedia hosting.
```javascript
// Pakai port dari server, kalau tidak ada barulah pakai 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Berjalan di port ${PORT}`));
```

### B. Rahasiakan Password (Env Variables)
Jangan tulis password database atau kunci JWT langsung di kode. Gunakan file `.env`.
```text
# File .env (Jangan diunggah ke GitHub!)
DB_URL=mongodb+srv://user:pass@cluster.mongodb.net
JWT_SECRET=SangatRahasia123
```
Panggil dengan: `process.env.DB_URL`.

### C. Bersihkan Data yang Tidak Perlu
Hapus folder `node_modules` sebelum mengunggah. Biarkan server yang menginstall ulang lewat perintah `npm install`.

---

## 2. Pilihan Tempat Hosting (Ruko Digital)

Ada banyak tempat untuk menaruh aplikasi Express Anda:
- **Gratis/Murah (Heroku, Render, Railway)**: Sangat mudah, cukup hubungkan dengan GitHub.
- **Static Site (Vercel, Netlify)**: Bagus untuk Frontend, tapi Express butuh trik khusus (Serverless).
- **Pro (DigitalOcean, AWS)**: Seperti membangun gedung sendiri. Anda punya kontrol penuh tapi pusing mengurusnya.

---

## 3. Langkah Deploy di Render.com (Contoh Paling Mudah)

1. **Upload ke GitHub**: Buat repositori baru dan masukkan kode Anda ke sana.
2. **Daftar di Render**: Buat akun dan pilih "New Web Service".
3. **Hubungkan GitHub**: Pilih repositori yang sudah Anda buat tadi.
4. **Setting Perintah**:
   - `Build Command`: `npm install`
   - `Start Command`: `node index.js`
5. **Klik Deploy**: Tunggu 2-3 menit, dan aplikasi Anda punya link resmi (misal: `toko-saya.onrender.com`).

---

## 4. Menangani Error di Server (Logs)

Jika aplikasi mati di server, Anda tidak bisa melihat terminal laptop. Anda harus melihat **Logs** di dashboard hosting Anda untuk mencari tahu apa yang salah.

## Kesimpulan

Deployment adalah garis finish dari proses pembuatan aplikasi. Saat aplikasi Anda sudah online, selamat! Anda sudah resmi menjadi seorang **Web Developer**. Teruslah belajar dan kembangkan aplikasi Anda menjadi lebih bermanfaat bagi banyak orang!
