<script setup lang="ts">
export interface MjlBannerProps {
	variant?: 'info' | 'warning' | 'danger';
	/** Nama landmark untuk pembaca layar. */
	label?: string;
}

withDefaults(defineProps<MjlBannerProps>(), {
	variant: 'info',
	label: 'Pengumuman',
});
</script>

<template>
	<section
		:class="['mjl-banner', `mjl-banner--${variant}`]"
		:aria-label="label"
	>
		<div class="mjl-banner__content">
			<slot />
		</div>
		<slot name="action" />
	</section>
</template>
