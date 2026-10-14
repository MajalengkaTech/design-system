<script setup lang="ts">
export interface MjlButtonGroupProps {
	/** Nama kelompok untuk pembaca layar, mis. "Format tampilan". */
	label?: string;
}

defineProps<MjlButtonGroupProps>();
</script>

<template>
	<div
		class="mjl-btn-group"
		role="group"
		:aria-label="label"
	>
		<slot />
	</div>
</template>
