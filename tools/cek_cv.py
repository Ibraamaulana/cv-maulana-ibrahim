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

import argparse
import io
import os
import sys
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit

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


class HTMLReferences(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.references = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if attributes.get("id"):
            self.ids.add(attributes["id"])
        for attribute in ("href", "src"):
            reference = attributes.get(attribute)
            if reference:
                self.references.append((tag, attribute, reference))


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

    parser = HTMLReferences()
    parser.feed(html)
    for sid in EXPECTED_SECTION_IDS:
        if sid in parser.ids:
            print(f"  {OK}  id=\"{sid}\"")
        else:
            print(f"  {FAIL}  id=\"{sid}\"  <- TIDAK DITEMUKAN di index.html")
            errors += 1
    return errors


# ── CEK 3: GAMBAR YANG DIREFERENSIKAN ────────────────────────────────────────

def check_local_references(html: str) -> int:
    print(f"\n{BOLD}{CYAN}=== 3. CEK TAUTAN DAN RESOURCE LOKAL ==={RESET}")
    errors = 0

    if not html:
        print(f"  {WARN}  index.html tidak dapat dibaca, lewati pemeriksaan ini.")
        return 1

    parser = HTMLReferences()
    parser.feed(html)
    docs_root = os.path.abspath(DOCS_DIR)
    checked = set()

    for tag, attribute, reference in parser.references:
        parsed = urlsplit(reference)
        if parsed.scheme or parsed.netloc:
            continue

        if not parsed.path:
            fragment = unquote(parsed.fragment)
            if not fragment:
                continue
            if fragment in parser.ids:
                print(f"  {OK}  #{fragment}")
            else:
                print(f"  {FAIL}  #{fragment}  <- TARGET ANCHOR TIDAK DITEMUKAN")
                errors += 1
            continue

        full = os.path.abspath(os.path.join(docs_root, unquote(parsed.path).lstrip("/\\")))
        if full in checked:
            continue
        checked.add(full)

        try:
            inside_docs = os.path.normcase(os.path.commonpath([docs_root, full])) == os.path.normcase(docs_root)
        except ValueError:
            inside_docs = False

        reference_label = f"{tag} {attribute}={reference}"
        if not inside_docs:
            print(f"  {FAIL}  {reference_label}  <- PATH KELUAR DARI docs/")
            errors += 1
        elif os.path.isfile(full):
            print(f"  {OK}  {reference_label}")
        else:
            print(f"  {FAIL}  {reference_label}  <- FILE TIDAK DITEMUKAN di {rel(full)}")
            errors += 1

    return errors


def report_language_sizes() -> None:
    print(f"\n{BOLD}{CYAN}=== 4. LAPORAN UKURAN BAHASA ==={RESET}")
    extensions = {".html": "HTML", ".css": "CSS", ".js": "JavaScript", ".py": "Python"}
    totals = {language: 0 for language in extensions.values()}
    file_count = 0

    for root in (DOCS_DIR, os.path.join(ROOT, "tools")):
        for current_dir, _, filenames in os.walk(root):
            for filename in filenames:
                language = extensions.get(os.path.splitext(filename)[1].lower())
                if language:
                    totals[language] += os.path.getsize(os.path.join(current_dir, filename))
                    file_count += 1

    total_bytes = sum(totals.values())
    print(f"  File dianalisis: {file_count}; total: {total_bytes:,} bytes")
    for language, size in totals.items():
        percentage = (100 * size / total_bytes) if total_bytes else 0
        print(f"  {language:<12} {size:>9,} bytes  ({percentage:5.2f}%)")


# ── MAIN ─────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(description="Validasi website CV dan laporkan ukuran kode.")
    parser.add_argument("--report-sizes", action="store_true", help="Tampilkan ukuran byte per bahasa di docs/ dan tools/.")
    arguments = parser.parse_args()

    print(f"\n{BOLD}{'='*52}")
    print("  CEK CV -- Maulana Ibrahim")
    print(f"  Direktori: {rel(DOCS_DIR)}")
    print(f"{'='*52}{RESET}")

    html = read_html()

    total_errors = 0
    total_errors += check_required_files()
    total_errors += check_section_ids(html)
    total_errors += check_local_references(html)

    print(f"\n{BOLD}{'='*52}")
    if total_errors == 0:
        print(f"  {GREEN}OK: Semua pemeriksaan LULUS. Web CV siap digunakan!{RESET}")
    else:
        print(f"  {RED}GAGAL: Ditemukan {total_errors} masalah. Periksa output di atas.{RESET}")
    print(f"{'='*52}{RESET}\n")

    if arguments.report_sizes:
        report_language_sizes()

    sys.exit(0 if total_errors == 0 else 1)


if __name__ == "__main__":
    main()
