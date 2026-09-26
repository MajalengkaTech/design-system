/**
 * Informasi kontak, menu, dan berita. Diambil dari beranda
 * https://disdik.majalengkakab.go.id/ (September 2026).
 */

export const RESMI = 'https://disdik.majalengkakab.go.id'

export const kontak = {
  alamat: 'Jl. Raya K.H. Abdul Halim No. 233, Majalengka, Jawa Barat 45418',
  email: 'disdik@majalengkakab.go.id',
  whatsapp: '0821-2932-0393',
  whatsappUrl: 'https://wa.me/6282129320393',
  jam: [
    { hari: 'Senin – Jumat', waktu: '07.30 – 16.00 WIB' },
    { hari: 'Sabtu, Minggu, dan hari libur', waktu: 'Tutup' },
  ],
}

export const menu = [
  { label: 'Layanan', to: '/layanan' },
  { label: 'Publikasi', to: `${RESMI}/publikasi` },
  { label: 'Profil', to: `${RESMI}/profile/dinas` },
  { label: 'PPID', to: `${RESMI}/ppid/profile-ppid` },
  { label: 'Hallo Disdik', to: `${RESMI}/hallo-disdik` },
]

export const bidang = [
  { nama: 'PAUD dan Pendidikan Masyarakat', singkat: 'PAUD & Dikmas', ikon: 'i-lucide-blocks', to: `${RESMI}/profile/bidang-pauddikmas` },
  { nama: 'Sekolah Dasar', singkat: 'SD', ikon: 'i-lucide-pencil', to: `${RESMI}/profile/bidang-sd` },
  { nama: 'Sekolah Menengah Pertama', singkat: 'SMP', ikon: 'i-lucide-backpack', to: `${RESMI}/profile/bidang-smp` },
  { nama: 'Guru dan Tenaga Kependidikan', singkat: 'GTK', ikon: 'i-lucide-users', to: `${RESMI}/profile/bidang-gtk` },
]

/** Bulan diperkirakan dari keterangan "n bulan yang lalu" di situs sumber. */
export const berita = [
  {
    judul: 'Upacara Peringatan Hari Pendidikan Nasional Tahun 2026 Kabupaten Majalengka',
    kategori: 'Dinas',
    bulan: 'Mei 2026',
    url: `${RESMI}/publikasi/upacara-peringatan-hari-pendidikan-nasional-tahun-2026-kabupaten-majalengka`,
  },
  {
    judul: 'Pembinaan Minat, Bakat, dan Kreativitas Siswa 2026 Jenjang SD Cabang Gambar Ekspresi, Kriya, dan Menulis Cerita',
    kategori: 'PMBK',
    bulan: 'Mei 2026',
    url: `${RESMI}/publikasi/pembinaan-minat-bakat-dan-kreativitas-siswa-2026-jenjang-sd-cabang-gambar-ekspresi-kriya-dan-menulis-cerita`,
  },
  {
    judul: 'Dokumentasi Kegiatan Sosialisasi SPBM Jenjang SD 2026',
    kategori: 'SD',
    bulan: 'Mei 2026',
    url: `${RESMI}/publikasi/dokumentasi-kegiatan-sosialisasi-spbm-jenjang-sd-2026`,
  },
  {
    judul: 'Prestasi Dinas Pendidikan pada Ajang BPMP Jawa Barat Award Tahun 2025',
    kategori: 'Dinas',
    bulan: 'Februari 2026',
    url: `${RESMI}/publikasi/prestasi-dinas-pendidikan-pada-ajang-bpmp-jawa-barat-award-tahun-2025`,
  },
]
