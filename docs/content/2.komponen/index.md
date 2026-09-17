---
title: Katalog Komponen
description: Direktori komponen antarmuka resmi Pemerintah Kabupaten Majalengka yang lengkap, teruji, aksesibel, dan framework-agnostic.
---

# Katalog Komponen Majalengka

Selamat datang di direktori komponen resmi **Majalengka Design System**. Seluruh komponen di bawah ini dirancang mematuhi standar aksesibilitas **WCAG 2.1 Level AA**, prinsip ergonomi **Kumo UI**, serta kaidah **Hukum UX & Psikologi Kognitif**.

Dapat digunakan langsung di framework apa pun melalui **CSS Murni** (`@majalengka/css`), **UnoCSS** (`presetMajalengka`), **Tailwind CSS**, maupun **Vue 3** (`@majalengka/vue`).

---

## 1. Elemen Dasar (Primitives)

Fondasi interaksi visual dan identitas antarmuka:

::u-page-grid
:u-page-card{to="/komponen/dasar/button" icon="i-lucide-mouse-pointer-click" title="Button (Tombol)" description="Tombol tindakan berukuran proporsional (32/40/48px) dengan 5 varian aksi."}
:u-page-card{to="/komponen/dasar/badge" icon="i-lucide-tag" title="Badge (Lencana Status)" description="Penanda status permohonan dengan varian pill dan indikator dot."}
:u-page-card{to="/komponen/dasar/avatar" icon="i-lucide-user" title="Avatar & AvatarGroup" description="Penampil foto warga, inisial petugas, dan tumpukan tim verifikator."}
:u-page-card{to="/komponen/dasar/kbd" icon="i-lucide-keyboard" title="Kbd (Tombol Keyboard)" description="Penampil tombol keyboard untuk shortcut pencarian dan instruksi."}
:u-page-card{to="/komponen/dasar/chip" icon="i-lucide-bell" title="Chip (Notifikasi)" description="Titik atau angka counter notifikasi di pojok atas elemen."}
:u-page-card{to="/komponen/dasar/skeleton" icon="i-lucide-square-dashed" title="Skeleton (Pemuat Shimmer)" description="Placeholder pemuatan data halus yang mematuhi ambang batas Doherty (< 400ms)."}
:u-page-card{to="/komponen/dasar/progress" icon="i-lucide-bar-chart-2" title="Progress Bar" description="Indikator persentase pemenuhan berkas untuk efek psikologis Goal-Gradient."}
:u-page-card{to="/komponen/dasar/user" icon="i-lucide-contact" title="User (Identitas)" description="Format identitas terpadu: avatar + nama + jabatan dalam satu baris."}
:u-page-card{to="/komponen/dasar/icon" icon="i-lucide-sparkles" title="Icon" description="Standarisasi dimensi ikon Lucide yang mewarisi warna teks induk."}
:u-page-card{to="/komponen/dasar/spinner" icon="i-lucide-loader-2" title="Spinner" description="Indikator pemrosesan server dan pengunggahan berkas."}
:u-page-card{to="/komponen/dasar/divider" icon="i-lucide-minus" title="Divider" description="Garis pemisah seksi konten biasa maupun berlabel tengah."}
::

---

## 2. Formulir & Masukan

Wadah pengumpulan data permohonan warga yang toleran terhadap kesalahan input:

::u-page-grid
:u-page-card{to="/komponen/formulir/form-field" icon="i-lucide-layout" title="FormField" description="Pembungkus label wajib, teks petunjuk (hint), dan pesan validasi."}
:u-page-card{to="/komponen/formulir/input" icon="i-lucide-text-cursor-input" title="Input Teks & NIK" description="Kolom isian NIK 16 digit, telepon seluler, dan teks umum."}
:u-page-card{to="/komponen/formulir/input-group" icon="i-lucide-group" title="InputGroup & ButtonGroup" description="Menggabungkan input dengan tombol cari atau addon prefix mata uang."}
:u-page-card{to="/komponen/formulir/pin-input" icon="i-lucide-hash" title="PinInput (Kode OTP)" description="Kotak kode verifikasi per kotak mematuhi Hukum Miller & Chunking."}
:u-page-card{to="/komponen/formulir/switch" icon="i-lucide-toggle-right" title="Switch (Toggle Sakelar)" description="Pengaturan biner aktif/nonaktif yang berlaku instan."}
:u-page-card{to="/komponen/formulir/slider" icon="i-lucide-sliders" title="Slider" description="Kontrol penggeser nilai untuk menentukan radius zonasi atau batas jangkauan."}
:u-page-card{to="/komponen/formulir/textarea" icon="i-lucide-align-left" title="Textarea" description="Area teks laporan pengaduan dengan pembatas karakter."}
:u-page-card{to="/komponen/formulir/select" icon="i-lucide-chevron-down" title="Select Dropdown" description="Menu pilihan kecamatan, kelurahan, dan kategori izin."}
:u-page-card{to="/komponen/formulir/checkbox-radio" icon="i-lucide-check-square" title="Checkbox & Radio" description="Pilihan persetujuan berkas dan opsi metode pengambilan dokumen."}
:u-page-card{to="/komponen/formulir/file-upload" icon="i-lucide-upload-cloud" title="FileUpload" description="Dropzone pengunggahan foto KTP, KK, dan berkas persyaratan."}
::

