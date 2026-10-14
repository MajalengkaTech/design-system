<script setup lang="ts">
import { onMounted, ref, useId, watch } from 'vue';

export interface MjlModalProps {
	modelValue: boolean;
	title?: string;
}

const props = defineProps<MjlModalProps>();

const emit = defineEmits<{
	'update:modelValue': [value: boolean];
}>();

const dialogRef = ref<HTMLDialogElement>();
// ID unik per instance — beberapa modal di satu halaman tidak boleh berbagi
// id judul, kalau tidak aria-labelledby bisa menunjuk judul modal lain.
const titleId = useId();

function sync(open: boolean) {
	const dialog = dialogRef.value;
	if (!dialog) return;
	if (open && !dialog.open) dialog.showModal();
	else if (!open && dialog.open) dialog.close();
}

// watch tidak jalan untuk nilai awal, jadi modal yang di-render dengan
// modelValue=true harus dibuka saat mount (ref dialog baru ada saat itu).
onMounted(() => sync(props.modelValue));
watch(() => props.modelValue, sync);

// Esc memicu `cancel` lalu `close`, jadi cukup dengarkan `close` saja agar
// update:modelValue tidak terkirim dua kali. Emit hanya bila parent masih
// menganggap modal terbuka.
function onClose() {
	if (props.modelValue) emit('update:modelValue', false);
}
</script>

<template>
	<dialog
		ref="dialogRef"
		class="mjl-modal"
		:aria-labelledby="title ? titleId : undefined"
		@close="onClose"
	>
		<div class="mjl-modal__header">
			<h3
				v-if="title"
				:id="titleId"
				class="mjl-modal__title"
			>{{ title }}</h3>
			<button
				type="button"
				class="mjl-modal__close"
				aria-label="Tutup"
				@click="dialogRef?.close()"
			>✕</button>
		</div>

		<div class="mjl-modal__body">
			<slot />
		</div>

		<div
			v-if="$slots.footer"
			class="mjl-modal__footer"
		>
			<slot name="footer" />
		</div>
	</dialog>
</template>
