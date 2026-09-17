---
title: Template
description: Kumpulan template siap pakai berbasis Majalengka Design System untuk portal layanan publik, website desa, dashboard pengelola, dan aplikasi warga.
---

# Template Majalengka Design System

Koleksi template antarmuka siap pakai yang dirancang dengan **Majalengka Design System**. Dibangun dengan prinsip aksesibilitas **WCAG 2.1 Level AA**, performa cepat di jaringan seluler daerah, dan tata letak responsif ramah layar ponsel.

Tersedia untuk berbagai tumpukan teknologi: **Nuxt 4 / Vue 3**, **HTML & CSS Murni** (`@majalengka/css`), serta integrasi backend umum (Laravel, PHP, WordPress).

---

## 1. Layanan Publik & Portal Warga

Template untuk kebutuhan interaksi langsung warga dengan aparatur pemerintahan desa, kecamatan, dan instansi:

::u-page-grid
:u-page-card{icon="i-lucide-globe" title="Portal Desa & Kelurahan Digital" description="Website resmi desa dengan transparansi APBDes, profil aparatur desa, direktori potensi wisata lokal, dan pengumuman warga."}
:u-page-card{icon="i-lucide-clipboard-check" title="Portal Permohonan Layanan Terpadu" description="Formulir permohonan surat izin, adminduk, dan dokumen kependudukan multi-tahap lengkap dengan pelacakan nomor tiket."}
:u-page-card{icon="i-lucide-megaphone" title="Pusat Pengaduan & Aspirasi Warga" description="Kanal pelaporan keluhan sarana publik dan infrastruktur desa dengan upload bukti foto dan integrasi status penanganan."}
::

---

## 2. Dashboard & Pengelola Internal

Template panel administrasi khusus pengelola data, verifikator berkas, dan aparatur dinas/desa:

::u-page-grid
:u-page-card{icon="i-lucide-layout-dashboard" title="Dashboard Verifikator Berkas" description="Antarmuka antrean verifikasi dokumen kependudukan dengan tabel data responsif, modal preview berkas, dan aksi persetujuan cepat."}
:u-page-card{icon="i-lucide-chart-column-increasing" title="Statistik & Analitik Layanan Daerah" description="Visualisasi data tren permohonan bulanan, indeks kepuasan masyarakat, dan distribusi pemohon per kecamatan di Majalengka."}
:u-page-card{icon="i-lucide-shield-alert" title="Manajemen Krisis & Pengumuman Darurat" description="Panel kendali siaga bencana alam dan kedaruratan daerah dengan modul broadcast peringatan dini dan peta evakuasi."}
::

---

## 3. Direktori, Potensi & Publikasi Daerah

Template etalase promosi potensi lokal Kabupaten Majalengka:

::u-page-grid
:u-page-card{icon="i-lucide-store" title="Direktori Produk UMKM Majalengka" description="Katalog etalase produk unggulan daerah (mangga gedong gincu, tenun, olahan pangan) lengkap dengan kontak WhatsApp penjual."}
:u-page-card{icon="i-lucide-map-pin" title="Panduan Wisata & Destinasi Alam" description="Direktori wisata alam Majalengka (terasering, curug, paralayang) dengan rute navigasi, tarif retribusi, dan fasilitas."}
:u-page-card{icon="i-lucide-newspaper" title="Portal Warta & Agenda Kegiatan" description="Majalah digital dan jadwal agenda kebudayaan, car-free day, dan festival seni daerah Majalengka."}
::

---

## Cara Menggunakan Template

Seluruh template dapat diinisialisasi melalui CLI resmi atau disalin langsung dari repositori:

```bash
# Buat proyek baru menggunakan template desa digital
bun create majalengka-app my-desa-portal --template portal-desa

# Atau salin komponen & tata letak langsung ke proyek Vue / Nuxt eksisting
bun add @majalengka/vue @majalengka/css
```
