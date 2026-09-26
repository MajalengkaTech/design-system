<script setup lang="ts">
// Form GET biasa: tetap berfungsi walau JavaScript belum termuat
withDefaults(defineProps<{ nilai?: string, besar?: boolean }>(), { nilai: '', besar: false })

// Ikut baseURL: template juga dipasang di bawah /templates/disdik/ pada situs docs
const action = `${useRuntimeConfig().app.baseURL}layanan`
</script>

<template>
  <form :action="action" method="get" role="search" class="flex flex-col gap-2 sm:flex-row sm:items-end">
    <div class="flex-1 flex flex-col gap-1">
      <label for="cari-layanan" class="mjl-label">Cari layanan</label>
      <div class="relative">
        <span class="i-lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-mjl-text-subtle text-lg pointer-events-none" aria-hidden="true" />
        <input
          id="cari-layanan"
          name="q"
          type="search"
          :value="nilai"
          :class="['mjl-input pl-10', { 'mjl-input--lg': besar }]"
          placeholder="Contoh: legalisir ijazah, PPDB, magang"
          autocomplete="off"
        >
      </div>
    </div>
    <button type="submit" :class="['mjl-btn', { 'mjl-btn--lg': besar }]">Cari</button>
  </form>
</template>
