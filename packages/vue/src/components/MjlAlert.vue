<script setup lang="ts">
import { computed } from 'vue';

export interface MjlAlertProps {
	variant?: 'info' | 'success' | 'warning' | 'danger';
	title?: string;
	dismissible?: boolean;
	closeLabel?: string;
	/**
	 * Umumkan ke pembaca layar saat alert muncul setelah halaman dimuat
	 * (mis. hasil kirim formulir). Alert yang sudah ada sejak awal tidak perlu.
	 */
	live?: boolean;
}

const props = withDefaults(defineProps<MjlAlertProps>(), {
	variant: 'info',
	title: undefined,
	dismissible: false,
	closeLabel: 'Tutup pesan',
	live: false,
});

defineEmits<{
	dismiss: [];
}>();

// danger → alert (langsung dibacakan), lainnya → status (sopan)
const role = computed(() => (props.live ? (props.variant === 'danger' ? 'alert' : 'status') : undefined));
</script>

<template>
	<div
		:class="['mjl-alert', `mjl-alert--${variant}`]"
		:role="role"
	>
		<div
			class="mjl-alert__icon"
			aria-hidden="true"
		>
			<svg
				v-if="variant === 'success'"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="20 6 9 17 4 12" />
			</svg>
			<svg
				v-else-if="variant === 'warning'"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
				<line x1="12" y1="9" x2="12" y2="13" />
				<line x1="12" y1="17" x2="12.01" y2="17" />
			</svg>
			<svg
				v-else-if="variant === 'danger'"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<line x1="15" y1="9" x2="9" y2="15" />
				<line x1="9" y1="9" x2="15" y2="15" />
			</svg>
			<svg
				v-else
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<line x1="12" y1="16" x2="12" y2="12" />
				<line x1="12" y1="8" x2="12.01" y2="8" />
			</svg>
		</div>

		<div class="mjl-alert__content">
			<div
				v-if="title"
				class="mjl-alert__title"
			>
				{{ title }}
			</div>
			<slot />
		</div>

		<button
			v-if="dismissible"
			type="button"
			class="mjl-alert__close"
			:aria-label="closeLabel"
			@click="$emit('dismiss')"
		>
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				aria-hidden="true"
			><path d="M18 6 6 18M6 6l12 12" /></svg>
		</button>
	</div>
</template>
