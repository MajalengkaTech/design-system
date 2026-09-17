<script setup lang="ts">
import { ref } from 'vue';

const copiedHex = ref('');

const copyToClipboard = (hex: string) => {
	navigator.clipboard.writeText(hex);
	copiedHex.value = hex;
	setTimeout(() => {
		copiedHex.value = '';
	}, 1800);
};

const primaryColors = [
	{ step: '50', hex: '#EEF1FF', text: '#0014A8', note: 'Latar alert info' },
	{ step: '100', hex: '#DDE3FF', text: '#0014A8', note: 'Latar badge' },
	{ step: '200', hex: '#BCC7FF', text: '#0014A8', note: 'Garis tepi lembut' },
	{ step: '300', hex: '#94A3FF', text: '#0014A8', note: 'Link mode gelap' },
	{ step: '400', hex: '#6B7DFF', text: '#FFFFFF', note: 'Aksen mode gelap' },
	{ step: '500', hex: '#4256F5', text: '#FFFFFF', note: 'Focus ring' },
	{ step: '600', hex: '#2434D6', text: '#FFFFFF', note: 'Ikon aksen' },
	{ step: '700', hex: '#0014A8', text: '#FFFFFF', note: 'Aksi Utama (13:1)', badge: 'Utama' },
	{ step: '800', hex: '#001086', text: '#FFFFFF', note: 'Hover tombol primer' },
	{ step: '900', hex: '#000C63', text: '#FFFFFF', note: 'State pressed' },
	{ step: '950', hex: '#00073A', text: '#FFFFFF', note: 'Latar gelap' },
];

const neutralColors = [
	{ step: '50', hex: '#FFFFFF', text: '#222834', note: 'Latar card' },
	{ step: '100', hex: '#F7F8FA', text: '#222834', note: 'Kanvas halaman' },
	{ step: '200', hex: '#EEF0F4', text: '#222834', note: 'Latar sekunder' },
	{ step: '300', hex: '#DFE3EA', text: '#222834', note: 'Garis pemisah' },
	{ step: '400', hex: '#C6CCD8', text: '#222834', note: 'Border input' },
	{ step: '500', hex: '#97A0B2', text: '#000000', note: 'Border fokus off' },
	{ step: '600', hex: '#6B7488', text: '#FFFFFF', note: 'Teks sekunder (4.6:1)' },
	{ step: '700', hex: '#4C5466', text: '#FFFFFF', note: 'Teks subjudul' },
	{ step: '800', hex: '#363D4D', text: '#FFFFFF', note: 'Teks penting' },
	{ step: '900', hex: '#222834', text: '#FFFFFF', note: 'Teks utama (14.5:1)' },
	{ step: '950', hex: '#0B0E15', text: '#FFFFFF', note: 'Hitam pekat' },
];
</script>

<template>
	<div class="my-6 space-y-6">
		<div class="rounded-xl border border-slate-200 p-5 shadow-sm dark:border-slate-800">
			<h4 class="mb-3 text-base font-bold text-slate-900 dark:text-white">
				Skala Primer: Biru Majalengka (#0014A8)
			</h4>
			<p class="mb-4 text-xs text-slate-500">
				Klik kartu warna mana saja untuk menyalin kode Hex ke clipboard.
			</p>
			<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				<div
					v-for="c in primaryColors"
					:key="c.step"
					class="group relative flex flex-col justify-between rounded-lg p-3 shadow-sm transition hover:scale-105 cursor-pointer"
					:style="{ backgroundColor: c.hex, color: c.text }"
					@click="copyToClipboard(c.hex)"
				>
					<div>
						<div class="flex items-center justify-between text-xs font-bold">
							<span>{{ c.step }}</span>
							<span
								v-if="c.badge"
								class="rounded bg-amber-400 px-1 text-[10px] font-bold text-slate-900"
							>{{ c.badge }}</span>
						</div>
						<div class="mt-1 font-mono text-xs opacity-90">{{ c.hex }}</div>
					</div>
					<div class="mt-4 text-[11px] opacity-80 leading-tight">{{ c.note }}</div>
					<div
						v-if="copiedHex === c.hex"
						class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/75 text-xs font-bold text-white"
					>
						Tersalin!
					</div>
				</div>
			</div>
		</div>

		<div class="rounded-xl border border-slate-200 p-5 shadow-sm dark:border-slate-800">
			<h4 class="mb-3 text-base font-bold text-slate-900 dark:text-white">
				Skala Netral (Beraksen Biru Halus)
			</h4>
			<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				<div
					v-for="c in neutralColors"
					:key="c.step"
					class="group relative flex flex-col justify-between rounded-lg border border-slate-200/40 p-3 shadow-sm transition hover:scale-105 cursor-pointer"
					:style="{ backgroundColor: c.hex, color: c.text }"
					@click="copyToClipboard(c.hex)"
				>
					<div>
						<span class="text-xs font-bold">{{ c.step }}</span>
						<div class="mt-1 font-mono text-xs opacity-90">{{ c.hex }}</div>
					</div>
					<div class="mt-4 text-[11px] opacity-80 leading-tight">{{ c.note }}</div>
					<div
						v-if="copiedHex === c.hex"
						class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/75 text-xs font-bold text-white"
					>
						Tersalin!
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
