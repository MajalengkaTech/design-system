<script setup lang="ts">
import { computed, ref } from 'vue';

export interface MjlPinInputProps {
	length?: number;
	/** Hanya angka (default) — memunculkan keypad numerik di HP. */
	numeric?: boolean;
	disabled?: boolean;
	/** Nama kelompok untuk pembaca layar, mis. "Kode OTP". */
	label?: string;
	/** Sembunyikan karakter (untuk PIN). */
	mask?: boolean;
}

const props = withDefaults(defineProps<MjlPinInputProps>(), {
	length: 6,
	numeric: true,
	disabled: false,
	label: 'Kode verifikasi',
	mask: false,
});

const model = defineModel<string>({ default: '' });
const emit = defineEmits<{
	complete: [value: string];
}>();

const boxes = ref<HTMLInputElement[]>([]);
const chars = computed(() => Array.from({ length: props.length }, (_, i) => model.value[i] ?? ''));

function sanitize(text: string) {
	return props.numeric ? text.replace(/\D/g, '') : text.replace(/\s/g, '');
}

function setChars(start: number, text: string) {
	const next = chars.value.slice();
	let i = start;
	for (const ch of text) {
		if (i >= props.length) break;
		next[i++] = ch;
	}
	// Potong di slot kosong pertama agar nilai selalu berurutan tanpa lubang.
	const firstEmpty = next.indexOf('');
	const value = (firstEmpty === -1 ? next : next.slice(0, firstEmpty)).join('');
	model.value = value;
	if (value.length === props.length) emit('complete', value);
	return i;
}

function focusBox(index: number) {
	boxes.value[Math.min(Math.max(index, 0), props.length - 1)]?.focus();
}

function onInput(index: number, event: Event) {
	const input = event.target as HTMLInputElement;
	const text = sanitize(input.value);
	// Paksa tampilan kembali ke state model (mis. karakter non-angka ditolak).
	input.value = chars.value[index];
	if (!text) return;
	// Ketik di kotak berisi: ambil karakter terakhir yang diketik.
	const typed = text.length > 1 && chars.value[index] ? text.slice(-1) : text;
	// Kotak setelah slot kosong pertama tidak bisa diisi lebih dulu (nilai tanpa lubang).
	const end = setChars(Math.min(index, model.value.length), typed);
	focusBox(end);
}

function onKeydown(index: number, event: KeyboardEvent) {
	if (event.key === 'Backspace') {
		event.preventDefault();
		const target = chars.value[index] ? index : index - 1;
		if (target < 0) return;
		model.value = model.value.slice(0, target);
		focusBox(target);
	} else if (event.key === 'ArrowLeft') {
		event.preventDefault();
		focusBox(index - 1);
	} else if (event.key === 'ArrowRight') {
		event.preventDefault();
		focusBox(index + 1);
	}
}

function onPaste(index: number, event: ClipboardEvent) {
	event.preventDefault();
	const text = sanitize(event.clipboardData?.getData('text') ?? '');
	if (!text) return;
	focusBox(setChars(Math.min(index, model.value.length), text));
}
</script>

<template>
	<div
		class="mjl-pin-input"
		role="group"
		:aria-label="label"
	>
		<input
			v-for="(ch, i) in chars"
			:key="i"
			ref="boxes"
			:value="ch"
			:type="mask ? 'password' : 'text'"
			:inputmode="numeric ? 'numeric' : 'text'"
			:pattern="numeric ? '[0-9]*' : undefined"
			:autocomplete="i === 0 ? 'one-time-code' : 'off'"
			:aria-label="`Karakter ${i + 1} dari ${length}`"
			:disabled="disabled"
			class="mjl-pin-input__box"
			@input="onInput(i, $event)"
			@keydown="onKeydown(i, $event)"
			@paste="onPaste(i, $event)"
			@focus="($event.target as HTMLInputElement).select()"
		>
	</div>
</template>
