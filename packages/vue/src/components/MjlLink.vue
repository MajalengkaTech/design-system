<script setup lang="ts">
export interface MjlLinkProps {
	href: string;
	external?: boolean;
	standalone?: boolean;
}

withDefaults(defineProps<MjlLinkProps>(), {
	external: false,
	standalone: false,
});
</script>

<template>
	<a
		:href="href"
		:target="external ? '_blank' : undefined"
		:rel="external ? 'noopener noreferrer' : undefined"
		:class="['mjl-link', { 'mjl-link--standalone': standalone }]"
	>
		<slot />
		<span
			v-if="external"
			class="sr-only"
		> (buka di tab baru)</span>
	</a>
</template>
