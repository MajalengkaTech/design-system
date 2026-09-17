# Majalengka Design System

> Sistem Desain Resmi Pemerintah & Instansi Kabupaten Majalengka (`MajalengkaTech/design-system`).

Repositori ini adalah sumber kebenaran tunggal (*single source of truth*) untuk seluruh aset antarmuka digital, standar aksesibilitas, token desain, dan pustaka komponen bagi aplikasi dan portal layanan publik di Kabupaten Majalengka.

---

## Arsitektur Monorepo

```
majalengka-tech/design-system
├── packages/
│   ├── tokens/      # Sumber token W3C DTCG JSON + build pipeline CSS/TS
│   ├── css/         # Paket CSS murni (@majalengka/css) tanpa proses build (< 35kB)
│   └── vue/         # Komponen referensi Vue 3 + TypeScript (@majalengka/vue)
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
import { MjlGovBanner, MjlButton, MjlFormField, MjlInput } from '@majalengka/vue';
import '@majalengka/css/dist/majalengka.css';
</script>

<template>
  <MjlGovBanner />
  <MjlFormField id="nik" label="NIK Warga" required>
    <MjlInput id="nik" placeholder="16 digit sesuai KTP" />
  </MjlFormField>
  <MjlButton variant="primary">Cek Data</MjlButton>
</template>
```

---

## Menjalankan Dokumentasi Secara Lokal

Website dokumentasi terletak di folder `docs/`:

```bash
# Pemasangan dependensi
cd docs
bun install

# Menjalankan dev server Docus
bun run dev

# Membuka di browser: http://localhost:3000
```

---

## Prinsip Desain
1. **Aksesibel Sejak Awal**: Kepatuhan penuh WCAG 2.1 Level AA (kontras minimal 4.5:1, target sentuh 44×44px, navigasi keyboard penuh).
2. **Framework-Agnostic**: Mudah dipakai di aplikasi warisan (PHP polos) hingga framework frontend mutakhir.
3. **Kredibel & Resmi**: Menggunakan warna primer Biru Majalengka (`#0014A8`), aksen Kuning Mangga (`#F0A202`), dan pita pengenal resmi `GovBanner`.

---

## Lisensi
Didistribusikan di bawah lisensi [MIT](LICENSE) oleh Pemerintah Kabupaten Majalengka & Komunitas Majalengka.tech.