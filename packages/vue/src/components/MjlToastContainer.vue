<script setup lang="ts">
export interface MjlToastContainerProps {
	label?: string;
}

withDefaults(defineProps<MjlToastContainerProps>(), {
	label: 'Notifikasi',
});
</script>

<template>
	<!--
		Region live harus sudah ada di DOM SEBELUM toast disisipkan agar pembaca
		layar mengumumkannya — render container ini sekali di layout, lalu
		tambahkan/hapus <MjlToast> di dalamnya.
	-->
	<div
		class="mjl-toast-container"
		role="region"
		:aria-label="label"
		aria-live="polite"
		aria-relevant="additions"
	>
		<slot />
	</div>
</template>
