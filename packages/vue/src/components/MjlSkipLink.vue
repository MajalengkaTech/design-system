<script setup lang="ts">
export interface MjlSkipLinkProps {
	targetId?: string;
	label?: string;
}

withDefaults(defineProps<MjlSkipLinkProps>(), {
	targetId: '#main-content',
	label: 'Langsung ke konten utama',
});
</script>

<template>
	<a
		:href="targetId"
		class="mjl-skip-link"
	>
		{{ label }}
	</a>
</template>
