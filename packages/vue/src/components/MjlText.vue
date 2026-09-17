<script setup lang="ts">
export interface MjlTextProps {
	as?: string;
	size?: 'xs' | 'sm' | 'base' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
	heading?: boolean;
}

withDefaults(defineProps<MjlTextProps>(), {
	as: 'p',
	size: 'base',
	heading: false,
});
</script>

<template>
	<component
		:is="as"
		:class="[`mjl-text-${size}`, { 'mjl-heading': heading }]"
	>
		<slot />
	</component>
</template>
