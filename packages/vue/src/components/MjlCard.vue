<script setup lang="ts">
import { computed } from 'vue';
import { useLink } from '../config';

export interface MjlCardProps {
	title?: string;
	desc?: string;
	/** Seluruh kartu menjadi tautan. */
	href?: string;
	interactive?: boolean;
	as?: string;
	/** Level heading judul, sesuaikan dengan struktur halaman. */
	titleAs?: 'h2' | 'h3' | 'h4' | 'p';
}

const props = withDefaults(defineProps<MjlCardProps>(), {
	title: undefined,
	desc: undefined,
	href: undefined,
	interactive: false,
	as: 'div',
	titleAs: 'h3',
});

const link = useLink();
const root = computed(() => (props.href ? link(props.href) : { is: props.as, attrs: {} }));
</script>

<template>
	<component
		:is="root.is"
		v-bind="root.attrs"
		:class="['mjl-card', { 'mjl-card--interactive': interactive || !!href }]"
	>
		<div
			v-if="title || desc || $slots.header"
			class="mjl-card__header"
		>
			<slot name="header">
				<component
					:is="titleAs"
					v-if="title"
					class="mjl-card__title"
				>
					{{ title }}
				</component>
				<p
					v-if="desc"
					class="mjl-card__desc"
				>
					{{ desc }}
				</p>
			</slot>
		</div>

		<slot />

		<div
			v-if="$slots.footer"
			class="mjl-card__footer"
		>
			<slot name="footer" />
		</div>
	</component>
</template>
