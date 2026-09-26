---
title: Template
description: Template halaman lengkap yang dibangun dengan Majalengka Design System, siap dijadikan titik awal proyek portal layanan publik.
---

# Template

Template adalah contoh situs utuh yang memakai token, komponen CSS, dan perilaku JS dari Majalengka Design System. Tujuannya dua: jadi titik awal proyek baru, dan membuktikan bahwa design system ini bekerja di halaman sungguhan, bukan hanya di demo komponen.

---

## Tersedia

::u-page-grid
:u-page-card{icon="i-lucide-graduation-cap" title="Portal Dinas Pendidikan" description="Konsep redesain disdik.majalengkakab.go.id dengan Nuxt 4 dan UnoCSS. Beranda dengan pencarian layanan, daftar layanan, dan halaman detail berisi syarat, langkah, dan FAQ. Lolos axe WCAG 2.2 AA dan tetap berfungsi tanpa JavaScript." to="/template/portal-dinas-pendidikan"}
::

::note
Template ini **konsep**, bukan situs resmi Dinas Pendidikan. Isinya diambil dari situs resmi pada September 2026, dan halamannya memasang pita keterangan serta `noindex`.
::

### Menjalankan

```bash
git clone https://github.com/MajalengkaTech/design-system.git
cd design-system
bun install
bun run dev:disdik   # http://localhost:3001
```

Untuk memakainya sebagai awal proyek sendiri, salin folder `templates/disdik`, lalu ganti isi `app/data/layanan.ts` dan `app/data/situs.ts` dengan data instansi Anda. Ubah dependensi `workspace:*` di `package.json` menjadi versi yang terbit di npm.

---

## Direncanakan

Template berikut belum dibuat. Usulan dan kontribusi terbuka lewat GitHub.

| Template | Isi |
|---|---|
| Portal desa dan kelurahan | Profil desa, transparansi APBDes, pengumuman warga |
| Permohonan layanan terpadu | Formulir multi-langkah dengan pelacakan nomor tiket |
| Pengaduan warga | Laporan dengan unggah foto dan status penanganan |
| Dashboard verifikator | Antrean berkas, pratinjau dokumen, persetujuan cepat |
| Direktori UMKM | Katalog produk dengan kontak WhatsApp penjual |
