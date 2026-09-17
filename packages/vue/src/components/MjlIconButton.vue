<script setup lang="ts">
export interface MjlIconButtonProps {
	label: string;
	size?: 'sm' | 'md';
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
}

withDefaults(defineProps<MjlIconButtonProps>(), {
	size: 'md',
	disabled: false,
	type: 'button',
});

defineEmits<{
	click: [event: MouseEvent];
}>();
</script>

<template>
	<button
		:type="type"
		:disabled="disabled"
		:aria-label="label"
		:class="['mjl-icon-btn', { 'mjl-icon-btn--sm': size === 'sm' }]"
		@click="$emit('click', $event)"
	>
		<slot />
	</button>
</template>
