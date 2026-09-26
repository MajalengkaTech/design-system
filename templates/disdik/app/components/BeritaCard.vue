<script setup lang="ts">
defineProps<{
  judul: string
  kategori: string
  bulan: string
  url: string
}>()
</script>

<template>
  <article class="mjl-card p-0 overflow-hidden h-full">
    <!-- Tanpa foto: template tidak menyalin foto dari situs resmi -->
    <div class="hidden sm:grid h-32 place-items-center bg-mjl-bg-sunken text-mjl-text-muted" aria-hidden="true">
      <span class="i-lucide-newspaper text-4xl" />
    </div>
    <div class="flex flex-col flex-1 gap-3 p-5">
      <div class="flex items-center gap-2 text-mjl-xs text-mjl-text-subtle">
        <span class="mjl-badge mjl-badge--primary">{{ kategori }}</span>
        <span>{{ bulan }}</span>
      </div>
      <h3 class="font-mjl-title font-semibold text-mjl-base leading-snug text-mjl-text-strong m-0">
        <a :href="url" class="text-inherit no-underline hover:underline after:absolute after:inset-0">{{ judul }}</a>
      </h3>
      <span class="mt-auto inline-flex items-center gap-1 text-mjl-sm text-mjl-text-subtle">
        Baca di situs resmi
        <span class="i-lucide-external-link" aria-hidden="true" />
      </span>
    </div>
  </article>
</template>
