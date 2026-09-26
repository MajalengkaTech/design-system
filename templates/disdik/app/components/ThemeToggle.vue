<script setup lang="ts">
import type { Theme } from '~/composables/useTheme'

const theme = useTheme()

const pilihan: Record<Theme, { label: string, ikon: string, berikut: Theme }> = {
  auto: { label: 'ikut sistem', ikon: 'i-lucide-monitor', berikut: 'light' },
  light: { label: 'terang', ikon: 'i-lucide-sun', berikut: 'dark' },
  dark: { label: 'gelap', ikon: 'i-lucide-moon', berikut: 'auto' },
}

const saatIni = computed(() => pilihan[theme.value] ?? pilihan.auto)
</script>

<template>
  <button
    type="button"
    class="mjl-icon-btn"
    :aria-label="`Tema: ${saatIni.label}. Ganti tema`"
    @click="theme = saatIni.berikut"
  >
    <span :class="saatIni.ikon" class="text-xl" aria-hidden="true" />
  </button>
</template>
