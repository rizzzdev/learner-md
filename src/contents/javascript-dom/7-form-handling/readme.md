# Form Handling dan Validasi

Form adalah jembatan utama antara pengguna dan aplikasi. JavaScript memungkinkan kita mengambil data form, memvalidasinya secara real-time, memberi feedback visual, dan mengontrol pengirimannya.

## Analogi: Petugas Loket dengan Checklist

Bayangkan petugas loket yang menerima formulir dari antrean. Sebelum menerimanya ke sistem, ia mengecek satu per satu: "Apakah nama sudah diisi? Apakah nomor telepon valid? Apakah email formatnya benar?" Jika ada yang salah, ia langsung memberitahu dan mengembalikan formulir. Itulah validasi JavaScript.

## Mengambil Nilai dari Form

```javascript
// HTML:
// <form id="form-registrasi">
//   <input type="text" name="nama" id="nama">
//   <input type="email" name="email" id="email">
//   <select name="kota" id="kota">...</select>
//   <textarea name="pesan" id="pesan"></textarea>
//   <input type="checkbox" name="setuju" id="setuju">
//   <button type="submit">Daftar</button>
// </form>

const form = document.getElementById('form-registrasi');

// Cara 1: Ambil satu per satu via id
const nama  = document.getElementById('nama').value;
const email = document.getElementById('email').value;

// Cara 2: Akses via form.elements (lebih rapi)
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Hentikan submit default (tidak reload halaman)
    
    const nama    = form.elements['nama'].value.trim();
    const email   = form.elements['email'].value.trim();
    const kota    = form.elements['kota'].value;
    const pesan   = form.elements['pesan'].value.trim();
    const setuju  = form.elements['setuju'].checked; // Boolean!
    
    console.log({ nama, email, kota, pesan, setuju });
});

// Cara 3: FormData API — mengumpulkan semua sekaligus
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    
    console.log(data.get('nama'));    // Nilai field "nama"
    console.log(data.get('email'));   // Nilai field "email"
    
    // Konversi ke plain object
    const objData = Object.fromEntries(data.entries());
    console.log(objData); // { nama: "...", email: "...", ... }
    
    // Kirim ke server
    fetch('/api/register', { method: 'POST', body: data });
});
```

## Validasi Real-Time

```javascript
const inputNama  = document.getElementById('nama');
const errorNama  = document.getElementById('error-nama'); // <span> untuk pesan error

function validasiNama(nilai) {
    if (nilai.length === 0) {
        return { valid: false, pesan: 'Nama tidak boleh kosong.' };
    }
    if (nilai.length < 3) {
        return { valid: false, pesan: 'Nama minimal 3 karakter.' };
    }
    if (!/^[a-zA-Z\s]+$/.test(nilai)) {
        return { valid: false, pesan: 'Nama hanya boleh huruf dan spasi.' };
    }
    return { valid: true, pesan: '' };
}

function tampilkanValidasi(input, errorEl, hasil) {
    if (hasil.valid) {
        input.classList.remove('border-red-500');
        input.classList.add('border-green-500');
        errorEl.textContent = '';
        errorEl.classList.add('hidden');
    } else {
        input.classList.remove('border-green-500');
        input.classList.add('border-red-500');
        errorEl.textContent = hasil.pesan;
        errorEl.classList.remove('hidden');
    }
}

// Validasi saat mengetik (real-time)
inputNama.addEventListener('input', () => {
    const hasil = validasiNama(inputNama.value.trim());
    tampilkanValidasi(inputNama, errorNama, hasil);
});

// Validasi saat field ditinggalkan
inputNama.addEventListener('blur', () => {
    const hasil = validasiNama(inputNama.value.trim());
    tampilkanValidasi(inputNama, errorNama, hasil);
});
```

## Validasi Lengkap Saat Submit

```javascript
const form = document.getElementById('form-registrasi');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fields = {
        nama  : { el: form.elements['nama'],  min: 3,  label: 'Nama' },
        email : { el: form.elements['email'], label: 'Email' },
        umur  : { el: form.elements['umur'],  label: 'Umur' }
    };
    
    let formValid = true;
    
    // Validasi nama
    if (fields.nama.el.value.trim().length < fields.nama.min) {
        tampilkanError('error-nama', `${fields.nama.label} minimal ${fields.nama.min} karakter.`);
        formValid = false;
    } else {
        hapusError('error-nama');
    }
    
    // Validasi email dengan regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fields.email.el.value)) {
        tampilkanError('error-email', 'Format email tidak valid.');
        formValid = false;
    } else {
        hapusError('error-email');
    }
    
    if (formValid) {
        const data = new FormData(form);
        kirimData(Object.fromEntries(data.entries()));
    }
});

async function kirimData(data) {
    const btnSubmit = form.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Mengirim...';
    
    try {
        const respons = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (respons.ok) {
            form.reset();
            tampilkanSukses('Registrasi berhasil! Silakan cek email Anda.');
        } else {
            throw new Error('Gagal mendaftar.');
        }
    } catch (error) {
        tampilkanError('error-global', error.message);
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Daftar';
    }
}
```
