<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';

export interface MjlFormSummaryError {
	message: string;
	/** Tautan ke kolom yang salah, mis. "#nik". */
	href: string;
}

export interface MjlFormSummaryProps {
	title?: string;
	errors: MjlFormSummaryError[];
	/** Pindahkan fokus ke ringkasan saat error muncul (pola GOV.UK). */
	focusOnError?: boolean;
	titleAs?: 'h2' | 'h3';
}

const props = withDefaults(defineProps<MjlFormSummaryProps>(), {
	title: 'Periksa kembali isian berikut',
	focusOnError: true,
	titleAs: 'h2',
});

const root = ref<HTMLElement>();

// Pembaca layar langsung membacakan ringkasan, dan Tab berikutnya ke tautan kolom yang salah
async function focus() {
	if (!props.focusOnError || !props.errors.length) return;
	await nextTick();
	root.value?.focus();
}

onMounted(focus);
watch(() => props.errors.length, (now, before) => {
	if (now > 0 && (before ?? 0) === 0) focus();
});
</script>

<template>
	<div
		v-if="errors.length"
		ref="root"
		class="mjl-form-summary"
		role="alert"
		tabindex="-1"
	>
		<component
			:is="titleAs"
			class="mjl-form-summary__title"
		>
			{{ title }}
		</component>
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
