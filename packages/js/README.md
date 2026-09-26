# @majalengka/js

Perilaku kecil untuk komponen [`@majalengka/css`](../css/README.md): tabs, toast, tooltip, tombol buka/tutup, kotak OTP, dan polyfill dialog untuk browser lama.

Di bawah **3 kB gzip** (dijaga build), tanpa dependensi.

## Pasang

### Situs tanpa build step (WordPress, PHP, Laravel Blade)

```html
<script src="https://cdn.jsdelivr.net/npm/@majalengka/js/dist/majalengka.iife.js" defer></script>
```

Langsung aktif setelah halaman dimuat. Toast dipanggil lewat `Mjl.toast(...)`.

### Proyek dengan bundler (Vite, Nuxt, Next.js)

```js
import { init, toast } from '@majalengka/js'

init()
```

Aman di-import saat SSR, karena tidak ada yang menyentuh `document` sebelum `init()` dipanggil. Di Nuxt, taruh di plugin `.client.ts`.

Konten yang ditambahkan belakangan (navigasi SPA, AJAX) ikut aktif sendiri lewat `MutationObserver`. Matikan dengan `init(document, { observe: false })` kalau Anda ingin memanggil `init(elemen)` secara manual.

## Yang didapat

| Komponen | Markup | Perilaku |
|---|---|---|
| Tabs | `.mjl-tabs` > `.mjl-tab-list` + `.mjl-tab-panel` | ARIA lengkap, `←` `→` `Home` `End`, panel yang tidak aktif disembunyikan |
| Modal, Drawer | `<dialog>` + `<button commandfor command>` | Polyfill `commandfor`/`command` dan `closedby="any"` untuk browser lama |
| Tombol buka/tutup | `[data-mjl-toggle][aria-controls]` | Mengatur `hidden` pada target dan `aria-expanded` |
| Tooltip | `[data-mjl-tooltip="…"]` | Teks disambungkan lewat `aria-describedby`, `Esc` menutup |
| OTP / PIN | `[data-mjl-pin]` berisi `<input>` | Pindah kotak otomatis, `Backspace`, panah, tempel kode utuh |
| Toast | `toast({ title, description, variant })` | Live region, jeda saat hover/fokus, `danger` tidak hilang sendiri |

### Toast

```js
const t = toast({
  title: 'Permohonan terkirim',
  description: 'Nomor registrasi dikirim lewat SMS.',
  variant: 'success',   // success | info | warning | danger
  duration: 6000,       // 0 = tetap tampil; default 0 untuk danger
  closeLabel: 'Tutup notifikasi',
})

t.close()
```

### Event

Tabs memancarkan `mjl:tabchange` dengan `event.detail.index` setiap tab berganti.

## Tanpa JavaScript

Semua komponen tetap bisa dipakai tanpa script ini:

- Tanpa JS, semua panel tabs tampil berurutan, jadi isinya tidak hilang.
- Modal dan drawer tetap jalan di browser modern karena `commandfor` dan `closedby` sudah standar HTML.
- Tooltip tetap tampil saat hover dan fokus, hanya belum terbaca pembaca layar.

## Mengembangkan

```bash
bun run build
```

Build menjalankan type-check TypeScript dan gagal kalau versi `<script>` melebihi 3 kB gzip.
