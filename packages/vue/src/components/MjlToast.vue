<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';

export interface MjlToastProps {
	title: string;
	description?: string;
	/**
	 * Tutup otomatis setelah sekian milidetik. Default 0 (tidak otomatis):
	 * WCAG 2.2.1 meminta pengguna punya cukup waktu membaca, jadi pakai hanya
	 * untuk pesan yang juga tersedia di tempat lain.
	 */
	duration?: number;
	closable?: boolean;
}

const props = withDefaults(defineProps<MjlToastProps>(), {
	description: undefined,
	duration: 0,
	closable: true,
});

const emit = defineEmits<{
	close: [];
}>();

let timer: ReturnType<typeof setTimeout> | undefined;

function start() {
	pause();
	if (props.duration > 0) timer = setTimeout(() => emit('close'), props.duration);
}

function pause() {
	clearTimeout(timer);
	timer = undefined;
}

onMounted(start);
onBeforeUnmount(pause);
</script>

<template>
	<!-- Diumumkan oleh MjlToastContainer (aria-live) tempat toast ini disisipkan. -->
	<div
		class="mjl-toast"
		@mouseenter="pause"
		@mouseleave="start"
		@focusin="pause"
		@focusout="start"
	>
		<slot name="icon" />
		<div class="mjl-toast__content">
			<div class="mjl-toast__title">{{ title }}</div>
			<div
				v-if="description || $slots.default"
				class="mjl-toast__desc"
			>
				<slot>{{ description }}</slot>
			</div>
		</div>
		<button
			v-if="closable"
			type="button"
			class="mjl-toast__close"
			aria-label="Tutup notifikasi"
			@click="emit('close')"
		>✕</button>
	</div>
</template>
