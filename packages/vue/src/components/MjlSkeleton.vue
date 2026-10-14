<script setup lang="ts">
export interface MjlSkeletonProps {
	variant?: 'text' | 'title' | 'circle' | 'block';
	width?: string;
	height?: string;
}

withDefaults(defineProps<MjlSkeletonProps>(), {
	variant: 'text',
	width: undefined,
	height: undefined,
});
</script>

<template>
	<!-- Dekoratif: status "sedang memuat" diumumkan oleh wadahnya (aria-busy), bukan tiap balok. -->
	<span
		:class="['mjl-skeleton', { [`mjl-skeleton--${variant}`]: variant !== 'block' }]"
		:style="{ width, height }"
		aria-hidden="true"
	/>
</template>
