<script setup lang="ts">
export interface MjlSliderProps {
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	/** Nilai yang dibacakan pembaca layar, mis. "Rp 500.000". Default: angka mentah. */
	valueText?: string;
}

withDefaults(defineProps<MjlSliderProps>(), {
	min: 0,
	max: 100,
	step: 1,
	disabled: false,
	valueText: undefined,
});

const model = defineModel<number>({ default: 0 });
</script>

<template>
	<!-- Hubungkan dengan label lewat id (MjlFormField) atau aria-label. -->
	<input
		v-model.number="model"
		type="range"
		class="mjl-slider"
		:min="min"
		:max="max"
		:step="step"
		:disabled="disabled"
		:aria-valuetext="valueText"
	>
</template>
