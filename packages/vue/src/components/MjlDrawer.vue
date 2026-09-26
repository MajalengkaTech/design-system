<script setup lang="ts">
import { useId } from 'vue';
import { useDialog } from '../dialog';

export interface MjlDrawerProps {
	title: string;
	side?: 'right' | 'left' | 'bottom';
	dismissible?: boolean;
	closeLabel?: string;
}

const props = withDefaults(defineProps<MjlDrawerProps>(), {
	side: 'right',
	dismissible: true,
	closeLabel: 'Tutup',
});

const open = defineModel<boolean>({ required: true });
const titleId = useId();
const { dialog, onClose, onCancel, onClick } = useDialog(open, { dismissible: () => props.dismissible });
</script>

<template>
	<dialog
		ref="dialog"
		:class="['mjl-drawer', `mjl-drawer--${side}`]"
		:aria-labelledby="titleId"
		@close="onClose"
		@cancel="onCancel"
		@click="onClick"
	>
		<div class="mjl-drawer__header">
			<h2
				:id="titleId"
				class="mjl-drawer__title"
			>
				{{ title }}
			</h2>
			<button
				v-if="dismissible"
				type="button"
				class="mjl-modal__close"
				:aria-label="closeLabel"
				@click="open = false"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					aria-hidden="true"
				><path d="M18 6 6 18M6 6l12 12" /></svg>
			</button>
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
	</dialog>
</template>
