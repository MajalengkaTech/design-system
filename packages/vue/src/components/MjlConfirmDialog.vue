<script setup lang="ts">
import MjlButton from './MjlButton.vue';
import MjlModal from './MjlModal.vue';

export interface MjlConfirmDialogProps {
	title: string;
	/** Wajib menyebut tindakannya, mis. "Ya, batalkan pengajuan", bukan "Ya". */
	confirmLabel: string;
	cancelLabel?: string;
	danger?: boolean;
}

withDefaults(defineProps<MjlConfirmDialogProps>(), {
	cancelLabel: 'Batal',
	danger: false,
});

const open = defineModel<boolean>({ required: true });
const emit = defineEmits<{ confirm: [] }>();

function confirm() {
	emit('confirm');
	open.value = false;
}
</script>

<template>
	<MjlModal
		v-model="open"
		:title="title"
	>
		<slot />
		<template #footer>
			<MjlButton
				variant="secondary"
				@click="open = false"
			>
				{{ cancelLabel }}
			</MjlButton>
			<MjlButton
				:variant="danger ? 'danger' : 'primary'"
				@click="confirm"
			>
				{{ confirmLabel }}
			</MjlButton>
		</template>
	</MjlModal>
</template>
