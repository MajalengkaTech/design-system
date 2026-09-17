<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const { localePath } = useDocusI18n()

const mainTabs = [
  { label: 'Dokumentasi', icon: 'i-lucide-book-open', to: '/dokumentasi/memulai/pengantar' },
  { label: 'Komponen', icon: 'i-lucide-component', to: '/komponen' },
  { label: 'Template', icon: 'i-lucide-layout-template', to: '/template' }
]
</script>

<template>
  <div class="flex flex-col gap-4 py-2">
    <!-- Mobile Search Button -->
    <UContentSearchButton
      :collapsed="false"
      class="w-full"
      variant="soft"
    />

    <!-- Quick Navigation Menu -->
    <div class="flex flex-col gap-1 pb-3 border-b border-neutral-200/80 dark:border-neutral-800/80">
      <NuxtLink
        v-for="item in mainTabs"
        :key="item.to"
        :to="localePath(item.to)"
        class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <UIcon :name="item.icon" class="size-4 shrink-0 text-(--ui-primary)" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </div>

    <!-- Tree Navigation -->
    <UContentNavigation
      v-if="navigation?.value?.length"
      :collapsible="false"
      variant="link"
      :navigation="navigation.value"
    />
  </div>
</template>
