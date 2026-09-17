<script setup lang="ts">
export interface MjlContainerProps {
	as?: string;
}

withDefaults(defineProps<MjlContainerProps>(), {
	as: 'div',
});
</script>

<template>
	<component
		:is="as"
		class="mjl-container"
	>
		<slot />
	</component>
</template>
