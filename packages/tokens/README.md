# @majalengka/tokens

Token desain Majalengka Design System. Satu sumber (JSON format W3C DTCG), dipakai dari CSS polos, Tailwind v4, UnoCSS, atau JavaScript.

Warna brand: **#0014A8** (Biru Majalengka).

## Pakai yang mana?

| Proyek | Muat | Contoh |
|---|---|---|
| HTML, PHP, WordPress, Laravel | `@majalengka/tokens/css` | `background: var(--mjl-action-primary-bg)` |
| Tailwind CSS v4 | `css` + `tailwind` | `bg-mjl-action-primary-bg p-mjl-4` |
| UnoCSS | `presetMajalengka()` | `bg-mjl-action-primary-bg p-mjl-4` |
| JS/TS, Figma, alat lain | `@majalengka/tokens` atau `/json` | `semantic.light["text-default"]` |

### CSS polos

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@majalengka/tokens/dist/tokens.css">
```

### Tailwind v4

```css
@import "tailwindcss";
@import "@majalengka/tokens/css";
@import "@majalengka/tokens/tailwind";
```

### UnoCSS

```ts
import { presetWind3 } from 'unocss'
import { presetMajalengka } from '@majalengka/tokens/preset'

export default defineConfig({
  presets: [presetWind3(), presetMajalengka()],
})
```

Preset ini sudah menyuntikkan variabel CSS-nya. Kalau `tokens.css` sudah Anda muat sendiri, pakai `presetMajalengka({ preflight: false })`.

## Token publik

Pakai **token semantik** di komponen. Nilainya berubah sendiri saat mode gelap aktif.

| Grup | Variabel | Untuk |
|---|---|---|
| Latar | `--mjl-bg-canvas` `base` `elevated` `sunken` `tint` `brand-subtle` `inverse` `backdrop` | Halaman, kartu, dropdown, area cekung, hover, baris terpilih, tooltip, di belakang modal |
| Teks | `--mjl-text-strong` `default` `subtle` `muted` `inverse` `brand` `brand-hover` | `muted` khusus teks nonaktif |
| Garis | `--mjl-border-line` `hairline` `input` `input-hover` `focus` `brand` `brand-subtle` `danger` | `input` dan `input-hover` selalu ≥ 3:1 terhadap latar |
| Aksi | `--mjl-action-{primary,secondary,danger}-{bg,hover,active,fg}` | Tombol. `primary-ring` untuk cincin fokus |
| Status | `--mjl-status-{success,warning,danger,info}-{bg,border,fg}` | Alert, badge, pesan error |
| Aksen | `--mjl-accent-mango` | Dekoratif saja, jangan untuk teks |

Token lain (spasi, radius, tipografi, bayangan, gerak, z-index) tidak berubah per mode: `--mjl-space-4`, `--mjl-radius-md`, `--mjl-text-sm-size`, `--mjl-font-title`, `--mjl-shadow-md`, `--mjl-duration-fast`, `--mjl-layer-modal`, `--mjl-touch-min`.

Warna primitive (`--mjl-color-primary-700` dan sejenisnya) tersedia, tapi **tidak ikut mode gelap**. Pakai hanya kalau memang butuh warna yang tetap.

## Mode gelap

Default-nya selalu terang, jadi situs yang belum siap mode gelap tidak ikut berubah.

```html
<html data-theme="dark">   <!-- selalu gelap (class="dark" juga bisa) -->
<html data-theme="auto">   <!-- ikut pengaturan sistem -->
<section data-theme="light"> <!-- paksa terang di dalam area gelap -->
```

Di mode gelap, #0014A8 tidak dipakai untuk isian karena kontrasnya hanya 1.39:1 terhadap latar gelap. Tombol primer memakai `#94A3FF` dengan teks `#00073A` (8.2:1), yang masih satu hue dengan warna brand.

## Mengubah token

1. Sunting `src/global/*.json` (primitive) atau `src/semantic/{light,dark}.json` (semantik).
2. `bun run build`

Build akan gagal kalau:
- `light.json` dan `dark.json` tidak punya kunci yang sama,
- ada referensi `{...}` yang tidak ditemukan atau melingkar,
- ada pasangan warna di `src/contrast.json` yang di bawah batas WCAG (4.5:1 teks, 3:1 elemen UI) di salah satu mode.

Semua file di `dist/` dibuat otomatis. Jangan disunting manual.
