# Maulana Ibrahim — Personal CV Website

Website CV personal Maulana Ibrahim. Versi utama yang dinilai adalah website HTML/CSS/JavaScript murni di `docs/`.

| Versi | Stack | Folder |
|---|---|---|
| **Prototipe Figma Make** | React 19, Vite 8, Tailwind CSS v4, TypeScript | `prototype-figma-make/` |
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
├── docs/                     # Website utama HTML/CSS/JS dan sumber GitHub Pages
│   ├── index.html
│   ├── css/style.css
│   ├── js/script.js
│   └── assets/
├── tools/
│   └── cek_cv.py             # Validator Python untuk docs/
├── prototype-figma-make/     # Draf awal Figma Make, bukan versi utama yang dinilai
│   ├── src/
│   ├── public/
│   ├── .figma/make/site.json
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── vite.config.ts
│   └── AGENTS.md, CLAUDE.md, .mise.toml, tsconfig.json
├── README.md
├── .gitattributes
└── .gitignore
```

---

## 🚀 Cara Menjalankan

### Website utama (tanpa build tool)

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

### Menjalankan prototipe Figma Make (React / Vite)

```bash
cd prototype-figma-make
pnpm install
pnpm dev       # http://localhost:8443
```

GitHub Pages menerbitkan website HTML statis dari branch `main`, folder `/docs`.

## Prototipe Figma Make

Folder `prototype-figma-make/` berisi draf awal yang dihasilkan dengan Figma Make. Folder ini dipertahankan sebagai prototipe; versi utama yang dinilai adalah HTML/CSS/JavaScript murni di `docs/`.

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
| Prototipe Figma Make | React 19, Vite 8, Tailwind CSS v4, TypeScript |

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

