<script setup lang="ts">
import { useRoute, computed } from '#imports'

const appConfig = useAppConfig()
const route = useRoute()
const { forced: forcedColorMode } = useDocusColorMode()
const { isEnabled: isAssistantEnabled } = useAssistant()

// Sub-bar icon hanya muncul di halaman dokumentasi/komponen, TIDAK di home (/)
const isDocsPage = computed(() => {
  return route.path !== '/' && (
    route.path.startsWith('/dokumentasi') ||
    route.path.startsWith('/komponen') ||
    route.path.startsWith('/template') ||
    route.meta.layout === 'docs'
  )
})

const githubUrl = computed(() => appConfig.socials?.github || appConfig.github?.url || 'https://github.com/MajalengkaTech/design-system')
</script>

<template>
  <div class="sticky top-0 z-50">
    <!-- Navbar Utama (56px) -->
    <UHeader
      :ui="{
        root: 'border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md',
        container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14',
        left: 'flex items-center gap-3',
        center: 'flex-1 flex items-center justify-center',
        right: 'flex items-center gap-1.5'
      }"
    >
      <template #left>
        <AppHeaderLeft />
      </template>

      <!-- Center: Menu Utama (Dokumentasi, Komponen, Pola Layanan) -->
      <AppHeaderCenter />

      <template #right>
        <!-- Search Button -->
        <UContentSearchButton
          :collapsed="true"
          variant="ghost"
          color="neutral"
        />

        <!-- Color Mode Toggle -->
        <ClientOnly v-if="!forcedColorMode">
          <UColorModeButton />
          <template #fallback>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-sun"
              aria-label="Toggle Color Mode"
            />
          </template>
        </ClientOnly>

        <!-- GitHub Link -->
        <UButton
          :to="githubUrl"
          target="_blank"
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          aria-label="GitHub Repository"
        />

        <!-- AI Assistant Button -->
        <template v-if="isAssistantEnabled">
          <AssistantChat />
        </template>
      </template>

      <template #toggle="{ open, toggle }">
        <IconMenuToggle
          :open="open"
          class="md:hidden"
          @click="toggle"
        />
      </template>

      <template #body>
        <AppHeaderBody />
      </template>
    </UHeader>

    <!-- Sub-bar Icon Fixed di bawah navbar (HANYA di halaman dokumentasi/komponen) -->
    <AppHeaderBottom v-if="isDocsPage" />
  </div>
</template>
