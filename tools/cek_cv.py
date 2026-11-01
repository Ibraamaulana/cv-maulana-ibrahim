#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
tools/cek_cv.py
Validator ringan untuk docs/.

Memeriksa:
    1. Semua file yang wajib ada di docs/
  2. Semua id section yang dipakai di navbar ada di index.html
    3. Semua gambar yang direferensikan ada di docs/assets/
"""

import os
import re
import sys
import io

# Force UTF-8 stdout on Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# ── KONFIGURASI ─────────────────────────────────────────────────────────────

# Lokasi root proyek (satu level di atas tools/)
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DOCS_DIR = os.path.join(ROOT, "docs")

# File yang wajib ada
REQUIRED_FILES = [
    os.path.join(DOCS_DIR, "index.html"),
    os.path.join(DOCS_DIR, "css", "style.css"),
    os.path.join(DOCS_DIR, "js", "script.js"),
    os.path.join(DOCS_DIR, "assets", "maulana-ibrahim.jpg"),
    os.path.join(DOCS_DIR, "assets", "favicon.svg"),
]

# Id section yang seharusnya ada di HTML (dari link navbar)
EXPECTED_SECTION_IDS = [
    "beranda",
    "tentang",
    "pendidikan",
    "keterampilan",
    "prestasi",
    "sertifikat",
    "kontak",
]

# ── WARNA TERMINAL ───────────────────────────────────────────────────────────
GREEN  = "\033[92m"
RED    = "\033[91m"
YELLOW = "\033[93m"
CYAN   = "\033[96m"
BOLD   = "\033[1m"
RESET  = "\033[0m"

OK   = f"{GREEN}[OK]{RESET}"
FAIL = f"{RED}[GAGAL]{RESET}"
WARN = f"{YELLOW}[PERINGATAN]{RESET}"

# ── HELPERS ──────────────────────────────────────────────────────────────────

def rel(path: str) -> str:
    """Tampilkan path relatif terhadap ROOT agar lebih ringkas."""
    return os.path.relpath(path, ROOT).replace("\\", "/")


def read_html() -> str:
    index = os.path.join(DOCS_DIR, "index.html")
    if not os.path.isfile(index):
        return ""
    with open(index, encoding="utf-8") as f:
        return f.read()


# ── CEK 1: FILE WAJIB ────────────────────────────────────────────────────────

def check_required_files() -> int:
    print(f"\n{BOLD}{CYAN}=== 1. CEK FILE WAJIB ==={RESET}")
    errors = 0
    for path in REQUIRED_FILES:
        if os.path.isfile(path):
            size = os.path.getsize(path)
            print(f"  {OK}  {rel(path)}  ({size:,} bytes)")
        else:
            print(f"  {FAIL}  {rel(path)}  <- TIDAK DITEMUKAN")
            errors += 1
    return errors


# ── CEK 2: SECTION ID DI INDEX.HTML ─────────────────────────────────────────

def check_section_ids(html: str) -> int:
    print(f"\n{BOLD}{CYAN}=== 2. CEK SECTION ID DI index.html ==={RESET}")
    errors = 0
    if not html:
        print(f"  {WARN}  index.html tidak dapat dibaca, lewati pemeriksaan ini.")
        return 1

    for sid in EXPECTED_SECTION_IDS:
        # Mencari id="beranda" (atau id='beranda')
        pattern = re.compile(rf'\bid=["\']?{re.escape(sid)}["\']?', re.IGNORECASE)
        if pattern.search(html):
            print(f"  {OK}  id=\"{sid}\"")
        else:
            print(f"  {FAIL}  id=\"{sid}\"  <- TIDAK DITEMUKAN di index.html")
            errors += 1
    return errors


# ── CEK 3: GAMBAR YANG DIREFERENSIKAN ────────────────────────────────────────

def check_images(html: str) -> int:
    print(f"\n{BOLD}{CYAN}=== 3. CEK GAMBAR YANG DIREFERENSIKAN ==={RESET}")
    errors = 0

    if not html:
        print(f"  {WARN}  index.html tidak dapat dibaca, lewati pemeriksaan ini.")
        return 1

    # Ambil semua src="..." dan href="..." yang berupa path lokal (bukan http)
    pattern = re.compile(r'(?:src|href)=["\']([^"\']+)["\']', re.IGNORECASE)
    candidates = pattern.findall(html)

    image_exts = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".ico", ".avif"}
    checked = set()

    for ref in candidates:
        # Lewati URL eksternal dan fragmen
        if ref.startswith(("http://", "https://", "//", "#", "data:", "mailto:", "tel:")):
            continue

        ext = os.path.splitext(ref.split("?")[0])[1].lower()
        if ext not in image_exts:
            continue

        # Normalisasi path relatif
        # Refs di HTML menggunakan path relatif terhadap docs/index.html
        full = os.path.normpath(os.path.join(DOCS_DIR, ref.lstrip("/")))
        if full in checked:
            continue
        checked.add(full)

        if os.path.isfile(full):
            size = os.path.getsize(full)
            print(f"  {OK}  {ref}  ({size:,} bytes)")
        else:
            print(f"  {FAIL}  {ref}  ← FILE TIDAK ADA di {rel(full)}")
            errors += 1

    if not checked:
        print(f"  {WARN}  Tidak ada referensi gambar lokal yang ditemukan di index.html.")

    return errors


# ── MAIN ─────────────────────────────────────────────────────────────────────

def main() -> None:
    print(f"\n{BOLD}{'='*52}")
    print("  CEK CV -- Maulana Ibrahim")
    print(f"  Direktori: {rel(DOCS_DIR)}")
    print(f"{'='*52}{RESET}")

    html = read_html()

    total_errors = 0
    total_errors += check_required_files()
    total_errors += check_section_ids(html)
    total_errors += check_images(html)

    print(f"\n{BOLD}{'='*52}")
    if total_errors == 0:
        print(f"  {GREEN}OK: Semua pemeriksaan LULUS. Web CV siap digunakan!{RESET}")
    else:
        print(f"  {RED}GAGAL: Ditemukan {total_errors} masalah. Periksa output di atas.{RESET}")
    print(f"{'='*52}{RESET}\n")

    sys.exit(0 if total_errors == 0 else 1)


if __name__ == "__main__":
    main()
