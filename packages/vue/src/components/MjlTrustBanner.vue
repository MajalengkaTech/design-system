<script setup lang="ts">
import { ref } from 'vue';

withDefaults(defineProps<{ owner: string; href?: string }>(), { href: '' });

const isOpen = ref(false);
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
				aria-controls="mjl-trust-banner-details"
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
			id="mjl-trust-banner-details"
			class="mjl-trust-banner__details"
		>
			<slot />
		</div>
	</aside>
</template>
