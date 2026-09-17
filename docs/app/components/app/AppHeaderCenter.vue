<script setup lang="ts">
import { useRoute, computed, ref, onMounted, onUnmounted, watch, nextTick } from '#imports'

const route = useRoute()

const navItems = computed(() => [
  {
    label: 'Dokumentasi',
    icon: 'i-lucide-book-open',
    to: '/dokumentasi/memulai/pengantar',
    active: route.path.startsWith('/dokumentasi')
  },
  {
    label: 'Komponen',
    icon: 'i-lucide-component',
    to: '/komponen',
    active: route.path.startsWith('/komponen')
  },
  {
    label: 'Template',
    icon: 'i-lucide-layout-template',
    to: '/template',
    active: route.path.startsWith('/template')
  }
])

const navContainerRef = ref<HTMLElement | null>(null)
const itemRefs = ref<(HTMLElement | null)[]>([])

const indicator = ref({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  visible: false
})

const updateIndicator = () => {
  nextTick(() => {
    if (!navContainerRef.value) return
    const activeIndex = navItems.value.findIndex(item => item.active)
    if (activeIndex === -1) {
      indicator.value.visible = false
      return
    }

    const activeEl = itemRefs.value[activeIndex]
    if (!activeEl) return

    const containerRect = navContainerRef.value.getBoundingClientRect()
    const targetRect = activeEl.getBoundingClientRect()

    indicator.value = {
      left: targetRect.left - containerRect.left,
      top: targetRect.top - containerRect.top,
      width: targetRect.width,
      height: targetRect.height,
      visible: true
    }
  })
}

onMounted(() => {
  updateIndicator()
  window.addEventListener('resize', updateIndicator)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIndicator)
})

watch(() => route.path, () => {
  updateIndicator()
})
</script>

<template>
  <nav
    ref="navContainerRef"
    class="relative hidden md:flex items-center gap-1.5 p-0.5 rounded-lg"
    aria-label="Navigasi Utama"
  >
    <!-- Sliding Indicator: Meluncur mulus antar tombol seperti tab CodeGroup -->
    <div
      class="absolute bg-[#0014A8] rounded-md shadow-xs pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
      :style="{
        transform: `translate3d(${indicator.left}px, ${indicator.top}px, 0)`,
        width: `${indicator.width}px`,
        height: `${indicator.height}px`,
        opacity: indicator.visible ? 1 : 0
      }"
    />

    <div
      v-for="(item, index) in navItems"
      :key="item.to"
      :ref="el => { if (el) itemRefs[index] = el as HTMLElement }"
      class="relative z-10"
    >
      <UButton
        :to="item.to"
        :icon="item.icon"
        :label="item.label"
        size="sm"
        variant="ghost"
        class="font-semibold text-xs transition-colors duration-200"
        :class="item.active
          ? '!text-white hover:!bg-transparent'
          : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'"
      />
    </div>
  </nav>
</template>
