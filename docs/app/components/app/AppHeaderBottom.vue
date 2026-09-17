<script setup lang="ts">
import { ref, computed, watch, inject } from '#imports'
import { useRoute } from '#imports'
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const { locale, isEnabled } = useDocusI18n()

// Identifikasi section aktif saat ini (/dokumentasi atau /komponen)
const currentSection = computed(() => {
	if (!navigation?.value) return undefined
	return navigation.value.find(item =>
		route.path === item.path || route.path.startsWith(item.path + '/')
	)
})

// HANYA ambil submenu dari section yang sedang aktif (tidak membawa menu dari section lain)
const filteredNavigation = computed(() => {
	if (currentSection.value && currentSection.value.children?.length) {
		return currentSection.value.children
	}
	return navigation?.value || []
})

const collectionName = computed(() => isEnabled.value ? `docs_${locale.value}` : 'docs')

const { data: page } = await useAsyncData(
	() => `mobile-subbar-page-${route.path}`,
	() => queryCollection(collectionName.value as any).path(route.path).first(),
	{ watch: [() => route.path] }
)

const tocLinks = computed(() => page.value?.body?.toc?.links || [])

const menuDrawerOpen = ref(false)
const tocDrawerOpen = ref(false)

// Tutup drawer secara otomatis saat rute halaman berubah
watch(() => route.path, () => {
	menuDrawerOpen.value = false
	tocDrawerOpen.value = false
})
</script>

<template>
	<!-- Sub-bar Mobile: HANYA tampil di mobile (< 1024px / lg:hidden), 2 tombol (Kiri: Menu, Kanan: TOC) -->
	<div class="lg:hidden border-b border-neutral-200/80 bg-white/90 dark:border-neutral-800/80 dark:bg-neutral-950/90 backdrop-blur-md h-10 flex items-center justify-between px-3 sm:px-4">
		<!-- Tombol 1: Paling Kiri -> Drawer Sub Menu Navigasi (Slideover ramping menempel di kiri) -->
		<UDrawer
			v-model:open="menuDrawerOpen"
			direction="left"
			:handle="false"
			side="left"
			:ui="{
				content: 'w-72 max-w-[80vw] h-full border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl flex flex-col',
				header: 'p-0 border-b border-neutral-200/80 dark:border-neutral-800/80',
				body: 'p-0 flex-1 overflow-hidden'
			}"
		>
			<UButton
				icon="i-lucide-panel-left"
				:label="currentSection?.title || 'Menu'"
				color="neutral"
				variant="ghost"
				size="sm"
				class="text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-[#0014A8] dark:hover:text-brand-300 hover:bg-brand-500/10 dark:hover:bg-brand-500/15 gap-1.5 px-2.5 rounded-md transition-colors"
				aria-label="Buka Menu Navigasi"
			/>

			<template #header>
				<div class="flex items-center justify-between w-full px-4 py-3">
					<div class="flex items-center gap-2">
						<UIcon name="i-lucide-menu" class="size-4 text-[#0014A8] dark:text-brand-400" />
						<span class="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
							{{ currentSection?.title || 'Navigasi' }}
						</span>
					</div>
					<UButton
						icon="i-lucide-x"
						color="neutral"
						variant="ghost"
						size="xs"
						square
						class="size-7 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
						aria-label="Tutup Menu"
						@click="menuDrawerOpen = false"
					/>
				</div>
			</template>

			<template #body>
				<div class="p-4 overflow-y-auto h-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
					<UContentNavigation
						:navigation="filteredNavigation"
						:highlight="false"
						variant="pill"
						color="primary"
						default-open
						trailing-icon="i-lucide-chevron-right"
						:ui="{
							linkTrailingIcon: 'group-data-[state=open]:rotate-90',
							link: 'rounded-md text-xs py-1.5 px-2.5 transition-all duration-150'
						}"
					/>
				</div>
			</template>
		</UDrawer>

		<!-- Tombol 2: Paling Kanan -> Drawer TOC (Slideover ramping menempel di kanan) -->
		<UDrawer
			v-model:open="tocDrawerOpen"
			direction="right"
			:handle="false"
			side="right"
			:ui="{
				content: 'w-72 max-w-[80vw] h-full border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl flex flex-col',
				header: 'p-0 border-b border-neutral-200/80 dark:border-neutral-800/80',
				body: 'p-0 flex-1 overflow-hidden'
			}"
		>
			<UButton
				trailing-icon="i-lucide-panel-right"
				label="Pada Halaman Ini"
				color="neutral"
				variant="ghost"
				size="sm"
				class="text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-[#0014A8] dark:hover:text-brand-300 hover:bg-brand-500/10 dark:hover:bg-brand-500/15 gap-1.5 px-2.5 rounded-md transition-colors"
				aria-label="Buka Daftar Isi Halaman"
			/>

			<template #header>
				<div class="flex items-center justify-between w-full px-4 py-3">
					<div class="flex items-center gap-2">
						<UIcon name="i-lucide-align-left" class="size-4 text-[#0014A8] dark:text-brand-400" />
						<span class="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
							Pada Halaman Ini
						</span>
					</div>
					<UButton
						icon="i-lucide-x"
						color="neutral"
						variant="ghost"
						size="xs"
						square
						class="size-7 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
						aria-label="Tutup Daftar Isi"
						@click="tocDrawerOpen = false"
					/>
				</div>
			</template>

			<template #body>
				<div class="p-4 overflow-y-auto h-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
					<UContentToc
						v-if="tocLinks.length"
						:links="tocLinks"
						:highlight="false"
						color="primary"
						:open="true"
						default-open
						:ui="{
							root: '!mx-0 !px-0 w-full',
							container: '!pt-0 border-none',
							title: 'hidden',
							trailingIcon: 'hidden',
							link: 'text-xs leading-relaxed py-1 transition-colors block text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
						}"
						@move="tocDrawerOpen = false"
					/>
					<p
						v-else
						class="text-xs text-neutral-500 dark:text-neutral-400 py-3"
					>
						Tidak ada sub-judul pada halaman ini.
					</p>
				</div>
			</template>
		</UDrawer>
	</div>
</template>
