<script setup lang="ts">
import { useLink } from '../config';

export interface MjlHeaderProps {
	brand?: string;
	brandHref?: string;
	navLabel?: string;
}

withDefaults(defineProps<MjlHeaderProps>(), {
	brand: undefined,
	brandHref: '/',
	navLabel: 'Menu utama',
});

const link = useLink();
</script>

<template>
	<header class="mjl-header">
		<component
			:is="link(brandHref).is"
			v-if="brand || $slots.logo"
			v-bind="link(brandHref).attrs"
			class="mjl-header__brand"
		>
			<slot name="logo">
				{{ brand }}
			</slot>
		</component>

		<nav
			v-if="$slots.default"
			class="mjl-header__nav"
			:aria-label="navLabel"
		>
			<slot />
		</nav>

		<div
			v-if="$slots.actions"
			class="mjl-header__actions"
		>
			<slot name="actions" />
		</div>
	</header>
</template>
