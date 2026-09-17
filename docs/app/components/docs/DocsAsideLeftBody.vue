<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { inject, computed, ref, onMounted, onUnmounted, watch, nextTick, useRoute } from '#imports'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

// Identifikasi section aktif saat ini (/dokumentasi atau /komponen)
const currentSection = computed(() => {
	if (!navigation?.value) return undefined
	return navigation.value.find(item =>
		route.path === item.path || route.path.startsWith(item.path + '/')
	)
})

// HANYA ambil submenu milik section aktif (Dokumentasi saja atau Komponen saja)
// DAN pastikan link root (seperti /komponen atau /dokumentasi) HANYA aktif jika route.path persis sama!
const processedNavigation = computed(() => {
	const rawItems = (currentSection.value && currentSection.value.children?.length)
		? currentSection.value.children
		: (navigation?.value || [])

	const markExact = (items: ContentNavigationItem[]): ContentNavigationItem[] => {
		return items.map(item => {
			const hasChildren = Boolean(item.children && item.children.length > 0)
			const isExact = route.path === item.path || route.path === `${item.path}/`
			return {
				...item,
				exact: true,
				...(hasChildren ? {} : { active: isExact }),
				children: hasChildren ? markExact(item.children!) : undefined
			}
		})
	}

	return markExact(rawItems)
})

const navContainerRef = ref<HTMLElement | null>(null)
const indicator = ref({
	top: 0,
	left: 0,
	width: 0,
	height: 0,
	visible: false
})

const updateIndicator = () => {
	nextTick(() => {
		if (!navContainerRef.value) return
		const activeEl = navContainerRef.value.querySelector('a[data-slot="link"].text-primary') as HTMLElement | null
		if (!activeEl) {
			indicator.value.visible = false
			return
		}

		const containerRect = navContainerRef.value.getBoundingClientRect()
		const targetRect = activeEl.getBoundingClientRect()

		indicator.value = {
			top: targetRect.top - containerRect.top,
			left: targetRect.left - containerRect.left,
			width: targetRect.width,
			height: targetRect.height,
			visible: true
		}
	})
}

let observer: MutationObserver | null = null

onMounted(() => {
	updateIndicator()
	window.addEventListener('resize', updateIndicator)

	if (navContainerRef.value) {
		observer = new MutationObserver(() => updateIndicator())
		observer.observe(navContainerRef.value, { childList: true, subtree: true, attributes: true })
	}
})

onUnmounted(() => {
	window.removeEventListener('resize', updateIndicator)
	if (observer) {
		observer.disconnect()
	}
})

watch(() => route.path, () => {
	updateIndicator()
	setTimeout(updateIndicator, 50)
	setTimeout(updateIndicator, 150)
})
</script>

<template>
	<div ref="navContainerRef" class="docs-aside-left-nav relative">
		<!-- Vertical Sliding Indicator Pill: Meluncur halus mengikuti link aktif di menu kiri -->
		<div
			class="docs-aside-indicator pointer-events-none absolute bg-[#0014A8] rounded-md shadow-xs transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] z-0"
			:style="{
				transform: `translate3d(${indicator.left}px, ${indicator.top}px, 0)`,
				width: `${indicator.width}px`,
				height: `${indicator.height}px`,
				opacity: indicator.visible ? 1 : 0
			}"
		/>

		<UContentNavigation
			:highlight="false"
			variant="pill"
			color="primary"
			:navigation="processedNavigation"
			:ui="{
				link: 'rounded-md text-xs py-1.5 px-2.5 transition-colors duration-150 relative z-10',
			}"
		/>
	</div>
</template>
