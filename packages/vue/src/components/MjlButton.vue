<script setup lang="ts">
export interface MjlButtonProps {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
	size?: 'sm' | 'md' | 'lg';
	block?: boolean;
	loading?: boolean;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
	as?: string;
	to?: string;
	href?: string;
}

const props = withDefaults(defineProps<MjlButtonProps>(), {
	variant: 'primary',
	size: 'md',
	block: false,
	loading: false,
	disabled: false,
	type: 'button',
	as: 'button',
});

defineEmits<{
	click: [event: MouseEvent];
}>();
</script>

<template>
	<component
		:is="props.href ? 'a' : props.as"
		:href="props.href"
		:type="props.href ? undefined : props.type"
		:disabled="props.disabled || props.loading"
		:aria-disabled="props.disabled || props.loading"
		:aria-busy="props.loading ? 'true' : undefined"
		:class="[
			'mjl-btn',
			`mjl-btn--${props.variant}`,
			`mjl-btn--${props.size}`,
			{
				'mjl-btn--block': props.block,
				'mjl-btn--loading': props.loading,
			},
		]"
		@click="$emit('click', $event)"
	>
		<slot />
	</component>
</template>
