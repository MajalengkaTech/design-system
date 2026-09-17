---
title: Majalengka Design System
description: Design system open-source untuk ekosistem web Majalengka.tech — bukan produk resmi Pemkab Majalengka. Standar antarmuka digital yang aksesibel, kredibel, dan mudah dipakai oleh instansi, komunitas, dan pengembang di Majalengka.
---

<u-page-hero>
<template v-slot:headline>
  <u-button size="sm" to="/dokumentasi/memulai/pengantar" variant="outline">
    Versi 0.1.0 · Open-source, bukan produk resmi Pemkab →
  </u-button>
</template>

<template v-slot:title>
  Design System Majalengka.tech
</template>

<template v-slot:description>
  Standar antarmuka digital yang aksesibel, kredibel, dan mudah dipakai oleh instansi, komunitas, dan pengembang di Majalengka.
</template>

<template v-slot:links>
  <u-button size="xl" to="/dokumentasi/memulai/pengantar" color="primary" trailing-icon="i-lucide-arrow-right">
    Mulai Penggunaan
  </u-button>

  <u-button size="xl" to="/komponen" color="neutral" variant="outline" icon="i-lucide-layout-grid">
    Katalog Komponen
  </u-button>
</template>
</u-page-hero>

<u-page-section>
<template v-slot:title>
  Mengapa Majalengka Butuh Sistem Desain?
</template>

<template v-slot:description>
  Tiga pilar utama yang menjadi pedoman pembuatan seluruh layanan digital publik daerah.
</template>

<u-page-grid>
  <u-page-card :spotlight="true" to="/dokumentasi/prinsip/aksesibel" icon="i-lucide-accessibility">
    <template v-slot:title>
      Aksesibel Sejak Awal
    </template>
    <template v-slot:description>
      Menjamin warga lansia, difabel, dan pengguna smartphone murah di pelosok desa dapat mengakses layanan tanpa hambatan. Standar WCAG 2.1 Level AA.
    </template>
  </u-page-card>

  <u-page-card :spotlight="true" to="/dokumentasi/prinsip/framework-agnostic" icon="i-lucide-layers">
    <template v-slot:title>
      Framework-Agnostic
    </template>
    <template v-slot:description>
      Dapat digunakan langsung via CSS murni tanpa proses build untuk aplikasi lama berbasis PHP/HTML, serta modul Vue 3 dan Nuxt untuk portal modern.
    </template>
  </u-page-card>

  <u-page-card :spotlight="true" to="/dokumentasi/prinsip/kredibel-tepercaya" icon="i-lucide-shield-check">
    <template v-slot:title>
      Kredibel & Tepercaya
    </template>
    <template v-slot:description>
      Menghadirkan rasa percaya lewat pita identitas pengelola (TrustBanner) yang diisi sendiri oleh pemakainya, warna khas Biru Majalengka (#0014A8), dan tampilan yang konsisten — tanpa mengklaim afiliasi resmi.
    </template>
  </u-page-card>
</u-page-grid>
</u-page-section>

<u-page-section>
<template v-slot:title>
  Paket & Distribusi
</template>

<template v-slot:description>
  Pilih cara integrasi yang paling sesuai dengan tumpukan teknologi di instansi Anda.
</template>

<u-page-grid>
  <u-page-card :spotlight="true" to="/dokumentasi/memulai/instalasi" icon="i-lucide-file-code">
    <template v-slot:title>
      @majalengka/css
    </template>
    <template v-slot:description>
      Berkas CSS mandiri tanpa dependensi (&lt; 35kB). Langsung pasang lewat tautan CDN di template WordPress, Laravel, atau PHP jadul tanpa build step.
    </template>
  </u-page-card>

  <u-page-card :spotlight="true" to="/dokumentasi/fondasi/warna" icon="i-lucide-palette">
    <template v-slot:title>
      @majalengka/tokens
    </template>
    <template v-slot:description>
      Token desain W3C DTCG untuk warna, tipografi, spasi 4px, dan bayangan. Mendukung sinkronisasi ke Figma Tokens Studio dan UnoCSS/Tailwind.
    </template>
  </u-page-card>

  <u-page-card :spotlight="true" to="/komponen" icon="i-lucide-boxes">
    <template v-slot:title>
      @majalengka/vue
    </template>
    <template v-slot:description>
      Komponen referensi Vue 3 + TypeScript lengkap dengan aksesibilitas keyboard dan ARIA tags untuk membangun portal interaktif modern.
    </template>
  </u-page-card>
</u-page-grid>
</u-page-section>
