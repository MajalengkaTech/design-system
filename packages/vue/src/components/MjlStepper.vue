<script setup lang="ts">
export interface StepItem {
	id: string | number;
	title: string;
	desc?: string;
}

export interface MjlStepperProps {
	steps: StepItem[];
	currentStepIndex: number;
}

defineProps<MjlStepperProps>();
</script>

<template>
	<nav
		class="mjl-stepper"
		aria-label="Tahapan pengajuan formulir"
	>
		<div
			v-for="(step, index) in steps"
			:key="step.id"
			:class="[
				'mjl-step',
				{
					'mjl-step--completed': index < currentStepIndex,
					'mjl-step--current': index === currentStepIndex,
					'mjl-step--upcoming': index > currentStepIndex,
				},
			]"
			:aria-current="index === currentStepIndex ? 'step' : undefined"
		>
			<div
				class="mjl-step-indicator"
				aria-hidden="true"
			>
				<template v-if="index < currentStepIndex">
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="20 6 9 17 4 12" />
					</svg>
				</template>
				<template v-else>
					{{ index + 1 }}
				</template>
			</div>

			<div class="mjl-step-content">
				<span class="mjl-step-title">{{ step.title }}</span>
				<span
					v-if="step.desc"
					class="mjl-step-desc"
				>{{ step.desc }}</span>
			</div>
		</div>
	</nav>
</template>
