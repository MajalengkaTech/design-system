<script setup lang="ts">
import { cariLayanan } from '~/data/layanan'

const route = useRoute()
const q = computed(() => String(route.query.q ?? ''))
const hasil = computed(() => cariLayanan(q.value))

useHead({ title: () => (q.value ? `Hasil pencarian "${q.value}"` : 'Layanan publik') })
</script>

<template>
  <div class="mjl-container flex flex-col gap-8 py-10 md:py-14">
    <nav aria-label="Jejak navigasi">
      <ol class="mjl-breadcrumb m-0 p-0">
        <li><NuxtLink to="/">Beranda</NuxtLink></li>
        <li><span aria-current="page">Layanan publik</span></li>
      </ol>
    </nav>

    <header class="flex flex-col gap-3 max-w-3xl">
      <h1 class="m-0 font-mjl-title font-extrabold text-mjl-3xl md:text-mjl-4xl text-mjl-text-strong">Layanan publik</h1>
      <p class="m-0 text-mjl-lg text-mjl-text-subtle">
        Cek syarat dan alur tiap layanan sebelum datang ke kantor Dinas Pendidikan.
      </p>
    </header>

    <div class="max-w-2xl">
      <CariLayanan :nilai="q" />
    </div>

    <p class="m-0 text-mjl-sm text-mjl-text-subtle" role="status">
      <template v-if="q">{{ hasil.length }} layanan cocok dengan "{{ q }}"</template>
      <template v-else>{{ hasil.length }} layanan</template>
    </p>

    <!-- Judul kartu memakai <h3>; tanpa <h2> ini urutan heading melompat dari h1 -->
    <h2 v-if="hasil.length" class="mjl-sr-only">Daftar layanan</h2>
    <ul v-if="hasil.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
      <li v-for="l in hasil" :key="l.slug">
        <LayananCard :layanan="l" />
      </li>
    </ul>

    <div v-else class="mjl-empty-state">
      <span class="i-lucide-search text-4xl text-mjl-text-muted" aria-hidden="true" />
      <h2 class="m-0 font-mjl-title text-mjl-xl font-bold text-mjl-text-strong">Layanan tidak ditemukan</h2>
      <p class="m-0 text-mjl-text-subtle">Coba kata lain, misalnya "ijazah" atau "sekolah baru".</p>
      <NuxtLink to="/layanan" class="mjl-btn mjl-btn--secondary">Lihat semua layanan</NuxtLink>
    </div>
  </div>
</template>
