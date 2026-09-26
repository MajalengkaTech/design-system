/**
 * Data layanan publik. Nama dan ringkasan diambil dari
 * https://disdik.majalengkakab.go.id/layanan-publik (September 2026).
 * Hanya Legalisir Ijazah yang detailnya tersedia di sumber; layanan lain
 * sengaja dibiarkan tanpa syarat/alur supaya template tidak memuat info karangan.
 */

export interface Layanan {
  slug: string
  nama: string
  ringkas: string
  ikon: string
  /** Kata lain yang dipakai warga saat mencari, mis. "PKL" untuk magang */
  kataKunci: string[]
  sumber: string
  detail?: {
    biaya: string
    manfaat: string[]
    syarat: string[]
    alur: string[]
    faq: { tanya: string, jawab: string }[]
  }
}

const SUMBER = 'https://disdik.majalengkakab.go.id/layanan-publik'

export const layanan: Layanan[] = [
  {
    slug: 'legalisir-ijazah',
    nama: 'Legalisir Ijazah',
    ringkas: 'Pengesahan fotokopi ijazah atau STTB dengan tanda tangan dan cap basah dinas.',
    ikon: 'i-lucide-stamp',
    kataKunci: ['ijazah', 'sttb', 'legalisasi', 'cap', 'fotokopi'],
    sumber: `${SUMBER}/legalisir-ijazah`,
    detail: {
      biaya: 'Gratis',
      manfaat: ['Fotokopi ijazah atau STTB mendapat tanda tangan dan cap basah dinas untuk kelengkapan berkas.'],
      syarat: [
        'Fotokopi ijazah atau STTB yang akan dilegalisir, sebanyak yang diperlukan.',
        'Ijazah atau STTB asli.',
        'Fotokopi KTP atau KTA, 1 lembar.',
      ],
      alur: [
        'Untuk sekolah di wilayah Kabupaten Majalengka, fotokopi ijazah atau STTB dilegalisir lebih dulu oleh kepala sekolah.',
        'Bawa fotokopi ijazah atau STTB, ijazah asli, dan fotokopi KTP atau KTA ke Sekretariat Dinas Pendidikan.',
        'Serahkan berkas kepada petugas di Sekretariat.',
        'Tunggu petugas mencocokkan fotokopi dengan ijazah asli.',
        'Ambil kembali berkas yang sudah dilegalisir beserta ijazah asli.',
      ],
      faq: [{ tanya: 'Apakah layanan ini dipungut biaya?', jawab: 'Tidak. Layanan legalisir ijazah gratis.' }],
    },
  },
  {
    slug: 'ppdb',
    nama: 'PPDB',
    ringkas: 'Penerimaan peserta didik baru jenjang SD dan SMP.',
    ikon: 'i-lucide-school',
    kataKunci: ['pendaftaran', 'sekolah baru', 'spmb', 'daftar sekolah', 'zonasi'],
    sumber: `${SUMBER}/ppdb`,
  },
  {
    slug: 'aktivasi-dapodik',
    nama: 'Aktivasi Dapodik',
    ringkas: 'Aktivasi akun aplikasi Data Pokok Pendidikan untuk satuan pendidikan.',
    ikon: 'i-lucide-database',
    kataKunci: ['dapodik', 'operator', 'akun sekolah', 'data pokok'],
    sumber: `${SUMBER}/aktivasi-dapodik`,
  },
  {
    slug: 'surat-keterangan-pengganti-ijazah',
    nama: 'Surat Keterangan Pengganti Ijazah',
    ringkas: 'Surat pengganti untuk ijazah yang hilang atau rusak.',
    ikon: 'i-lucide-file-badge',
    kataKunci: ['ijazah hilang', 'ijazah rusak', 'pengganti', 'skpi'],
    sumber: `${SUMBER}/surat-keterangan-pengganti-ijazah`,
  },
  {
    slug: 'pengesahan-kurikulum',
    nama: 'Pengesahan Kurikulum',
    ringkas: 'Pengesahan dokumen kurikulum satuan pendidikan.',
    ikon: 'i-lucide-book-check',
    kataKunci: ['kurikulum', 'kosp', 'dokumen sekolah'],
    sumber: `${SUMBER}/pengesahan-kurikulum`,
  },
  {
    slug: 'layanan-magang-pkl',
    nama: 'Magang dan PKL',
    ringkas: 'Permohonan magang atau praktik kerja lapangan di Dinas Pendidikan.',
    ikon: 'i-lucide-briefcase',
    kataKunci: ['magang', 'pkl', 'praktik kerja', 'prakerin', 'mahasiswa'],
    sumber: `${SUMBER}/layanan-magang-pkl`,
  },
]

export function cariLayanan(q: string): Layanan[] {
  const kata = q.toLowerCase().trim()
  if (!kata) return layanan
  return layanan.filter(l =>
    [l.nama, l.ringkas, ...l.kataKunci].some(teks => teks.toLowerCase().includes(kata)),
  )
}
