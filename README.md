# Majalengka Design System

> Design system open-source untuk ekosistem web Majalengka.tech (`MajalengkaTech/design-system`) — bukan produk resmi Pemkab Majalengka.

Repositori ini adalah sumber kebenaran tunggal (*single source of truth*) untuk seluruh aset antarmuka digital, standar aksesibilitas, token desain, dan pustaka komponen bagi instansi, komunitas, media lokal, dan UMKM digital yang ingin membangun portal layanan di Majalengka.

---

## Arsitektur Monorepo

```
majalengka-tech/design-system
├── packages/
│   ├── tokens/      # Sumber token W3C DTCG JSON + build pipeline CSS/TS
│   ├── css/         # Paket CSS murni (@majalengka/css), siap pakai tanpa build di sisi pemakai (~9 kB gzip)
│   └── vue/         # Komponen Vue 3 + TypeScript (@majalengka/vue), dirilis sebagai ESM + .d.ts
├── docs/            # Website dokumentasi resmi berbasis Docus (Nuxt 4 + Nuxt Content)
└── majalengka-design-system/ # Bundle pengetahuan terbuka OKF (Open Knowledge Format) v0.2
```

---

## Cara Penggunaan Cepat

### 1. Jalur CSS Murni (HTML / PHP / WordPress / Laravel)
Gunakan langsung via link CDN tanpa instalasi Node.js apa pun:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@majalengka/css@latest/dist/majalengka.min.css">

<a href="#konten" class="mjl-skip-link">Langsung ke konten</a>
<button type="button" class="mjl-btn mjl-btn--primary mjl-btn--md">
  Kirim Permohonan
</button>
```

### 2. Jalur Vue 3 & Nuxt
```bash
bun add @majalengka/vue @majalengka/css
```

```vue
<script setup lang="ts">
import { MjlTrustBanner, MjlButton, MjlFormField, MjlInput } from '@majalengka/vue';
import '@majalengka/css';
</script>

<template>
  <MjlTrustBanner owner="Dinas Komunikasi dan Informatika Kab. Majalengka" />
  <MjlFormField id="nik" label="NIK Warga" required>
    <MjlInput id="nik" placeholder="16 digit sesuai KTP" />
  </MjlFormField>
  <MjlButton variant="primary">Cek Data</MjlButton>
</template>
```

---

## Pengembangan

Semua perintah dijalankan dari root repo (Bun workspaces):

```bash
bun install          # pasang dependensi seluruh workspace
bun run check        # build token + CSS, typecheck, unit test, dan build paket Vue
bun run dev          # dev server dokumentasi di http://localhost:3000
bun run build:docs   # build situs dokumentasi
```

| Perintah | Isi |
|---|---|
| `bun run build:tokens` | `packages/tokens/src/**/*.json` → `dist/tokens.css`, `tokens-dark.css`, ekspor TS, preset UnoCSS |
| `bun run build:css` | Gabung + minify (Lightning CSS) → `dist/majalengka(.min).css`; **gagal** bila anggaran ukuran terlampaui |
| `bun run typecheck` / `bun run test` | `vue-tsc` dan Vitest untuk `@majalengka/vue` |
| `bun run build:vue` | Vite library build → `dist/index.js` + deklarasi `.d.ts` |

CI (`.github/workflows/ci.yml`) menjalankan `bun run check` dan build dokumentasi di setiap PR.

### Anggaran ukuran CSS

`@majalengka/css` wajib memenuhi **kedua** batas berikut (dicek otomatis saat build):

| Ukuran | Batas | Saat ini (v0.1.0) |
|---|---|---|
| Minified | < 64 kB | ±57 kB |
| Gzip (yang benar-benar lewat jaringan) | < 12 kB | ±9 kB |

---

## Prinsip Desain
1. **Aksesibel Sejak Awal**: Kepatuhan penuh WCAG 2.1 Level AA (kontras minimal 4.5:1, target sentuh 44×44px, navigasi keyboard penuh).
2. **Framework-Agnostic**: Mudah dipakai di aplikasi warisan (PHP polos) hingga framework frontend mutakhir.
3. **Kredibel & Tepercaya**: Menggunakan warna primer Biru Majalengka (`#0014A8`), aksen Kuning Mangga (`#F0A202`), dan pita identitas pengelola `TrustBanner` yang diisi sendiri oleh pemakainya — bukan klaim afiliasi bawaan.

---

## Lisensi
Didistribusikan di bawah lisensi [MIT](LICENSE) oleh Komunitas Majalengka.tech.