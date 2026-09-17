<script setup lang="ts">
export interface MjlFieldsetProps {
	legend: string;
}

defineProps<MjlFieldsetProps>();
</script>

<template>
	<fieldset class="mjl-fieldset">
		<legend class="mjl-fieldset__legend">{{ legend }}</legend>
		<slot />
	</fieldset>
</template>
