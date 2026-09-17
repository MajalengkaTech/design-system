<script setup lang="ts">
import { useRoute } from '#imports'

const route = useRoute()

const tabs = [
  {
    label: 'Dokumentasi',
    icon: 'i-lucide-book-open',
    to: '/dokumentasi/memulai/pengantar',
    activePrefix: '/dokumentasi'
  },
  {
    label: 'Komponen',
    icon: 'i-lucide-component',
    to: '/komponen',
    activePrefix: '/komponen'
  }
]
</script>

<template>
  <div class="border-b border-neutral-200/80 bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/90 z-10 sticky top-[var(--ui-header-height,64px)]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12">
      <nav class="flex items-center gap-2" aria-label="Navigasi Seksi">
        <NuxtLink
          v-for="tab in tabs"
          :key="tab.to"
          :to="tab.to"
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all"
          :class="route.path.startsWith(tab.activePrefix)
            ? 'bg-[#0014A8] text-white shadow-sm dark:bg-[#4359EB]'
            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800'"
        >
          <span :class="tab.icon" class="w-4 h-4" />
          <span>{{ tab.label }}</span>
        </NuxtLink>
      </nav>

      <div class="hidden sm:flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          WCAG 2.1 AA Compliant
        </span>
      </div>
    </div>
  </div>
</template>

