<script setup lang="ts">
</script>

<template>
	<div
		v-if="$slots.default"
		class="mjl-divider mjl-divider--with-text"
	>
		<slot />
	</div>
	<hr
		v-else
		class="mjl-divider"
	>
</template>
