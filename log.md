# Log Pengembangan

Catatan keputusan dan progres Majalengka Design System. Entri terbaru di atas.

## 2026-09-27

### Fase 4 selesai — paket Vue
- **Build ke `dist/`** (Vite library mode + deklarasi tipe `vue-tsc`), bukan source mentah lagi. `dist/index.js` 45.4 kB (10.5 kB gzip) untuk 42 komponen, `sideEffects: false` sehingga bisa di-tree-shake. `vue` dan `@majalengka/js` tidak dibundel.
- **`MjlFormField` menyambungkan sendiri** `id`, `for`, `aria-describedby` (teks bantuan + error), `aria-invalid`, dan `required` ke `MjlInput`/`MjlSelect`/`MjlTextarea`/`MjlFileUpload` lewat provide/inject. `id` jadi opsional. Teks bantuan tetap tampil saat error (pola GOV.UK). Slot props tetap ada untuk kontrol buatan sendiri.
- **`useId()` untuk semua id**: dua modal, dua field, atau dua TrustBanner di satu halaman tidak bentrok lagi.
- **Plugin `createMajalengka({ link })`**: `MjlButton`, `MjlLink`, `MjlCard`, `MjlBreadcrumb`, `MjlNavMenu`, dan `MjlHeader` memakai `RouterLink`/`NuxtLink` untuk tautan internal. Tautan eksternal, `mailto:`, `tel:`, dan `#` tetap `<a>`.
- **Bug diperbaiki**:
  - `MjlModal` tidak terbuka kalau `v-model` sudah `true` saat mount,
  - `MjlButton`: prop `to` tidak dipakai, `disabled` tidak berefek pada `<a>` (kini `href` dibuang), dan `aria-disabled="false"` selalu dirender,
  - `MjlStepper` memakai `div` → `<ol>` + teks "(selesai)" untuk pembaca layar,
  - `MjlPagination` merender semua halaman → elipsis dengan **jumlah tombol tetap** (7), supaya tombol tidak bergeser saat diklik,
  - `MjlAlert` memakai `role="region" aria-live` untuk semua alert → `live` opsional (`danger` → `alert`, lainnya → `status`), ditambah tombol tutup untuk `dismissible` yang sebelumnya tidak dirender,
  - `MjlFileUpload`: input tanpa nama → dibungkus `<label>`,
  - `MjlFormSummary`: fokus tidak pernah dipindahkan → fokus pindah saat error muncul, dan judul menjadi heading,
  - komentar HTML di akar template membuat komponen jadi multi-root di mode dev, sehingga atribut pemakai tidak diteruskan.
- **Komponen baru**: `MjlTabs` (WAI-ARIA, melewati tab disabled, `data-mjl-manual` agar tidak diambil alih `@majalengka/js`), `MjlDrawer`, dan `useToast()`.
- **Label ARIA bisa diganti lewat prop** (Pagination, Breadcrumb, Stepper, Modal, Drawer, NavMenu, Header, TrustBanner, Alert, Link, FormField). Default berbahasa Indonesia.
- **`title-as`** di `MjlCard`, `MjlEmptyState`, `MjlModal`, dan `MjlFormSummary`, supaya urutan heading halaman tetap benar.
- **CSS pendukung**: reset daftar untuk `<ol class="mjl-stepper">`, `.mjl-pagination__ellipsis`, `.mjl-alert__close`, `.mjl-file-upload__label`/`__hint` (border dropzone kini `border-input` 3:1), dan margin judul form summary.
- **`@majalengka/js`**: atribut `data-mjl-manual` untuk mengecualikan tabs yang dikelola framework.
- **Tes**: Vitest + happy-dom + axe-core, **30 tes**: wiring FormField, id unik, router link, tautan nonaktif, keyboard tabs, pagination di awal/tengah/akhir, stepper, modal sinkron v-model dan `dismissible=false`, alert role, fokus form summary, TrustBanner. Ditambah **10 uji di Edge** terhadap `dist/` (modal asli: fokus masuk, Esc, fokus kembali, klik di luar; tabs; pagination; form field; tanpa error konsol).
- **Docs**: contoh di halaman FormField **tidak pernah berfungsi** (memakai prop `hint`/`error` yang tidak ada) dan sudah diperbaiki; halaman Instalasi kini menjelaskan plugin router; `packages/vue/README.md` baru.
- **Root**: `bun run build` ikut membangun paket Vue, dan `bun run test` menjalankan tes Vue.
- **Status**: selesai, belum di-commit.

