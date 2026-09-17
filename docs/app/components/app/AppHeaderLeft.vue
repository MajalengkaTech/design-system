<script setup lang="ts">
const appConfig = useAppConfig()
const { localePath } = useDocusI18n()
</script>

<template>
  <div class="flex items-center gap-2.5">
    <NuxtLink
      :to="localePath('/')"
      class="flex items-center gap-2.5 font-bold text-neutral-900 dark:text-white transition-opacity hover:opacity-90"
      aria-label="Majalengka Design System"
    >
      <AppHeaderLogo class="h-6 w-auto shrink-0" />
      <span class="hidden sm:inline font-semibold text-sm tracking-tight">
        Majalengka
      </span>
    </NuxtLink>

    <!-- Version Badge (mirip ui.nuxt.com badge) -->
    <NuxtLink
      :to="localePath('/dokumentasi/memulai/pengantar')"
      class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 transition-colors border border-emerald-500/20"
      aria-label="Versi 0.1.0"
    >
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
      <span>0.1.0</span>
    </NuxtLink>
  </div>
</template>
