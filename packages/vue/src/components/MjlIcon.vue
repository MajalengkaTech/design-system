<script setup lang="ts">
export interface MjlIconProps {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

withDefaults(defineProps<MjlIconProps>(), {
	size: 'md',
});
</script>

<template>
	<span
		:class="['mjl-icon', `mjl-icon--${size}`]"
		aria-hidden="true"
	>
		<slot />
	</span>
</template>
