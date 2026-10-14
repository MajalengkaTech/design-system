<script setup lang="ts">
import { onMounted, ref, useId, watch } from 'vue';

export interface MjlDrawerProps {
	modelValue: boolean;
	title?: string;
	side?: 'left' | 'right' | 'bottom';
	/** Tutup saat area gelap di luar panel diklik. */
	closeOnBackdrop?: boolean;
}

const props = withDefaults(defineProps<MjlDrawerProps>(), {
	title: undefined,
	side: 'right',
	closeOnBackdrop: true,
});

const emit = defineEmits<{
	'update:modelValue': [value: boolean];
}>();

// <dialog> + showModal(): fokus terkunci di dalam panel, Esc menutup, konten
// di belakangnya inert, dan fokus kembali ke pemicu saat ditutup — semuanya native.
const dialogRef = ref<HTMLDialogElement>();
const titleId = useId();

function sync(open: boolean) {
	const dialog = dialogRef.value;
	if (!dialog) return;
	if (open && !dialog.open) dialog.showModal();
	else if (!open && dialog.open) dialog.close();
}

onMounted(() => sync(props.modelValue));
watch(() => props.modelValue, sync);

function onClose() {
	if (props.modelValue) emit('update:modelValue', false);
}

function onBackdropClick(event: MouseEvent) {
	// Elemen <dialog> mengisi seluruh layar; klik yang mengenai dialog itu
	// sendiri (bukan panel di dalamnya) berarti klik di area gelap.
	if (props.closeOnBackdrop && event.target === dialogRef.value) dialogRef.value?.close();
}
</script>

<template>
	<dialog
		ref="dialogRef"
		class="mjl-drawer-backdrop"
		:aria-labelledby="title ? titleId : undefined"
		@close="onClose"
		@click="onBackdropClick"
	>
		<div :class="['mjl-drawer', `mjl-drawer--${side}`]">
			<div class="mjl-drawer__header">
				<h2
					v-if="title"
					:id="titleId"
					class="mjl-drawer__title"
				>{{ title }}</h2>
				<button
					type="button"
					class="mjl-icon-btn"
					aria-label="Tutup"
					@click="dialogRef?.close()"
				>✕</button>
			</div>

			<div class="mjl-drawer__body">
				<slot />
			</div>

			<div
				v-if="$slots.footer"
				class="mjl-drawer__footer"
			>
				<slot name="footer" />
			</div>
		</div>
	</dialog>
</template>