---

## 3. Navigasi & Struktur

Penunjuk arah dan struktur hierarki informasi:

::u-page-grid
:u-page-card{to="/komponen/navigasi/gov-banner" icon="i-lucide-flag" title="GovBanner" description="Pita resmi Pemkab Majalengka untuk verifikasi keabsahan situs."}
:u-page-card{to="/komponen/navigasi/skip-link" icon="i-lucide-corner-down-right" title="SkipLink" description="Tautan pintas langsung ke konten untuk pengguna keyboard."}
:u-page-card{to="/komponen/navigasi/stepper" icon="i-lucide-list-ordered" title="Stepper" description="Penunjuk tahapan alur permohonan layanan multi-langkah."}
:u-page-card{to="/komponen/navigasi/tabs" icon="i-lucide-folder" title="Tabs" description="Navigasi panel tab bergaya underline dan pil kapsul."}
:u-page-card{to="/komponen/navigasi/breadcrumb" icon="i-lucide-chevrons-right" title="Breadcrumb" description="Jejak navigasi hierarki halaman dari beranda."}
:u-page-card{to="/komponen/navigasi/pagination" icon="i-lucide-binary" title="Pagination" description="Kontrol penomoran halaman untuk tabel data publik."}
::

---

## 4. Umpan Balik & Dialog

Komunikasi status sistem dan konfirmasi tindakan:

::u-page-grid
:u-page-card{to="/komponen/umpan-balik/alert" icon="i-lucide-alert-circle" title="Alert" description="Spanduk status sukses, peringatan, info, dan kesalahan teknis."}
:u-page-card{to="/komponen/umpan-balik/toast" icon="i-lucide-message-square" title="Toast" description="Notifikasi mengambang di pojok layar setelah tindakan dieksekusi."}
:u-page-card{to="/komponen/umpan-balik/modal" icon="i-lucide-layers" title="Modal Dialog" description="Kotak dialog konfirmasi sebelum tindakan penting."}
:u-page-card{to="/komponen/umpan-balik/drawer" icon="i-lucide-panel-right" title="Drawer & Slideover" description="Panel samping geser untuk formulir detail dan filter mendalam."}
:u-page-card{to="/komponen/umpan-balik/tooltip" icon="i-lucide-help-circle" title="Tooltip" description="Petunjuk teks melayang murni CSS saat kursor diarahkan."}
:u-page-card{to="/komponen/umpan-balik/empty-state" icon="i-lucide-inbox" title="EmptyState" description="Tampilan informatif ketika data permohonan masih kosong."}
::

---

## 5. Tampilan Data

Penyajian data statistik dan riwayat kronologis layanan publik:

::u-page-grid
:u-page-card{to="/komponen/tampilan-data/table" icon="i-lucide-table" title="Table Responsif" description="Tabel data permohonan ramah layar sentuh ponsel dengan angka tabular."}
:u-page-card{to="/komponen/tampilan-data/stat-card" icon="i-lucide-trending-up" title="StatCard" description="Kartu metrik statistik capaian layanan dengan indikator tren."}
:u-page-card{to="/komponen/tampilan-data/timeline" icon="i-lucide-clock" title="Timeline" description="Pelacak kronologis perjalanan berkas di meja verifikator."}
:u-page-card{to="/komponen/tampilan-data/card" icon="i-lucide-square" title="Card Layanan" description="Kartu katalog layanan kependudukan dan ringkasan informasi."}
:u-page-card{to="/komponen/tampilan-data/accordion" icon="i-lucide-fold-vertical" title="Accordion (FAQ)" description="Daftar lipat tanya jawab umum seputar perizinan."}
::
