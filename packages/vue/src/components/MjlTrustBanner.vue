<script setup lang="ts">
import { ref, useId } from 'vue';

withDefaults(defineProps<{ owner: string; href?: string }>(), { href: '' });

const isOpen = ref(false);
// ID unik per instance agar aria-controls tidak bentrok bila banner dipakai lebih dari sekali.
const detailsId = useId();
const toggle = () => {
	isOpen.value = !isOpen.value;
};
</script>

<template>
	<aside class="mjl-trust-banner" aria-label="Informasi pengelola situs">
		<div class="mjl-trust-banner__inner">
			<span class="mjl-trust-banner__text">
				Situs ini dikelola oleh <strong>{{ owner }}</strong>
			</span>
			<button
				v-if="$slots.default"
				type="button"
				class="mjl-trust-banner__toggle"
				:aria-expanded="isOpen"
				:aria-controls="detailsId"
				@click="toggle"
			>
				Cara memastikan
				<span aria-hidden="true">{{ isOpen ? '▲' : '▼' }}</span>
			</button>
			<a v-else-if="href" :href="href" class="mjl-trust-banner__toggle">Cara memastikan</a>
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
