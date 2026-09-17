<script setup lang="ts">
import { useRoute, useAppConfig, computed, useAssistant } from '#imports'

const route = useRoute()
const pageUrl = route.path
const appConfig = useAppConfig()
const { isEnabled, isStudioExpanded, open } = useAssistant()

const showExplainWithAi = computed(() => {
  return isEnabled.value && appConfig.assistant?.explainWithAi !== false && !isStudioExpanded.value
})

const explainIcon = computed(() => appConfig.assistant?.icons?.explain || 'i-lucide-brain')
</script>

<template>
  <div
    v-if="appConfig.toc?.bottom?.links?.length || showExplainWithAi"
    class="space-y-6"
  >
    <USeparator type="dashed" />

    <UPageLinks
      v-if="appConfig.toc?.bottom?.links?.length"
      :title="appConfig.toc?.bottom?.title || 'Komunitas'"
      :links="appConfig.toc?.bottom?.links"
    />

    <USeparator
      v-if="appConfig.toc?.bottom?.links?.length && showExplainWithAi"
      type="dashed"
    />

    <!-- Tombol AI: 1 kata saja ("Jelaskan") agar ringkas dan tidak terpotong -->
    <UButton
      v-if="showExplainWithAi"
      :icon="explainIcon"
      label="Jelaskan"
      size="sm"
      variant="link"
      class="p-0 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
      color="neutral"
      @click="open(`Explain the page ${pageUrl}`, true)"
    />
  </div>
</template>
