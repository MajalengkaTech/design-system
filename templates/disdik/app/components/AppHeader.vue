<script setup lang="ts">
import { menu } from '~/data/situs'

const route = useRoute()
const aktif = (to: string) => to.startsWith('/') && route.path.startsWith(to)
const eksternal = (to: string) => to.startsWith('http')

// Tutup drawer mobile setelah pindah halaman
const drawer = ref<HTMLDialogElement>()
watch(() => route.path, () => drawer.value?.close())
</script>

<template>
  <header class="mjl-header px-0 py-0">
    <div class="mjl-container flex items-center justify-between gap-4 py-2">
      <NuxtLink to="/" class="mjl-header__brand gap-3">
        <span class="grid place-items-center w-10 h-10 rounded-mjl-md bg-mjl-action-primary-bg text-mjl-action-primary-fg" aria-hidden="true">
          <span class="i-lucide-graduation-cap text-xl" />
        </span>
        <span class="flex flex-col leading-tight">
          <span class="text-mjl-base">Dinas Pendidikan</span>
          <span class="text-mjl-xs font-medium text-mjl-text-subtle">Kabupaten Majalengka</span>
        </span>
      </NuxtLink>

      <nav class="mjl-header__nav justify-end" aria-label="Menu utama">
        <ul class="mjl-nav-menu">
          <li v-for="item in menu" :key="item.label">
            <NuxtLink
              :to="item.to"
              :external="eksternal(item.to)"
              class="mjl-nav-menu__link"
              :class="{ 'mjl-nav-menu__link--active': aktif(item.to) }"
              :aria-current="aktif(item.to) ? 'page' : undefined"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="mjl-header__actions">
        <ThemeToggle />
        <button
          type="button"
          class="mjl-icon-btn md:hidden"
          commandfor="menu-seluler"
          command="show-modal"
          aria-label="Buka menu"
        >
          <span class="i-lucide-menu text-xl" aria-hidden="true" />
        </button>
      </div>
    </div>

    <dialog id="menu-seluler" ref="drawer" class="mjl-nav-drawer" closedby="any" aria-label="Menu utama">
      <div class="mjl-nav-drawer__header">
        <span class="font-mjl-title font-bold text-mjl-text-strong">Menu</span>
        <button type="button" class="mjl-icon-btn" commandfor="menu-seluler" command="close" aria-label="Tutup menu">
          <span class="i-lucide-x text-xl" aria-hidden="true" />
        </button>
      </div>
      <ul class="mjl-nav-menu mjl-nav-menu--mobile">
        <li v-for="item in menu" :key="item.label">
          <NuxtLink
            :to="item.to"
            :external="eksternal(item.to)"
            class="mjl-nav-menu__link"
            :class="{ 'mjl-nav-menu__link--active': aktif(item.to) }"
            :aria-current="aktif(item.to) ? 'page' : undefined"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </dialog>
  </header>
</template>
