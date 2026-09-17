<script setup lang="ts">
import { ref, watch } from 'vue';

export interface MjlModalProps {
	modelValue: boolean;
	title?: string;
}

const props = defineProps<MjlModalProps>();

const emit = defineEmits<{
	'update:modelValue': [value: boolean];
}>();

const dialogRef = ref<HTMLDialogElement>();

watch(() => props.modelValue, (open) => {
	if (open) dialogRef.value?.showModal();
	else dialogRef.value?.close();
});

function onClose() {
	emit('update:modelValue', false);
}
</script>

<template>
	<dialog
		ref="dialogRef"
		class="mjl-modal"
		:aria-labelledby="title ? 'mjl-modal-title' : undefined"
		@close="onClose"
		@cancel="onClose"
	>
		<div class="mjl-modal__header">
			<h3
				v-if="title"
				id="mjl-modal-title"
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
