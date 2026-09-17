<script setup lang="ts">
export interface MjlSpinnerProps {
	size?: 'sm' | 'md' | 'lg';
	white?: boolean;
	label?: string;
}

withDefaults(defineProps<MjlSpinnerProps>(), {
	size: 'md',
	white: false,
	label: 'Memuat...',
});
</script>

<template>
	<span
		role="status"
		:class="[
			'mjl-spinner',
			{
				'mjl-spinner--sm': size === 'sm',
				'mjl-spinner--lg': size === 'lg',
				'mjl-spinner--white': white,
			},
		]"
	>
		<span class="sr-only">{{ label }}</span>
	</span>
</template>