#### Catatan untuk Fase 5
- Halaman docs komponen belum punya demo Vue interaktif; props table di beberapa halaman (Button, Pagination, Stepper) belum mengikuti API baru.
- Pola dari template yang layak jadi komponen: kartu layanan, daftar langkah prosedur, daftar persyaratan, tombol ganti tema.
- `mjl-header` dan `mjl-footer` bentrok dengan `mjl-container` (lihat catatan template).

### Template: Portal Dinas Pendidikan (Nuxt 4 + UnoCSS)
- **Lokasi**: `templates/disdik/` (workspace baru `templates/*`). Jalankan dengan `bun run dev:disdik` di port 3001.
- **Konsep redesain** [disdik.majalengkakab.go.id](https://disdik.majalengkakab.go.id/), **bukan situs resmi**: ada pita keterangan di atas, `noindex`, lambang daerah dan foto tidak disalin. Isi (6 layanan, detail Legalisir Ijazah, alamat, jam, judul berita) diambil dari situs resmi pada September 2026. Layanan tanpa detail di sumber **tidak diberi syarat karangan**.
- **Arah redesain**:
  - layanan dulu, berita kemudian; pencarian di hero mencari layanan, termasuk kata kunci seperti "pkl" dan "ijazah hilang",
  - emoji diganti ikon Lucide,
  - berita nasional dan statistik pengunjung dibuang,
  - halaman detail layanan berisi "yang perlu dibawa", langkah bernomor, FAQ `<details>`, dan kotak ringkasan.
- **Halaman**: `/`, `/layanan` (bisa dicari lewat `?q=`), `/layanan/[slug]`, dan halaman error dengan `mjl-error-page`.
- **Stack**:
  - `@majalengka/css` untuk komponen,
  - `presetMajalengka({ preflight: false })` untuk utilitas token UnoCSS,
  - `presetIcons` + Lucide,
  - `@majalengka/js` untuk menu ponsel `<dialog commandfor>` dan toggle,
  - tema terang/gelap/otomatis disimpan di cookie supaya dirender server tanpa kedip.
- **Verifikasi**:
  - axe-core WCAG 2.2 AA: **0 pelanggaran** di 6 halaman × 2 tema (build produksi),
  - 12 alur pengguna lolos di Edge: skip link, pencarian, kata kunci, ganti tema dan tersimpan setelah reload, menu ponsel dengan Esc dan navigasi, serta pencarian dan detail yang tetap berfungsi **tanpa JavaScript**,
  - tidak ada scroll horizontal di 390px; tangkapan layar desktop/ponsel × terang/gelap rapi.
- **Docs**: halaman Template ditulis ulang. Sebelumnya halaman itu mendaftarkan 9 template yang tidak ada dan CLI `bun create majalengka-app` yang tidak pernah dibuat. Sekarang Disdik tercantum sebagai satu-satunya yang tersedia, yang lain ditandai "direncanakan", dan langkah menjalankannya bisa diikuti.
- **Pratinjau di docs**: halaman `/template/portal-dinas-pendidikan` dengan komponen `TemplatePreview.vue` (desktop diperkecil proporsional, tablet, ponsel ukuran asli, bisa diklik) dan tombol "Buka layar penuh" ke `/templates/disdik/`. Template di-*generate* statis lewat `bun run export:docs` (base `/templates/disdik/`) ke `docs/public/templates/` (di-gitignore), dan build docs menjalankannya otomatis sehingga ikut ter-deploy. Placeholder dipasang sebelum hydrate supaya iframe 1280px tidak sempat tampil terpotong. 9 uji di Edge lolos.
- **Status**: selesai, belum di-commit.

#### Temuan dari template (masukan untuk Fase 4–5)
- `presetIcons` tidak menemukan `@iconify-json/*` di `node_modules` bergaya isolated milik Bun; koleksi harus didaftarkan eksplisit. Perlu dicatat di docs UnoCSS.
- `mjl-header` dan `mjl-footer` punya padding sendiri, sehingga bentrok dengan `mjl-container` dan butuh `px-0`. Pertimbangkan: komponen shell tidak memberi padding horizontal, atau punya elemen `__inner`.
- Pola yang ditulis ulang di template dan layak jadi komponen: **kartu layanan** (ikon + judul + ringkasan + tautan), **daftar langkah bernomor** (prosedur, berbeda dari Stepper yang menunjukkan progres), **daftar persyaratan** bercentang, dan **tombol ganti tema**.
- Template tidak butuh kelas `mjl-btn--md` karena `md` sudah default, tapi banyak contoh di docs masih menuliskannya. Sederhanakan di Fase 5.

### Fase 3 selesai — perilaku tanpa framework
- **Prinsip: fitur native dulu, JS hanya pelengkap.** Modal, drawer, dan menu mobile memakai `<dialog>` dengan atribut standar `commandfor`/`command="show-modal"` dan `closedby="any"`, yang di browser modern jalan tanpa JavaScript.
- **Paket baru `@majalengka/js`** (2.53 kB gzip, batas build 3 kB, tanpa dependensi). Tersedia versi ESM (`import { init, toast }`) dan versi `<script>` (`Mjl.toast(...)`) untuk WordPress/PHP. Isinya:
  - polyfill `commandfor`/`command` dan `closedby` untuk browser lama (tidak dipasang kalau browser sudah mendukung),
  - tabs dengan pola WAI-ARIA: role, `aria-selected`, `aria-controls`, roving tabindex, `←` `→` `Home` `End`, event `mjl:tabchange`,
  - toast: live region `polite`, `danger` memakai `role="alert"` dan tidak hilang sendiri, timer berhenti saat hover/fokus (WCAG 2.2.1),
  - tooltip `data-mjl-tooltip`: teks disambungkan lewat `aria-describedby`, `Esc` menutup (WCAG 1.4.13),
  - tombol buka/tutup `data-mjl-toggle` + `aria-controls`,
  - kotak OTP `data-mjl-pin`: pindah otomatis, `Backspace`, panah, tempel kode utuh, `autocomplete="one-time-code"`,
  - `MutationObserver`, sehingga konten dari navigasi SPA atau AJAX ikut aktif. Aman di-import saat SSR.
- **CSS disesuaikan**:
  - drawer ditulis ulang untuk `<dialog>` + `::backdrop` (markup lama `.mjl-drawer-backdrop` tetap didukung),
  - modal dan nav drawer mendapat warna teks, latar, dan batas tinggi,
  - panel tab tampil semua tanpa JS (`[hidden]` diatur JS), jadi konten tidak pernah hilang,
  - tombol tutup toast 32×32px (sebelumnya `padding: 2px`, gagal WCAG 2.5.8), toast punya varian status, deskripsi 14px,
  - scroll halaman terkunci saat modal/drawer terbuka (`:root:has(:modal)`, tanpa JS),
  - token baru `bg.shimmer`, sehingga kilau skeleton tidak lagi putih 40% di mode gelap.
- **Docs**:
  - plugin `majalengka.client.ts` menjalankan `init()`, jadi semua demo interaktif,
  - halaman Modal, Drawer, Toast (komponen `ToastDemo.vue`), Tabs, TrustBanner, dan PinInput ditulis ulang dengan markup baru. `maxlength="1"` di contoh OTP dihapus karena menghalangi kotak ditimpa,
  - instalasi dan README menyebut `@majalengka/js`,
  - klaim ukuran diganti batas yang dijaga build ("di bawah 9.5 kB gzip"), supaya tidak basi tiap ada perubahan kecil.
- **Build**: `build:js` di root; build docs ikut membangun paket JS (penting untuk deploy Cloudflare Pages).
- **Verifikasi (Edge + puppeteer-core, klik dan keyboard sungguhan)**:
  - 33 uji perilaku lolos di mode native **dan** 33 lagi di mode polyfill (dukungan `command`/`closedBy` dihapus dari browser untuk meniru browser lama),
  - 13 uji di situs docs lolos: atribut MDC lolos utuh, modal/drawer/tabs/toggle/toast/OTP interaktif, tabs aktif setelah navigasi SPA, tanpa error JS,
  - screenshot modal (terang) dan drawer (gelap) di docs tampil rapi,
  - build token, CSS, JS, dan `vue-tsc` hijau. CSS 55.2 kB / 8.7 kB gzip.
- **Insiden kecil**: helper patch sempat menulis dengan encoding cp1252 dan mengosongkan `tabs.md`. File dipulihkan dari git, dan helper diperbaiki (UTF-8, tulis ke file sementara lalu ganti).
- **Status**: selesai, belum di-commit.

#### Catatan untuk fase berikutnya
- Komponen Vue belum memakai pola baru. `MjlModal` masih memakai `watch` tanpa `immediate`, dan belum ada `MjlTabs` atau `MjlToast`. Masuk Fase 4.
- Select kustom, file upload, dan accordion belum punya state error/disabled lengkap.
- Label bawaan JS berbahasa Indonesia ("Tutup notifikasi", "Digit 1 dari 6"). Toast sudah bisa diganti lewat `closeLabel`, label OTP bisa lewat `aria-label` di markup.
- Di docs, judul demo modal/drawer memakai `<div>` karena Docus mengubah `<h3>` jadi heading ber-anchor. Contoh kode untuk pengguna tetap `<h3>`.

### Fase 2 selesai — CSS inti
- **Keputusan: tidak memasang `@layer` di dalam file CSS** (berbeda dari rencana awal). Gaya berlayer selalu kalah dari CSS tak berlayer, jadi aturan tema WordPress seperti `button { background: gray }` akan menimpa komponen. Sebagai gantinya:
  - setiap selektor dibuat rata: satu kelas plus pseudo-state, tanpa `button.mjl-btn`, tanpa `!important`,
  - pengguna Tailwind v4 memakai `@import "@majalengka/css" layer(components)`. Sudah diuji dengan Tailwind v4.3.3: `rounded-none` menang atas `.mjl-btn`.
- **Migrasi mekanis di 39 file**:
  - 259 fallback hex di `var()` dihapus,
  - 36 nama variabel lama diganti nama semantik, dan aliasnya dihapus dari token (`tokens.css` 18.3 → 12.4 kB),
  - selektor ganda berbasis elemen dan semua `!important` dihapus.
- **Primitive → semantik**: sekitar 50 pemakaian dipetakan sesuai konteks. Yang tersisa sengaja berwarna tetap: footer, chip, spinner putih, thumb switch.
- **Token semantik baru**: `bg.brand-subtle`, `bg.inverse`, `bg.backdrop`, `border.input-hover`, `border.brand-subtle`. Total 50 token × 2 mode, dan 102 pasangan kontras lolos.
- **File baru `base.css`** (hanya berlaku untuk elemen berkelas `mjl-*`):
  - `box-sizing`,
  - cincin fokus `:focus-visible` 2px memakai `outline`, sehingga tetap terlihat di mode kontras tinggi Windows,
  - `prefers-reduced-motion` global,
  - `.mjl-sr-only`.
- **`reset.css` jadi opsional** dan tidak lagi masuk `majalengka.css`. Isinya kini mencakup gaya `body` (latar, teks, mode gelap) untuk situs baru.
- **Bug diperbaiki**:
  - fokus Tabs hilang (`ring:` bukan properti CSS); fokus kini digambar ke dalam karena daftar tab bisa di-scroll,
  - state loading tombol: spinner memakai `--_fg`, bukan `currentColor` yang transparan,
  - tombol dan input `md` 44px, `lg` 52px, dan input 16px supaya iOS tidak zoom,
  - fokus input memakai `--mjl-border-focus`; state error (`--error` atau `aria-invalid`) tidak tertimpa hover; state disabled ditambahkan,
  - Badge didefinisikan dua kali (`badge.css` dan `alert.css`), sehingga ukuran `sm`/`lg` tidak pernah berfungsi,
  - skip link memakai outline mangga (2.13:1, gagal 3:1) dan kini memakai cincin fokus standar,
  - varian pill Tabs memakai `bg-elevated` yang sejak Fase 1 sama dengan putih, sehingga tab aktif tidak terlihat; diganti `bg-sunken`,
  - thumb switch aktif di mode gelap hanya sekitar 2.4:1; kini memakai `action-primary-fg`,
  - pagination kini mendukung `aria-current="page"` dan state disabled.
- **Tombol memakai variabel lokal** (`--_bg`, `--_fg`, `--_hover`, `--_active`). Varian cukup mengisi variabel, dan `.mjl-btn` tanpa varian otomatis tampil sebagai tombol primer.
- **Build CSS baru** (Lightning CSS, target Chrome 90, Safari 14, Firefox 90, Samsung 15). Build gagal kalau:
  - ada properti tidak dikenal (dicek ke `known-css-properties`),
  - ada `var(--mjl-*)` yang tidak terdefinisi,
  - ada file komponen yang belum didaftarkan,
  - ukurannya melewati batas.

  Properti palsu, variabel tak terdefinisi, dan sintaks rusak sudah diuji dengan sengaja. Ketiganya menggagalkan build, dan pesan error menyebut file komponen yang tepat.
- **Paket dipecah**: `majalengka.css` (lengkap), `core.css` (token, base, tipografi, layout), `reset.css`, dan `components/*.css` (38 file).
- **Ukuran**: 66.2 kB → **54.0 kB** minified, 9.65 kB → **8.5 kB** gzip. `core.min.css` 13.3 kB / 2.5 kB. Batas baru 58 kB **dan** 9.5 kB (bukan salah satu). Klaim "< 35 kB" di README dan docs diperbaiki.
- **Verifikasi**:
  - halaman uji mode terang dan gelap di Obscura dan Edge headless. Spinner di tengah dan fokus tab tampil benar di Edge; di Obscura keduanya tidak tampil karena mesin rendernya belum mendukung `inset` dan fokus programatik,
  - docs HTTP 200. Tombol `<a>` di halaman Card tetap putih di atas #0014A8 tanpa `!important`, walau dicampur kelas prosa Docus,
  - `vue-tsc` lolos.
- **Dokumentasi**: `packages/css/README.md` baru (cara pakai untuk situs baru, WordPress, dan Tailwind; menimpa gaya; aksesibilitas bawaan). `packages/tokens/README.md` diperbarui.
- **Kecil**: build CSS tidak lagi menghapus seluruh `dist/`, karena dev server docs sempat error 500 (ENOENT) saat file hilang sesaat.
- **Status**: selesai, belum di-commit.

#### Catatan untuk fase berikutnya
- Shimmer skeleton masih putih 40% di mode gelap, sehingga terlalu terang.
- `@keyframes mjl-spin` ada di `button.css` dan `misc.css`. Disengaja supaya file komponen satuan tetap mandiri.
- Beberapa komponen belum punya state disabled atau error lengkap (select kustom, file upload, accordion). Masuk Fase 3 bersama perilakunya.
- Halaman docs masih memakai contoh `mjl-btn--md` dan `mjl-badge--md`. Keduanya tetap valid karena sama dengan default, tapi bisa disederhanakan di Fase 5.

### Fase 1 selesai — pipeline token
- **Satu sumber**: `build.ts` sekarang membaca `semantic/light.json` dan `dark.json`. Resolver referensi `{...}` ada di `src/model.ts` dan dipakai build maupun preset UnoCSS. Tidak ada lagi token yang ditulis manual di template string.
- **Pengaman di build** (diuji dengan sengaja menggagalkan):
  - kunci `light.json` dan `dark.json` wajib sama,
  - referensi yang hilang atau melingkar ditolak,
  - 92 pasangan kontras di `src/contrast.json` dicek di kedua mode (4.5:1 teks, 3:1 elemen UI).
- **Warna**:
  - `primary-700` tetap #0014A8, skala biru tidak diubah (jarak kecerahan OKLCH 200→700 sudah rata, sekitar 10 poin per tingkat).
  - `neutral-500` #97A0B2 → #80899C dan `neutral-600` #6B7488 → #636C80, agar border input dan teks sekunder lolos kontras.
  - Palet primitive baru: `night` (permukaan gelap), serta ramp `success`/`warning`/`danger`/`info`.
- **Token semantik**: 45 token × 2 mode, termasuk `--mjl-status-*` dan `--mjl-action-danger-*` yang kini punya varian gelap. `border.input` naik dari 1.29:1 ke 3.51:1 (terang) dan dari 1.47:1 ke 3.34:1 (gelap).
- **Mode gelap**: `data-theme="dark"`/`.dark` (selalu), `data-theme="auto"` (ikut sistem, opt-in), `data-theme="light"`/`.light` (paksa terang). `color-scheme` ikut diatur.
- **Output baru**: `tokens.json`, `tailwind.css` (Tailwind v4, `@theme inline`), dan `preset.js` yang dibundel dari satu sumber dengan preflight variabel CSS (bisa dimatikan).
  - Diverifikasi dengan Tailwind v4.3.3: semua utilitas terbentuk, termasuk opasitas `/50` dan breakpoint `mjl-md:`.
  - Diverifikasi dengan UnoCSS: 16/16 kelas uji cocok.
- **Preset UnoCSS**: shortcut memakai token semantik sehingga ikut mode gelap. `mjl-btn-md` dan `mjl-input` sekarang 44px, input 16px (tidak memicu zoom di iOS), dan ada `mjl-btn-danger` baru.
- **Kompatibilitas**: 36 nama lama (`--mjl-color-surface-*`, `--mjl-color-status-*`, dan lainnya) tetap tersedia sebagai alias deprecated, dan sekarang ikut mode gelap. Semua variabel yang dipakai `@majalengka/css` terdefinisi.
- **Perbaikan kecil di `@majalengka/css`**:
  - tombol danger memakai `--mjl-action-danger-*` (hover `#8C1D18` yang di-hardcode dihapus),
  - chip dikunci ke primitive supaya tidak berubah di mode gelap,
  - `--mjl-motion-fast` yang tidak pernah ada diganti `--mjl-duration-fast`.
- **Dokumentasi**: `packages/tokens/README.md` berisi kontrak token publik, cara pakai per stack, dan aturan mode gelap.
- **Verifikasi visual**: screenshot Obscura mode terang dan gelap berdampingan (tombol, input, badge, alert, link).
- **Verifikasi docs**: `bun run dev` di `docs/` jalan tanpa error, halaman komponen dan fondasi tampil (HTTP 200).
- **Status**: selesai, belum di-commit.

#### Catatan untuk Fase 2
- `majalengka.min.css` naik dari 57.5 kB ke 66.2 kB (gzip 9.1 → 9.65 kB), karena alias lama ditulis per blok tema dan blok gelap muncul dua kali (`.dark` dan `auto`). Setelah alias dihapus di Fase 2, ukurannya akan turun.
- Border tombol outline di mode terang masih memakai `border-line` yang tipis. Pindahkan ke `--mjl-border-brand` atau `--mjl-action-secondary-border`.
- Komponen masih memakai primitive langsung di 13 tempat (misalnya fokus input `--mjl-color-primary-700`), sehingga belum ikut mode gelap.
- Docs (`ColorPaletteDemo.vue`, `app.css`, halaman warna) masih menampilkan nilai neutral lama dan palet oklch manual. Masuk Fase 5.

### Keputusan
- **Warna dasar dikunci**: `primary-700 = #0014A8` (Biru Majalengka) tetap jadi jangkar palet. Skala biru lain diturunkan di sekitarnya, bukan menggantinya.
- **Mode gelap tidak memakai #0014A8 untuk isian** (kontrasnya 1.39:1 di latar gelap). Identitas biru dibawa oleh tint terang dari hue yang sama: tombol `#94A3FF` dengan teks `#00073A` (8.19:1).
- **Hover tombol primer dibuat lebih terang** (`#2434D6`), bukan lebih gelap. `#001086` dibanding `#0014A8` hanya 1.17:1, jadi perubahannya nyaris tidak terlihat.
- **API publik = token semantik** (`--mjl-bg-*`, `--mjl-text-*`, `--mjl-border-*`, `--mjl-action-*`, `--mjl-status-*`). Token primitive dianggap internal.
- **Mode gelap otomatis bersifat opt-in** (`data-theme="auto"`) supaya situs yang temanya terang tidak ikut berubah gelap tanpa sengaja.
- **Resolver token ditulis sendiri** (tanpa Style Dictionary) supaya paket tetap ringan dan tanpa dependensi.

### Rencana v1 (dari audit design system)
| Fase | Isi | Status |
|---|---|---|
| 0 | Kontrak token publik, aturan mode gelap, buang alias lama | Digabung ke Fase 1 |
| 1 | Pipeline token: JSON satu sumber, resolver alias, varian gelap status, cek kontras di build, output CSS/JSON/Tailwind/UnoCSS/TS dari satu sumber | **Selesai** |
| 2 | CSS inti: selektor rata tanpa `!important` (`@layer` diganti `layer(components)` saat import), hapus fallback hex, focus-visible dan reduced-motion global, target 44px, paket CSS dipecah, Lightning CSS, budget jujur | **Selesai** |
| 3 | Perilaku tanpa framework: `<dialog>` + `commandfor`, `<details>`, paket `@majalengka/js` < 3 kB (tabs, toast, tooltip, toggle, OTP, polyfill dialog) | **Selesai** |
| 4 | Paket Vue: build ke `dist`, `useId()`, FormField otomatis, plugin router, MjlTabs/MjlDrawer/useToast, label ARIA bisa diganti, 30 tes | **Selesai** |
| 5 | Docs memakai token sendiri, halaman untuk semua komponen, CI (build, kontras, vue-tsc, axe), Changesets, rilis v0.2.0-beta | Berikutnya |

### Temuan audit yang jadi dasar rencana
- `semantic/light.json` dan `dark.json` diimpor tapi tidak dipakai `build.ts`. Token semantik di-hardcode dan nilainya sudah menyimpang dari JSON.
- Logika preset UnoCSS ditulis dua kali, dan shortcut-nya memakai primitive sehingga tidak ikut mode gelap.
- Kontras yang gagal: border input 1.29:1 (terang) dan 1.47:1 (gelap), `text-muted` 2.63:1, hover/active tombol primer gelap 3.50 dan 2.35:1, teks error di mode gelap 2.69:1.
- Bug CSS: fokus Tabs hilang (`ring:` bukan properti CSS), state loading tombol rusak karena `!important`, tombol dan input `md` 40px padahal klaimnya 44px.
- CSS minified 57.5 kB, sedangkan README mengklaim < 35 kB. Budget lolos hanya karena syaratnya memakai `||`.
- Belum ada CI, test, changelog, dan paket Vue masih mengirim source mentah.
