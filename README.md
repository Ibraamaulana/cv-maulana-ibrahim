# Maulana Ibrahim — Personal CV Website

Website CV personal Maulana Ibrahim yang dibangun dengan dua versi:

| Versi | Stack | Folder |
|---|---|---|
| **React** (Figma Make) | React 19, Vite 8, Tailwind CSS v4, TypeScript | `src/` |
| **Website utama** | HTML5, CSS3, JavaScript (ES2020+) | `docs/` |

🔗 **Live Demo (React):** [alarm-steel-06219396.figma.site](https://alarm-steel-06219396.figma.site/)
📦 **Repository GitHub:** [Ibraamaulana/cv-maulana-ibrahim](https://github.com/Ibraamaulana/cv-maulana-ibrahim)
🌐 **Website GitHub Pages:** [ibraamaulana.github.io/cv-maulana-ibrahim](https://ibraamaulana.github.io/cv-maulana-ibrahim/)

---

## ✨ Fitur

- **Desain tema gelap** dengan aksen `#5B7C99`, font Inter, dan kartu rounded
- **Responsif** — tampil optimal di HP (≥320 px) hingga desktop lebar
- **Tema gelap/terang** dengan tombol toggle dan simpan ke `localStorage`
- **Menu hamburger** untuk navigasi mobile yang mulus
- **Animasi scroll** (`IntersectionObserver`) — elemen muncul saat masuk layar
- **Navbar aktif** — link berubah warna sesuai section yang sedang dilihat
- **Smooth scroll** untuk semua anchor link
- **Tombol kembali ke atas** (floating, muncul setelah scroll 400 px)
- **Foto grayscale** dengan efek warna saat hover
- **Aksesibilitas** — tag semantik, `aria-label`, `alt` text, dan `role` yang tepat
- **Validator otomatis** (`tools/cek_cv.py`) — memeriksa struktur file di `docs/` sebelum deploy

---

## 🗂 Struktur Folder

```
Responsive Personal CV Website/
├── src/                      # Versi React (Figma Make)
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── public/
│   ├── favicon.svg
│   └── maulana-ibrahim.jpg
│
├── docs/                     # Website utama HTML/CSS/JS dan sumber GitHub Pages
│   ├── index.html
│   ├── css/style.css
│   ├── js/script.js
│   └── assets/
│
├── tools/
│   └── cek_cv.py             # Validator Python untuk docs/
│
├── README.md
├── package.json
└── vite.config.ts
```

---

## 🚀 Cara Menjalankan

### Versi Vanilla (tanpa build tool)

1. Buka folder `docs/`
2. Buka `index.html` langsung di browser — **tidak perlu server**

   ```
   docs/index.html  →  klik dua kali atau drag ke browser
   ```

   > Atau jalankan server lokal sederhana (opsional, untuk font Google Fonts):
   > ```bash
   > python -m http.server 8000 --directory docs
   > # lalu buka http://localhost:8000
   > ```

### Versi React (Figma Make / Vite)

```bash
pnpm install
pnpm dev       # http://localhost:8443
```

GitHub Pages menerbitkan website HTML statis dari branch `main`, folder `/docs`.

---

## 🔍 Validasi Struktur

Jalankan skrip Python untuk memastikan semua file dan section ID ada:

```bash
python tools/cek_cv.py
```

Output akan menampilkan status OK / GAGAL untuk setiap pemeriksaan:
- File wajib (`index.html`, `style.css`, `script.js`, aset gambar)
- Semua `id` section yang dipakai navbar
- Semua gambar yang direferensikan di HTML

---

## 🛠 Teknologi

| Komponen | Teknologi |
|---|---|
| Markup | HTML5 (tag semantik) |
| Gaya | CSS3 (variables, flexbox, grid, media queries) |
| Interaktivitas | JavaScript ES2020+ (vanilla, tanpa library) |
| Validasi | Python 3 (stdlib only) |
| Font | Google Fonts — Inter |
| React versi | React 19, Vite 8, Tailwind CSS v4 |

---

## 📑 Bagian Website

| No | Section | ID |
|---|---|---|
| — | Beranda / Hero | `#beranda` |
| 01 | Tentang | `#tentang` |
| 02 | Pendidikan | `#pendidikan` |
| 03 | Keterampilan | `#keterampilan` |
| 04 | Prestasi | `#prestasi` |
| 05 | Sertifikat | `#sertifikat` |
| 06 | Kontak | `#kontak` |

---

## 👤 Kontak

**Maulana Ibrahim**  
📍 Kota Probolinggo  
📱 [082257793676](https://wa.me/6282257793676)  
✉️ [mi7908368@gmail.com](mailto:mi7908368@gmail.com)

