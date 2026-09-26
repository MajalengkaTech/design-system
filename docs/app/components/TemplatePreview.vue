<script setup lang="ts">
const props = withDefaults(defineProps<{
	src: string
	title: string
	height?: number
}>(), { height: 820 })

const devices = [
	{ id: 'desktop', label: 'Desktop', width: 1280, icon: 'i-lucide-monitor' },
	{ id: 'tablet', label: 'Tablet', width: 768, icon: 'i-lucide-tablet' },
	{ id: 'mobile', label: 'Ponsel', width: 390, icon: 'i-lucide-smartphone' },
] as const

const active = ref<(typeof devices)[number]>(devices[0])
const frame = ref<HTMLElement>()
const available = ref(0)

// Lebar asli perangkat diperkecil agar muat di kolom konten, bukan dipotong
const scale = computed(() => (available.value ? Math.min(1, available.value / active.value.width) : 1))

let observer: ResizeObserver | undefined
onMounted(() => {
	observer = new ResizeObserver(([entry]) => {
		available.value = entry!.contentRect.width
	})
	if (frame.value) observer.observe(frame.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
	<div class="not-prose my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
		<div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-2.5 dark:border-slate-800">
			<div class="flex items-center gap-1 rounded-lg bg-slate-200/60 p-0.5 dark:bg-slate-800" role="group" aria-label="Ukuran layar pratinjau">
				<button
					v-for="d in devices"
					:key="d.id"
					type="button"
					class="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition"
					:class="active.id === d.id ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'"
					:aria-pressed="active.id === d.id"
					@click="active = d"
				>
					<UIcon :name="d.icon" class="size-4" aria-hidden="true" />
					{{ d.label }}
				</button>
			</div>
			<a :href="src" target="_blank" rel="noopener" class="mjl-btn mjl-btn--sm">
				Buka layar penuh
				<UIcon name="i-lucide-external-link" class="size-4" aria-hidden="true" />
				<span class="sr-only">(tab baru)</span>
			</a>
		</div>

		<div ref="frame" class="flex justify-center bg-slate-100 p-3 dark:bg-slate-950">
			<!-- Sebelum lebar kolom terukur (SSR, belum hydrate), jangan render iframe
			     1280px yang akan terpotong; tampilkan placeholder dengan rasio yang sama. -->
			<div
				v-if="!available"
				class="w-full max-w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800"
				:style="{ aspectRatio: `${active.width} / ${height}`, maxWidth: `${active.width}px` }"
				aria-hidden="true"
			/>
			<div
				v-else
				class="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm dark:border-slate-700"
				:style="{ width: `${active.width * scale}px`, height: `${height * scale}px` }"
			>
				<iframe
					:src="src"
					:title="`Pratinjau ${title} (${active.label.toLowerCase()})`"
					loading="lazy"
					class="block border-0"
					:style="{ width: `${active.width}px`, height: `${height}px`, transform: `scale(${scale})`, transformOrigin: 'top left' }"
				/>
			</div>
		</div>

		<p class="m-0 border-t border-slate-200 px-4 py-2 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
			Lebar asli {{ active.width }}px<template v-if="scale < 1">, ditampilkan {{ Math.round(scale * 100) }}%</template>.
			Pratinjau ini interaktif: klik tautan, coba pencarian, atau ganti tema.
		</p>
	</div>
</template>
