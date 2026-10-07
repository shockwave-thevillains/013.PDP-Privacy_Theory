# 🔐 Kamus Privasi Data

Web app edukatif yang menjelaskan istilah privasi & pelindungan data pribadi (rujukan **UU PDP No. 27/2022** dan **GDPR**), lengkap dengan definisi, analogi, contoh kasus, kesalahpahaman umum, dan demo interaktif.

## ✨ Fitur

- **📚 Glosarium (43 istilah, 6 kategori)** dengan pencarian dan filter kategori
  - 🧩 Konsep dasar: data pribadi, data spesifik, subjek data, pengendali, prosesor, pengendali bersama, pemrosesan
  - ⚖️ Dasar hukum: *consent*, *contractual necessity*, kewajiban hukum, kepentingan vital, tugas publik, kepentingan sah
  - 📐 Prinsip: pembatasan tujuan, minimisasi, akurasi, retensi, transparansi, keamanan, akuntabilitas
  - 🔐 Teknik: enkripsi, hashing, pseudonimisasi, anonimisasi, k-anonymity, tokenisasi, data masking, differential privacy
  - 🙋 Hak subjek data: akses, rektifikasi, penghapusan, pembatasan, portabilitas, keberatan/profiling, menarik persetujuan
  - 🏛️ Tata kelola: DPIA, DPO, ROPA, privacy by design, DPA, notifikasi kebocoran, transfer lintas negara, cookie
- **🧪 Demo interaktif** (berjalan lokal di browser, tanpa server):
  enkripsi AES-GCM, hashing SHA-256 (avalanche effect + salt), pseudonimisasi dengan tabel kunci, k-anonymity, tokenisasi dengan vault, dan data masking berbasis peran
- **🆚 Perbandingan**: tabel enkripsi vs hashing vs pseudonimisasi vs tokenisasi vs masking vs anonimisasi, kartu 6 dasar hukum, dan pohon keputusan
- **🎯 Kuis**: 10 studi kasus untuk menentukan dasar hukum yang tepat
- Tautan langsung per istilah (`#term/enkripsi`), mode gelap otomatis, responsif di ponsel

## 🚀 Menjalankan

Tidak perlu build. Jalankan server statis apa saja dari folder repo:

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

> Demo enkripsi & hashing memakai Web Crypto API, yang hanya tersedia di `https://` atau `localhost`.

### 🌐 GitHub Pages

Situs: **https://shockwave-thevillains.github.io/013.PDP-Privacy_Theory/**

Aktifkan sekali saja: **Settings → Pages → Build and deployment → Source: _Deploy from a branch_ → Branch: `main`, folder `/ (root)` → Save**. Setelah ±1 menit situs aktif dan setiap push ke `main` akan ter-deploy otomatis.

Semua path di aplikasi bersifat relatif sehingga berjalan di subpath `/013.PDP-Privacy_Theory/`, dan file `.nojekyll` membuat GitHub menyajikan file apa adanya tanpa diproses Jekyll.

## 🗂️ Struktur

```
index.html      # kerangka halaman & tab
css/style.css   # tampilan (light/dark)
js/data.js      # konten: istilah, kategori, kuis, tabel perbandingan
js/demos.js     # demo interaktif
js/app.js       # render, pencarian, routing, modal, kuis
```

Menambah istilah cukup dengan menambahkan objek baru ke array `TERMS` di `js/data.js` (field `demo` opsional: `encrypt`, `hash`, `pseudonym`, `anonym`, `token`, `mask`).

## ⚠️ Disclaimer

Materi edukasi, **bukan nasihat hukum**. Rujukan pasal disederhanakan untuk tujuan belajar — selalu verifikasi dengan teks resmi peraturan dan peraturan pelaksana terbaru.
