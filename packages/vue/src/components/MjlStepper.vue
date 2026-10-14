<script setup lang="ts">
export interface StepItem {
	id: string | number;
	title: string;
	desc?: string;
}

export interface MjlStepperProps {
	steps: StepItem[];
	currentStepIndex: number;
	/** Nama daftar tahapan untuk pembaca layar. */
	label?: string;
}

withDefaults(defineProps<MjlStepperProps>(), {
	label: 'Tahapan pengajuan',
});

function status(index: number, current: number) {
	if (index < current) return 'completed';
	if (index === current) return 'current';
	return 'upcoming';
}

const srStatus = {
	completed: 'Selesai: ',
	current: 'Tahap saat ini: ',
	upcoming: 'Belum dimulai: ',
} as const;
</script>

<template>
	<ol
		class="mjl-stepper"
		:aria-label="label"
	>
		<li
			v-for="(step, index) in steps"
			:key="step.id"
			:class="[
				'mjl-stepper__item',
				{
					'mjl-stepper__item--completed': index < currentStepIndex,
					'mjl-stepper__item--current': index === currentStepIndex,
				},
			]"
			:aria-current="index === currentStepIndex ? 'step' : undefined"
		>
			<span
				class="mjl-stepper__indicator"
				aria-hidden="true"
			>
				<svg
					v-if="index < currentStepIndex"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="20 6 9 17 4 12" />
				</svg>
				<template v-else>{{ index + 1 }}</template>
			</span>

			<div class="mjl-stepper__content">
				<span class="mjl-stepper__title">
					<span class="sr-only">{{ srStatus[status(index, currentStepIndex)] }}</span>{{ step.title }}
				</span>
				<span
					v-if="step.desc"
					class="mjl-stepper__desc"
				>{{ step.desc }}</span>
			</div>
		</li>
	</ol>
</template>
