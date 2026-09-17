<script setup lang="ts">
export interface MjlErrorPageProps {
	code: '404' | '403' | '500' | 'maintenance';
	title: string;
	description?: string;
}

defineProps<MjlErrorPageProps>();
</script>

<template>
	<div class="mjl-error-page">
		<p class="mjl-error-page__code">{{ code === 'maintenance' ? '🛠' : code }}</p>
		<h1 class="mjl-error-page__title">{{ title }}</h1>
		<p
			v-if="description"
			class="mjl-error-page__desc"
		>{{ description }}</p>
		<slot />
	</div>
</template>
