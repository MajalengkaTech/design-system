# @majalengka/vue

Komponen Vue 3 untuk Majalengka Design System. Tampilannya dari [`@majalengka/css`](../css/README.md); komponen ini menambahkan perilaku dan aksesibilitas yang sulit ditulis manual.

## Pasang

```bash
bun add @majalengka/vue @majalengka/css
```

```ts
// main.ts
import '@majalengka/css'
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { MjlButton, MjlFormField, MjlInput } from '@majalengka/vue'

const nik = ref('')
</script>

<template>
  <MjlFormField label="NIK" help-text="16 digit sesuai KTP" required>
    <MjlInput v-model="nik" inputmode="numeric" />
  </MjlFormField>
  <MjlButton>Cek status</MjlButton>
</template>
```

Butuh Vue 3.5 atau lebih baru (memakai `useId()` untuk id yang aman saat SSR).

## Tautan lewat router

Tanpa konfigurasi, tautan memakai `<a href>`. Di Vue Router atau Nuxt, pasang plugin supaya tautan internal tidak memuat ulang halaman:

```ts
import { createMajalengka } from '@majalengka/vue'
import { RouterLink } from 'vue-router'

app.use(createMajalengka({ link: RouterLink }))
// Nuxt: nuxtApp.vueApp.use(createMajalengka({ link: resolveComponent('NuxtLink') }))
```

Berlaku untuk `MjlButton`, `MjlLink`, `MjlCard`, `MjlBreadcrumb`, `MjlNavMenu`, dan `MjlHeader`. Tautan `https://`, `mailto:`, `tel:`, dan `#anchor` tetap `<a href>`.

## Yang diurus komponen

| Komponen | Yang tidak perlu Anda tulis lagi |
|---|---|
| `MjlFormField` | `id`, `for`, `aria-describedby` (teks bantuan + error), `aria-invalid`, `required` ke `MjlInput`, `MjlSelect`, `MjlTextarea`, `MjlFileUpload` |
| `MjlFormSummary` | Fokus pindah ke ringkasan saat error muncul |
| `MjlModal`, `MjlDrawer`, `MjlConfirmDialog` | `<dialog>` asli: fokus terkunci, `Esc`, klik di luar, fokus kembali ke tombol pembuka. `dismissible="false"` untuk dialog yang wajib dijawab |
| `MjlTabs` | Pola WAI-ARIA lengkap: `←` `→` `Home` `End`, melewati tab disabled |
| `MjlPagination` | Elipsis dengan jumlah tombol tetap, label "Halaman n" |
| `MjlStepper` | `<ol>` dan status "selesai" untuk pembaca layar |
| `MjlAlert` | `live` untuk alert yang muncul setelah halaman dimuat (`danger` → `role="alert"`) |
| `MjlButton` | Tautan nonaktif tanpa `href`, `aria-busy` saat loading |
| `useToast()` | Toast dari `@majalengka/js`: live region, jeda saat hover/fokus |

Semua id dibuat dengan `useId()`, jadi dua modal atau dua field di satu halaman tidak bentrok.

## Label bahasa

Label untuk pembaca layar berbahasa Indonesia dan bisa diganti lewat prop, misalnya:

```vue
<MjlPagination v-model="page" :page-count="20"
  label="Pagination" prev-label="Previous page" next-label="Next page"
  :page-label="(n) => `Page ${n}`" />
<MjlModal v-model="open" title="Confirm" close-label="Close" />
```

## Level heading

Komponen yang punya judul menerima `title-as` (`h2`, `h3`, ...) supaya urutan heading halaman tetap benar: `MjlCard`, `MjlEmptyState`, `MjlModal`, `MjlFormSummary`.

## Mengembangkan

```bash
bun run build       # dist/index.js + deklarasi tipe
bun run typecheck
bun run test        # Vitest + axe-core
```
