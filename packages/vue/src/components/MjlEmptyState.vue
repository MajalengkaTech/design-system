<script setup lang="ts">
export interface MjlEmptyStateProps {
	title: string;
	description?: string;
	/** Level heading judul, sesuaikan dengan struktur halaman. */
	titleAs?: 'h2' | 'h3' | 'h4' | 'p';
}

withDefaults(defineProps<MjlEmptyStateProps>(), { description: undefined, titleAs: 'h3' });
</script>

<template>
	<div class="mjl-empty-state">
		<div
			v-if="$slots.icon"
			class="mjl-empty-state__icon"
		>
			<slot name="icon" />
		</div>
		<component
			:is="titleAs"
			class="mjl-empty-state__title"
		>
			{{ title }}
		</component>
		<p
			v-if="description"
			class="mjl-empty-state__desc"
		>{{ description }}</p>
		<slot />
	</div>
</template>
