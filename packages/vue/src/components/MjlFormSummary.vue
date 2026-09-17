<script setup lang="ts">
export interface MjlFormSummaryError {
	message: string;
	href: string;
}

export interface MjlFormSummaryProps {
	title?: string;
	errors: MjlFormSummaryError[];
}

withDefaults(defineProps<MjlFormSummaryProps>(), {
	title: 'Periksa kembali isian berikut:',
});
</script>

<template>
	<div
		v-if="errors.length"
		class="mjl-form-summary"
		role="alert"
		tabindex="-1"
	>
		<p class="mjl-form-summary__title">{{ title }}</p>
		<ul class="mjl-form-summary__list">
			<li
				v-for="(error, i) in errors"
				:key="i"
			>
				<a :href="error.href">{{ error.message }}</a>
			</li>
		</ul>
	</div>
</template>
