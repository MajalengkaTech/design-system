<script setup lang="ts">
import MjlModal from './MjlModal.vue';
import MjlButton from './MjlButton.vue';

export interface MjlConfirmDialogProps {
	modelValue: boolean;
	title: string;
	confirmLabel: string;
	cancelLabel?: string;
	danger?: boolean;
}

withDefaults(defineProps<MjlConfirmDialogProps>(), {
	cancelLabel: 'Batal',
	danger: false,
});

const emit = defineEmits<{
	'update:modelValue': [value: boolean];
	confirm: [];
}>();

function confirm() {
	emit('confirm');
	emit('update:modelValue', false);
}
</script>

<template>
	<MjlModal
		:model-value="modelValue"
		:title="title"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<slot />

		<template #footer>
			<MjlButton
				variant="outline"
				@click="$emit('update:modelValue', false)"
			>{{ cancelLabel }}</MjlButton>
			<MjlButton
				:variant="danger ? 'danger' : 'primary'"
				@click="confirm"
			>{{ confirmLabel }}</MjlButton>
		</template>
	</MjlModal>
</template>
