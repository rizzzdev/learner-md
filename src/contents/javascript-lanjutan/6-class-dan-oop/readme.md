# Class dan OOP: Cetakan untuk Membuat Objek

Class di JavaScript (ES6+) adalah cara modern untuk mendefinisikan **blueprint** (cetak biru) dari sebuah obyek. Object-Oriented Programming (OOP) adalah paradigma coding yang memodelkan hal-hal di dunia nyata sebagai "objek" yang memiliki data (properti) dan perilaku (method).

## Analogi: Pabrik Kartu Nama

Sebuah pabrik bisa mencetak ribuan kartu nama yang berbeda-beda isinya, tapi semua menggunakan **cetakan/template yang sama** (layout, ukuran, font). Cetakan itu adalah **Class**. Setiap kartu nama yang dicetak adalah **Instance** (objek) nya.

## Membuat Class Dasar

```javascript
// 1. DEFINISI: Membuat class (cetakan) bernama "Karyawan"
class Karyawan {

    // Constructor: dijalankan OTOMATIS saat objek baru dibuat
    // 'this' merujuk ke objek yang sedang dibuat
    constructor(nama, jabatan, gaji) {
        this.nama    = nama;
        this.jabatan = jabatan;
        this.gaji    = gaji;
    }

    // METHOD: perilaku/aksi yang bisa dilakukan oleh objek ini
    perkenalan() {
        return `Halo! Saya ${this.nama}, bekerja sebagai ${this.jabatan}.`;
    }

    naikGaji(persentase) {
        this.gaji = this.gaji * (1 + persentase / 100);
        return `Selamat! Gaji ${this.nama} naik menjadi Rp ${this.gaji.toLocaleString('id-ID')}`;
    }
}

// 2. INSTANSIASI: Cetak kartu nama baru dari cetakan 'Karyawan'
const karyawan1 = new Karyawan("Budi Santoso", "Programmer", 8000000);
const karyawan2 = new Karyawan("Sari Dewi",   "Designer",   7500000);

console.log(karyawan1.perkenalan());
// Halo! Saya Budi Santoso, bekerja sebagai Programmer.

console.log(karyawan2.naikGaji(10));
// Selamat! Gaji Sari Dewi naik menjadi Rp 8.250.000
```

## Getter dan Setter

Getter dan Setter adalah "pintu" khusus untuk mengakses atau mengubah properti secara terkontrol.

```javascript
class Termostat {
    constructor(suhuCelcius) {
        this._suhu = suhuCelcius; // Konvensi: '_' menandakan properti "private"
    }

    // GETTER: dipanggil seperti properti biasa, tapi sebenarnya adalah fungsi
    get suhu() {
        return this._suhu;
    }

    get suhuFahrenheit() {
        return (this._suhu * 9/5) + 32;
    }

    // SETTER: dipanggil saat kita assign nilai
    set suhu(nilaiSuhu) {
        if (nilaiSuhu < -273.15) {
            throw new Error("Suhu tidak bisa lebih rendah dari absolut zero!");
        }
        this._suhu = nilaiSuhu;
    }
}

const ac = new Termostat(25);
console.log(ac.suhu);           // 25 (memanggil getter)
console.log(ac.suhuFahrenheit); // 77

ac.suhu = 18;                   // memanggil setter
console.log(ac.suhu);           // 18
```

## Inheritance (Pewarisan) dengan `extends`

Pabrik bisa membuat "cetakan turunan" yang mewarisi semua fitur cetakan induknya, lalu menambahkan fiturnya sendiri.

```javascript
// Class Induk (Parent)
class Hewan {
    constructor(nama, suara) {
        this.nama  = nama;
        this.suara = suara;
    }

    berbunyi() {
        return `${this.nama} bersuara: ${this.suara}!`;
    }
}

// Class Anak (Child) — mewarisi semua dari Hewan
class Anjing extends Hewan {
    constructor(nama, ras) {
        // 'super()' wajib dipanggil untuk menginisialisasi class induk
        super(nama, "Guk");
        this.ras = ras;
    }

    // Method BARU khusus Anjing
    apport() {
        return `${this.nama} si ${this.ras} membawakan bola!`;
    }

    // METHOD OVERRIDE: timpa method yang sama dari class induk
    berbunyi() {
        return `${this.nama} si ${this.ras}: GUKK GUKK GUKK!! 🐕`;
    }
}

const anjingku = new Anjing("Rex", "Golden Retriever");
console.log(anjingku.berbunyi()); // Rex si Golden Retriever: GUKK GUKK GUKK!! 🐕
console.log(anjingku.apport());   // Rex si Golden Retriever membawakan bola!

// Cek apakah sebuah objek adalah instance dari kelas tertentu
console.log(anjingku instanceof Anjing); // true
console.log(anjingku instanceof Hewan);  // true (karena Anjing extends Hewan)
```

## Static Method

Method yang dipanggil **langsung dari kelas**, bukan dari objeknya.

```javascript
class Matematika {
    static tambah(a, b) { return a + b; }
    static kali(a, b)   { return a * b; }
    static PI = 3.14159; // static property
}

// Dipanggil dari class-nya langsung, tanpa 'new'
console.log(Matematika.tambah(5, 3));  // 8
console.log(Matematika.kali(4, 7));    // 28
console.log(Matematika.PI);            // 3.14159
```
