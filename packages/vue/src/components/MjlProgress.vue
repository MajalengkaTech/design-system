<script setup lang="ts">
import { computed } from 'vue';

export interface MjlProgressProps {
	/** Nilai saat ini. Kosongkan (atau set indeterminate) bila progres tidak diketahui. */
	value?: number;
	max?: number;
	indeterminate?: boolean;
	size?: 'sm' | 'md' | 'lg';
	/** Nama untuk pembaca layar, mis. "Unggah berkas KTP". */
	label: string;
}

const props = withDefaults(defineProps<MjlProgressProps>(), {
	value: undefined,
	max: 100,
	indeterminate: false,
	size: 'md',
});

const isIndeterminate = computed(() => props.indeterminate || props.value === undefined);
const clamped = computed(() => Math.min(Math.max(props.value ?? 0, 0), props.max));
const percent = computed(() => (props.max > 0 ? (clamped.value / props.max) * 100 : 0));
</script>

<template>
	<div
		:class="[
			'mjl-progress',
			{ 'mjl-progress--sm': size === 'sm', 'mjl-progress--lg': size === 'lg', 'mjl-progress--indeterminate': isIndeterminate },
		]"
		role="progressbar"
		:aria-label="label"
		aria-valuemin="0"
		:aria-valuemax="max"
		:aria-valuenow="isIndeterminate ? undefined : clamped"
		:aria-valuetext="isIndeterminate ? undefined : `${Math.round(percent)}%`"
	>
		<div
			class="mjl-progress__bar"
			:style="isIndeterminate ? undefined : { width: `${percent}%` }"
		/>
	</div>
</template>
