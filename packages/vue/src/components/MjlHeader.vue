<script setup lang="ts">
export interface MjlHeaderProps {
	brand?: string;
	brandHref?: string;
}

withDefaults(defineProps<MjlHeaderProps>(), {
	brand: undefined,
	brandHref: '/',
});
</script>

<template>
	<header class="mjl-header">
		<a
			v-if="brand || $slots.logo"
			:href="brandHref"
			class="mjl-header__brand"
		>
			<slot name="logo">{{ brand }}</slot>
		</a>

		<nav
			v-if="$slots.default"
			class="mjl-header__nav"
			aria-label="Menu utama"
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
