<script setup lang="ts">
import type { Layanan } from '~/data/layanan'

defineProps<{ layanan: Layanan }>()
</script>

<template>
  <NuxtLink :to="`/layanan/${layanan.slug}`" class="mjl-card mjl-card--interactive group p-5 h-full">
    <span class="grid place-items-center w-12 h-12 mb-4 rounded-mjl-md bg-mjl-bg-brand-subtle text-mjl-text-brand" aria-hidden="true">
      <span :class="layanan.ikon" class="text-2xl" />
    </span>
    <h3 class="mjl-card__title text-mjl-lg m-0">{{ layanan.nama }}</h3>
    <span class="mjl-card__desc">{{ layanan.ringkas }}</span>
    <span class="mt-auto pt-4 inline-flex items-center gap-1 text-mjl-sm font-semibold text-mjl-text-brand">
      Lihat syarat dan alur
      <span class="i-lucide-arrow-right transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </span>
  </NuxtLink>
</template>
