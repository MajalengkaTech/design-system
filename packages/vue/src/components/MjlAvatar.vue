<script setup lang="ts">
import { computed, ref, watch } from 'vue';

export interface MjlAvatarProps {
	src?: string;
	/** Nama pemilik avatar: dipakai sebagai alt gambar dan sumber inisial cadangan. */
	name: string;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	circle?: boolean;
	/** True bila nama sudah tertulis di sebelah avatar (mis. di MjlUser) agar tidak dibacakan dua kali. */
	decorative?: boolean;
}

const props = withDefaults(defineProps<MjlAvatarProps>(), {
	src: undefined,
	size: 'md',
	circle: true,
	decorative: false,
});

const failed = ref(false);
watch(() => props.src, () => {
	failed.value = false;
});

const initials = computed(() =>
	props.name
		.trim()
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0])
		.join(''),
);
</script>

<template>
	<span
		:class="['mjl-avatar', `mjl-avatar--${size}`, { 'mjl-avatar--circle': circle }]"
		:role="decorative ? undefined : 'img'"
		:aria-label="decorative ? undefined : name"
		:aria-hidden="decorative ? 'true' : undefined"
	>
		<img
			v-if="src && !failed"
			:src="src"
			alt=""
			class="mjl-avatar__image"
			@error="failed = true"
		>
		<span
			v-else
			class="mjl-avatar__fallback"
			aria-hidden="true"
		>{{ initials }}</span>
	</span>
</template>
