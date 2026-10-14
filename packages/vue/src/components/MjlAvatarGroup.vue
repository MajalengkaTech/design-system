<script setup lang="ts">
export interface MjlAvatarGroupProps {
	/** Ringkasan kelompok untuk pembaca layar, mis. "5 petugas menangani berkas ini". */
	label?: string;
}

defineProps<MjlAvatarGroupProps>();
</script>

<template>
	<div
		class="mjl-avatar-group"
		role="group"
		:aria-label="label"
	>
		<slot />
	</div>
</template>
