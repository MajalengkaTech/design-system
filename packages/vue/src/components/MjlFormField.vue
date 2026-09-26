<script setup lang="ts">
import { computed, provide, useId } from 'vue';
import { FIELD_KEY } from '../field';

export interface MjlFormFieldProps {
	label: string;
	/** Opsional; dibuat otomatis kalau kosong. */
	id?: string;
	required?: boolean;
	optional?: boolean;
	helpText?: string;
	errorText?: string;
	/** Teks penanda kolom opsional. Default "(opsional)". */
	optionalLabel?: string;
}

const props = withDefaults(defineProps<MjlFormFieldProps>(), {
	id: undefined,
	required: false,
	optional: false,
	helpText: undefined,
	errorText: undefined,
	optionalLabel: '(opsional)',
});

const autoId = useId();
const fieldId = computed(() => props.id ?? autoId);
const helpId = computed(() => `${fieldId.value}-bantuan`);
const errorId = computed(() => `${fieldId.value}-error`);

// Teks bantuan tetap tampil saat error: petunjuk format paling dibutuhkan ketika isian ditolak
const describedBy = computed(() =>
	[props.helpText && helpId.value, props.errorText && errorId.value].filter(Boolean).join(' ') || undefined,
);
const invalid = computed(() => !!props.errorText);

provide(FIELD_KEY, {
	id: fieldId,
	describedBy,
	invalid,
	required: computed(() => props.required),
});
</script>

<template>
	<div class="mjl-form-field">
		<label
			:for="fieldId"
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
			>{{ optionalLabel }}</span>
		</label>

		<p
			v-if="helpText"
			:id="helpId"
			class="mjl-help-text"
		>
			{{ helpText }}
		</p>

		<p
			v-if="errorText"
			:id="errorId"
			class="mjl-error-text"
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

		<!-- Slot props tetap disediakan untuk kontrol buatan sendiri -->
		<slot
			:id="fieldId"
			:has-error="invalid"
			:described-by="describedBy"
		/>
	</div>
</template>
