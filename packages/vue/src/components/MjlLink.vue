<script setup lang="ts">
import { computed } from 'vue';
import { useLink } from '../config';

export interface MjlLinkProps {
	href: string;
	/** Buka di tab baru. Pembaca layar diberi tahu lewat newTabLabel. */
	external?: boolean;
	standalone?: boolean;
	newTabLabel?: string;
}

const props = withDefaults(defineProps<MjlLinkProps>(), {
	external: false,
	standalone: false,
	newTabLabel: '(buka di tab baru)',
});

const link = useLink();
const root = computed(() => (props.external ? { is: 'a', attrs: { href: props.href } } : link(props.href)));
</script>

<template>
	<component
		:is="root.is"
		v-bind="root.attrs"
		:target="external ? '_blank' : undefined"
		:rel="external ? 'noopener noreferrer' : undefined"
		:class="['mjl-link', { 'mjl-link--standalone': standalone }]"
	>
		<slot />
		<span
			v-if="external"
			class="mjl-sr-only"
		> {{ newTabLabel }}</span>
	</component>
</template>
