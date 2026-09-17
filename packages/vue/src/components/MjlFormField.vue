<script setup lang="ts">
export interface MjlFormFieldProps {
	id: string;
	label: string;
	required?: boolean;
	optional?: boolean;
	helpText?: string;
	errorText?: string;
}

defineProps<MjlFormFieldProps>();
</script>

<template>
	<div class="mjl-form-field">
		<label
			:for="id"
			class="mjl-label"
		>
			{{ label }}
			<span
				v-if="required"
				class="mjl-label__required"
				aria-hidden="true"
			>*</span>
			<span
				v-else-if="optional"
				class="mjl-label__optional"
			>(Opsional)</span>
		</label>

		<slot
			:id="id"
			:has-error="!!errorText"
			:described-by="errorText ? `${id}-error` : (helpText ? `${id}-help` : undefined)"
		/>

		<p
			v-if="helpText && !errorText"
			:id="`${id}-help`"
			class="mjl-help-text"
		>
			{{ helpText }}
		</p>

		<p
			v-if="errorText"
			:id="`${id}-error`"
			class="mjl-error-text"
			role="alert"
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<circle cx="12" cy="12" r="10" />
				<line x1="12" y1="8" x2="12" y2="12" />
				<line x1="12" y1="16" x2="12.01" y2="16" />
			</svg>
			{{ errorText }}
		</p>
	</div>
</template>
