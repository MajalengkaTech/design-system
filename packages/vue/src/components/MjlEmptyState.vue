<script setup lang="ts">
export interface MjlEmptyStateProps {
	title: string;
	description?: string;
}

defineProps<MjlEmptyStateProps>();
</script>

<template>
	<div class="mjl-empty-state">
		<div
			v-if="$slots.icon"
			class="mjl-empty-state__icon"
		>
			<slot name="icon" />
		</div>
		<h3 class="mjl-empty-state__title">{{ title }}</h3>
		<p
			v-if="description"
			class="mjl-empty-state__desc"
		>{{ description }}</p>
		<slot />
	</div>
</template>
