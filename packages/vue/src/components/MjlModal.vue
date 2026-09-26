<script setup lang="ts">
import { useId } from 'vue';
import { useDialog } from '../dialog';

export interface MjlModalProps {
	title?: string;
	/** Esc, tombol tutup, dan klik di luar menutup modal. Matikan untuk keputusan yang wajib dijawab. */
	dismissible?: boolean;
	closeLabel?: string;
	titleAs?: 'h2' | 'h3';
}

const props = withDefaults(defineProps<MjlModalProps>(), {
	title: undefined,
	dismissible: true,
	closeLabel: 'Tutup',
	titleAs: 'h2',
});

const open = defineModel<boolean>({ required: true });
const titleId = useId();
const { dialog, onClose, onCancel, onClick } = useDialog(open, { dismissible: () => props.dismissible });
</script>

<template>
	<dialog
		ref="dialog"
		class="mjl-modal"
		:aria-labelledby="title ? titleId : undefined"
		@close="onClose"
		@cancel="onCancel"
		@click="onClick"
	>
		<div
			v-if="title || dismissible"
			class="mjl-modal__header"
		>
			<component
				:is="titleAs"
				v-if="title"
				:id="titleId"
				class="mjl-modal__title"
			>
				{{ title }}
			</component>
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
