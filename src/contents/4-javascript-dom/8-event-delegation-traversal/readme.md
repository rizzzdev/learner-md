# Event Delegation dan Traversal DOM

Dua teknik tingkat lanjut ini membuat kode DOM Anda jauh lebih efisien dan mudah dikelola — terutama ketika bekerja dengan banyak elemen atau elemen yang dibuat secara dinamis.

## Bagian 1: Event Delegation

### Masalah: Terlalu Banyak Listener

```javascript
// ❌ CARA BURUK: Pasang listener ke setiap item
const semuaBtn = document.querySelectorAll('.btn-hapus');
semuaBtn.forEach(btn => {
    btn.addEventListener('click', hapusItem);
    // 100 item = 100 listener = boros memori!
    // Dan item yang ditambah DINAMIS tidak akan punya listener ini!
});
```

### Solusi: Event Delegation (Satu Listener untuk Semua Anak)

Event Delegation memanfaatkan **event bubbling** — setiap event akan "naik" ke elemen-elemen induknya. Jadi kita bisa pasang satu listener di elemen **induk**, dan filter siapa yang memicunya.

```javascript
// ✅ CARA BAIK: Satu listener di elemen induk
const daftarTugas = document.querySelector('#daftar-tugas');

daftarTugas.addEventListener('click', (e) => {
    // e.target adalah elemen yang BENAR-BENAR diklik
    
    // Cek apakah yang diklik adalah tombol hapus
    if (e.target.classList.contains('btn-hapus')) {
        const item = e.target.closest('li'); // Naik ke elemen <li> terdekat
        item.remove();
    }
    
    // Cek apakah yang diklik adalah checkbox
    if (e.target.type === 'checkbox') {
        const teks = e.target.nextElementSibling; // Elemen span di sebelahnya
        teks.classList.toggle('selesai');
    }
});

// Sekarang, item baru yang ditambah secara dinamis OTOMATIS punya behavior ini!
function tambahItemBaru(teks) {
    daftarTugas.innerHTML += `
        <li>
            <input type="checkbox">
            <span>${teks}</span>
            <button class="btn-hapus">Hapus</button>
        </li>
    `;
    // Tidak perlu pasang listener baru!
}
```

### Menggunakan `closest()` untuk Menavigasi ke Atas

```javascript
// closest() mencari elemen induk terdekat yang cocok dengan selektor
// Ini sangat berguna dalam event delegation

dokumen.querySelector('#tabel-produk').addEventListener('click', (e) => {
    // Pengguna mungkin klik teks di dalam button, bukan button-nya langsung
    const tombolEdit = e.target.closest('.btn-edit');
    if (!tombolEdit) return; // Klik bukan di area tombol edit
    
    const baris = tombolEdit.closest('tr'); // Cari <tr> terdekat
    const idProduk = baris.dataset.id;
    bukaFormEdit(idProduk);
});
```

## Bagian 2: Traversal DOM (Navigasi Pohon)

Traversal artinya bergerak dari satu elemen ke elemen lain berdasarkan hubungan dalam pohon DOM.

### Naik ke Induk (Parent)

```javascript
const anak = document.querySelector('.item');

anak.parentNode;        // Elemen induk langsung (bisa juga Text Node)
anak.parentElement;     // Elemen induk langsung (hanya Element, lebih aman)
anak.closest('.wadah'); // Induk terdekat yang cocok selektor (bisa melewati beberapa level)
```

### Turun ke Anak (Children)

```javascript
const induk = document.querySelector('.daftar');

induk.childNodes;          // Semua node anak (termasuk Text Node dan Comment Node)
induk.children;            // Hanya Element Node anak (lebih sering dipakai)
induk.firstChild;          // Anak pertama (mungkin Text Node)
induk.firstElementChild;   // Anak pertama berupa Element
induk.lastChild;           // Anak terakhir
induk.lastElementChild;    // Anak terakhir berupa Element
induk.childElementCount;   // Jumlah anak Element
```

### Bergerak ke Saudara (Siblings)

```javascript
const el = document.querySelector('.item-aktif');

el.previousSibling;          // Saudara sebelumnya (mungkin Text Node)
el.previousElementSibling;   // Saudara Element sebelumnya
el.nextSibling;              // Saudara setelahnya
el.nextElementSibling;       // Saudara Element setelahnya
```

### Contoh Nyata: Tabs / Accordion

```javascript
const tabList = document.querySelector('.tab-list');

tabList.addEventListener('click', (e) => {
    const tabDiklik = e.target.closest('.tab');
    if (!tabDiklik) return;
    
    // Nonaktifkan semua tab: iterasi saudara-saudara tab yang diklik
    let saudara = tabList.firstElementChild;
    while (saudara) {
        saudara.classList.remove('aktif');
        saudara = saudara.nextElementSibling;
    }
    
    // Aktifkan tab yang diklik
    tabDiklik.classList.add('aktif');
    
    // Tampilkan panel konten yang sesuai
    const idPanel = tabDiklik.dataset.panel;
    
    // Sembunyikan semua panel
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
    
    // Tampilkan panel yang sesuai
    document.getElementById(idPanel).classList.remove('hidden');
});
```

## Rangkuman: Cheatsheet Traversal

| Properti | Ke Mana |
|---|---|
| `parentElement` | Naik ke induk |
| `closest(sel)` | Naik ke induk yang cocok selektor |
| `children` | Semua anak (Element saja) |
| `firstElementChild` | Anak pertama |
| `lastElementChild` | Anak terakhir |
| `previousElementSibling` | Saudara sebelumnya |
| `nextElementSibling` | Saudara sesudahnya |
