# Template: Portal Dinas Pendidikan

Konsep redesain [disdik.majalengkakab.go.id](https://disdik.majalengkakab.go.id/) dengan **Nuxt 4**, **UnoCSS**, dan Majalengka Design System.

> Ini konsep, **bukan situs resmi**. Halamannya memasang `noindex` dan pita keterangan di bagian atas. Isi (nama layanan, syarat legalisir ijazah, alamat, judul berita) diambil dari situs resmi pada September 2026. Lambang daerah dan foto tidak disalin.

## Menjalankan

```bash
# dari root repo
bun install
bun run dev:disdik      # http://localhost:3001
```

Build produksi:

```bash
cd templates/disdik
bun run build
node .output/server/index.mjs
```

## Halaman

| Rute | Isi |
|---|---|
| `/` | Hero dengan pencarian layanan, kantor layanan, 6 layanan publik, bidang per jenjang, kabar terbaru, ajakan Hallo Disdik |
| `/layanan` | Daftar layanan, bisa dicari (`?q=ijazah`) |
| `/layanan/[slug]` | Syarat, langkah-langkah, FAQ, ringkasan biaya dan tempat |

Hanya **Legalisir Ijazah** yang detailnya tersedia di situs sumber. Layanan lain sengaja tidak diberi syarat karangan; halamannya menautkan ke halaman resmi.

## Yang berubah dibanding situs asli

- **Layanan dulu, berita kemudian.** Pencarian di hero mencari layanan, bukan berita, karena warga datang untuk mengurus sesuatu.
- **Ikon Lucide menggantikan emoji.** Emoji ikut dibacakan pembaca layar dan tampilannya berbeda di tiap perangkat.
- **Yang tidak membantu warga dibuang**: berita nasional dari portal lain dan statistik pengunjung.
- **Detail layanan siap dipakai**: daftar "yang perlu dibawa", langkah bernomor, dan jam serta alamat di satu kotak ringkasan.

## Cara design system dipakai

| Lapisan | Dipakai untuk |
|---|---|
| `@majalengka/css` | Komponen: `mjl-header`, `mjl-nav-menu`, `mjl-nav-drawer`, `mjl-card`, `mjl-btn`, `mjl-input`, `mjl-badge`, `mjl-breadcrumb`, `mjl-accordion`, `mjl-alert`, `mjl-footer`, `mjl-trust-banner`, `mjl-skip-link`, `mjl-error-page` |
| `@majalengka/tokens/preset` | Utilitas UnoCSS dari token: `bg-mjl-bg-brand-subtle`, `text-mjl-text-strong`, `text-mjl-2xl`, `rounded-mjl-lg` |
| `@majalengka/js` | Menu ponsel (`<dialog commandfor>`), tombol "Selengkapnya" di pita keterangan |
| Nuxt | Tema terang/gelap disimpan di cookie supaya server langsung merender tema yang benar |

`uno.css` dimuat setelah `@majalengka/css`, jadi utilitas bisa menimpa kelas komponen (mis. `mjl-header px-0`).

## Catatan UnoCSS di Bun workspace

`presetIcons` tidak menemukan `@iconify-json/lucide` secara otomatis di `node_modules` bergaya isolated milik Bun. Koleksinya didaftarkan eksplisit di `uno.config.ts`:

```ts
presetIcons({
  collections: {
    lucide: () => import('@iconify-json/lucide/icons.json', { with: { type: 'json' } }).then(i => i.default),
  },
})
```

## Hasil pemeriksaan

- **axe-core, WCAG 2.2 AA**: 0 pelanggaran di 6 halaman × 2 tema (build produksi).
- **Alur pengguna** (Edge, keyboard sungguhan): skip link, pencarian, ganti tema, menu ponsel, dan halaman yang tetap berfungsi **tanpa JavaScript**.
- Tidak ada scroll horizontal di lebar 390px.
