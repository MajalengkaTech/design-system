<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <img
    src="/logo-circle.svg"
    :alt="appConfig.header?.logo?.alt || appConfig.header?.title || 'Majalengka Design System'"
    class="h-7 w-7 shrink-0"
  />
</template>
