<script setup lang="ts">
export interface StepItem {
	id: string | number;
	title: string;
	desc?: string;
}

export interface MjlStepperProps {
	steps: StepItem[];
	currentStepIndex: number;
	label?: string;
	/** Status yang dibacakan pembaca layar; tanda centang dan warna saja tidak cukup. */
	completedLabel?: string;
}

withDefaults(defineProps<MjlStepperProps>(), {
	label: 'Tahapan pengajuan',
	completedLabel: 'selesai',
});
</script>

<template>
	<nav :aria-label="label">
		<ol class="mjl-stepper">
			<li
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
				<span
					class="mjl-step-indicator"
					aria-hidden="true"
				>
					<svg
						v-if="index < currentStepIndex"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					><polyline points="20 6 9 17 4 12" /></svg>
					<template v-else>{{ index + 1 }}</template>
				</span>

				<span class="mjl-step-content">
					<span class="mjl-step-title">
						{{ step.title }}
						<span
							v-if="index < currentStepIndex"
							class="mjl-sr-only"
						>({{ completedLabel }})</span>
					</span>
					<span
						v-if="step.desc"
						class="mjl-step-desc"
					>{{ step.desc }}</span>
				</span>
			</li>
		</ol>
	</nav>
</template>
