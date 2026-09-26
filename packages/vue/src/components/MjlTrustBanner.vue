<script setup lang="ts">
import { ref, useId } from 'vue';

export interface MjlTrustBannerProps {
	/** Wajib: nama pengelola situs yang sebenarnya. Tidak ada teks bawaan. */
	owner: string;
	/** Tautan "tentang", dipakai kalau slot default kosong. */
	href?: string;
	prefix?: string;
	toggleLabel?: string;
	label?: string;
}

withDefaults(defineProps<MjlTrustBannerProps>(), {
	href: undefined,
	prefix: 'Situs ini dikelola oleh',
	toggleLabel: 'Cara memastikan',
	label: 'Informasi pengelola situs',
});

const isOpen = ref(false);
const detailsId = useId();
</script>

<template>
	<aside
		class="mjl-trust-banner"
		:aria-label="label"
	>
		<div class="mjl-trust-banner__inner">
			<span class="mjl-trust-banner__text">
				{{ prefix }} <strong>{{ owner }}</strong>
			</span>
			<button
				v-if="$slots.default"
				type="button"
				class="mjl-trust-banner__toggle"
				:aria-expanded="isOpen"
				:aria-controls="detailsId"
				@click="isOpen = !isOpen"
			>
				{{ toggleLabel }}
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
					:style="{ transform: isOpen ? 'rotate(180deg)' : undefined }"
				><polyline points="6 9 12 15 18 9" /></svg>
			</button>
			<a
				v-else-if="href"
				:href="href"
				class="mjl-trust-banner__toggle"
			>{{ toggleLabel }}</a>
		</div>

		<div
			v-if="$slots.default"
			v-show="isOpen"
			:id="detailsId"
			class="mjl-trust-banner__details"
		>
			<slot />
		</div>
	</aside>
</template>
