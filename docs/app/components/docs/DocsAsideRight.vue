<script setup lang="ts">
import type { DocsCollectionItem } from '@nuxt/content'
import { computed, useAppConfig, useUIConfig, useDocusI18n, useSubNavigation } from '#imports'

const props = defineProps<{
  page?: DocsCollectionItem | null
}>()

const links = computed(() => props.page?.body?.toc?.links || [])
const { subNavigationMode } = useSubNavigation()
const appConfig = useAppConfig()
const { t } = useDocusI18n()

const contentTocVariants = useUIConfig('contentToc')
</script>

<template>
  <div class="docs-aside-right-wrapper w-full">
    <UContentToc
      v-if="links.length"
      :highlight="contentTocVariants.highlight ?? true"
      :highlight-color="contentTocVariants.highlightColor || 'primary'"
      :highlight-variant="contentTocVariants.highlightVariant ?? 'circuit'"
      :color="contentTocVariants.color"
      :title="appConfig.toc?.title || 'Daftar Isi'"
      :links="links"
      :class="{ 'hidden lg:block': subNavigationMode }"
    >
      <template #bottom>
        <DocsAsideRightBottom />
      </template>
    </UContentToc>

    <DocsAsideMobileBar :links="links" />
  </div>
</template>
