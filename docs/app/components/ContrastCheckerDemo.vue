<script setup lang="ts">
import { ref, computed } from 'vue';

const fgColor = ref('#0014A8');
const bgColor = ref('#FFFFFF');

const getLuminance = (hex: string) => {
	const clean = hex.replace('#', '');
	const r = parseInt(clean.substring(0, 2), 16) / 255;
	const g = parseInt(clean.substring(2, 4), 16) / 255;
	const b = parseInt(clean.substring(4, 6), 16) / 255;

	const a = [r, g, b].map((v) => {
		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
	});
	return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const contrastRatio = computed(() => {
	try {
		const l1 = getLuminance(fgColor.value);
		const l2 = getLuminance(bgColor.value);
		const lighter = Math.max(l1, l2);
		const darker = Math.min(l1, l2);
		return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
	} catch {
		return '0.00';
	}
});

const isAANormal = computed(() => parseFloat(contrastRatio.value) >= 4.5);
const isAALarge = computed(() => parseFloat(contrastRatio.value) >= 3.0);
const isAAA = computed(() => parseFloat(contrastRatio.value) >= 7.0);

const setPreset = (fg: string, bg: string) => {
	fgColor.value = fg;
	bgColor.value = bg;
};
</script>

<template>
	<div class="my-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
		<h4 class="mb-2 text-base font-bold text-slate-900 dark:text-white">
			Kalkulator Rasio Kontras WCAG AA (Attested Computation)
		</h4>
		<p class="mb-4 text-xs text-slate-500">
			Uji kombinasi warna teks dan latar belakang secara langsung sesuai standar WCAG 2.1 Level AA (minimal 4.5:1 untuk teks normal).
		</p>

		<!-- Presets -->
		<div class="mb-4 flex flex-wrap gap-2">
			<button
				type="button"
				class="rounded-md border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
				@click="setPreset('#0014A8', '#FFFFFF')"
			>
				Biru 700 / Putih
			</button>
			<button
				type="button"
				class="rounded-md border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
				@click="setPreset('#FFFFFF', '#0014A8')"
			>
				Putih / Biru 700
			</button>
			<button
				type="button"
				class="rounded-md border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
				@click="setPreset('#6B7488', '#FFFFFF')"
			>
				Netral 600 / Putih
			</button>
			<button
				type="button"
				class="rounded-md border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
				@click="setPreset('#97A0B2', '#FFFFFF')"
			>
				Netral 500 / Putih (Dilarang)
			</button>
		</div>

		<!-- Inputs & Preview -->
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="space-y-3">
				<div>
					<label class="block text-xs font-bold text-slate-700 dark:text-slate-300">Warna Teks (Foreground)</label>
					<div class="mt-1 flex items-center gap-2">
						<input
							v-model="fgColor"
							type="color"
							class="h-8 w-10 cursor-pointer rounded border border-slate-300 p-0"
						>
						<input
							v-model="fgColor"
							type="text"
							class="w-32 rounded border border-slate-300 px-2 py-1 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						>
					</div>
				</div>
				<div>
					<label class="block text-xs font-bold text-slate-700 dark:text-slate-300">Warna Latar (Background)</label>
					<div class="mt-1 flex items-center gap-2">
						<input
							v-model="bgColor"
							type="color"
							class="h-8 w-10 cursor-pointer rounded border border-slate-300 p-0"
						>
						<input
							v-model="bgColor"
							type="text"
							class="w-32 rounded border border-slate-300 px-2 py-1 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						>
					</div>
				</div>
			</div>

			<!-- Result Card -->
			<div
				class="flex flex-col justify-between rounded-xl border p-4 shadow-sm"
				:style="{ backgroundColor: bgColor, color: fgColor, borderColor: '#DFE3EA' }"
			>
				<div>
					<span class="text-xs font-semibold opacity-75">Pratinjau Tampilan Teks</span>
					<p class="mt-1 text-base font-bold">
						Pemerintah Kabupaten Majalengka
					</p>
					<p class="text-xs leading-relaxed opacity-90">
						Layanan administrasi kependudukan dan perizinan terpadu online.
					</p>
				</div>
				<div class="mt-3 flex items-center justify-between border-t border-current/20 pt-2 text-xs">
					<span>Rasio: <strong>{{ contrastRatio }}:1</strong></span>
					<span
						class="rounded px-2 py-0.5 text-[11px] font-bold"
						:class="isAANormal ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'"
					>
						{{ isAANormal ? 'Lolos WCAG AA' : 'Gagal WCAG AA' }}
					</span>
				</div>
			</div>
		</div>

		<!-- Status Grid -->
		<div class="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
			<div class="rounded-lg border p-2" :class="isAANormal ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300' : 'border-rose-300 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-300'">
				<div class="font-bold">WCAG AA Normal</div>
				<div class="text-[11px]">{{ isAANormal ? 'Lolos (≥4.5:1)' : 'Gagal' }}</div>
			</div>
			<div class="rounded-lg border p-2" :class="isAALarge ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300' : 'border-rose-300 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-300'">
				<div class="font-bold">WCAG AA Besar / UI</div>
				<div class="text-[11px]">{{ isAALarge ? 'Lolos (≥3.0:1)' : 'Gagal' }}</div>
			</div>
			<div class="rounded-lg border p-2" :class="isAAA ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300' : 'border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300'">
				<div class="font-bold">WCAG AAA</div>
				<div class="text-[11px]">{{ isAAA ? 'Lolos (≥7.0:1)' : 'Belum (≥7.0)' }}</div>
			</div>
		</div>
	</div>
</template>
