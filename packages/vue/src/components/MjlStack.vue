<script setup lang="ts">
export interface MjlStackProps {
	gap?: 'sm' | 'md' | 'lg';
}

withDefaults(defineProps<MjlStackProps>(), {
	gap: 'md',
});
</script>

<template>
	<div :class="['mjl-stack', { 'mjl-stack--sm': gap === 'sm', 'mjl-stack--lg': gap === 'lg' }]">
		<slot />
	</div>
</template>
