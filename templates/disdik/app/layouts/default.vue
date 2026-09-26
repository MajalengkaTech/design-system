<script setup lang="ts">
import { RESMI } from '~/data/situs'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <a href="#konten" class="mjl-skip-link">Langsung ke konten</a>

    <aside class="mjl-trust-banner" aria-label="Keterangan situs">
      <div class="mjl-trust-banner__inner mjl-container">
        <span class="mjl-trust-banner__text">
          <strong>Konsep redesain</strong>, bukan situs resmi Dinas Pendidikan Kabupaten Majalengka.
        </span>
        <button type="button" class="mjl-trust-banner__toggle" data-mjl-toggle aria-controls="keterangan-konsep">
          Selengkapnya
        </button>
      </div>
      <div id="keterangan-konsep" class="mjl-trust-banner__details" hidden>
        <div class="mjl-container text-mjl-sm">
          Halaman ini contoh penerapan Majalengka Design System oleh komunitas Majalengka.tech.
          Untuk mengurus layanan, kunjungi situs resmi
          <a :href="RESMI" class="mjl-link">disdik.majalengkakab.go.id</a>.
        </div>
      </div>
    </aside>

    <AppHeader />

    <main id="konten" tabindex="-1" class="flex-1 outline-none">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
