<script setup lang="ts">
import { computed, type Component } from 'vue';
import { useLink } from '../config';

export interface MjlButtonProps {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
	size?: 'sm' | 'md' | 'lg';
	block?: boolean;
	loading?: boolean;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
	/** Tujuan tautan. Dengan plugin createMajalengka({ link: NuxtLink }), tautan internal memakai router. */
	href?: string;
	/** Sama dengan href, untuk kebiasaan Vue Router/Nuxt. */
	to?: string;
	/** Elemen atau komponen lain, kalau bukan <button> atau tautan. */
	as?: string | Component;
}

const props = withDefaults(defineProps<MjlButtonProps>(), {
	variant: 'primary',
	size: 'md',
	block: false,
	loading: false,
	disabled: false,
	type: 'button',
	href: undefined,
	to: undefined,
	as: undefined,
});

const link = useLink();
const inactive = computed(() => props.disabled || props.loading);

const root = computed(() => {
	const target = props.href ?? props.to;
	if (target) {
		// <a> tidak mengenal disabled: buang href supaya benar-benar tidak bisa diikuti
		if (inactive.value) return { is: 'a', attrs: { role: 'link', 'aria-disabled': 'true' } };
		return link(target);
	}
	if (props.as && props.as !== 'button') return { is: props.as, attrs: {} };
	return { is: 'button', attrs: { type: props.type, disabled: inactive.value } };
});
</script>

<template>
	<component
		:is="root.is"
		v-bind="root.attrs"
		:aria-busy="loading ? 'true' : undefined"
		:class="[
			'mjl-btn',
			{
				[`mjl-btn--${variant}`]: variant !== 'primary',
				[`mjl-btn--${size}`]: size !== 'md',
				'mjl-btn--block': block,
				'mjl-btn--loading': loading,
			},
		]"
	>
		<slot />
	</component>
</template>
