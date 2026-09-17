<script setup lang="ts">
export interface MjlTextareaProps {
	modelValue?: string;
	id?: string;
	placeholder?: string;
	rows?: number;
	disabled?: boolean;
	required?: boolean;
	hasError?: boolean;
	maxlength?: number;
	describedBy?: string;
}

withDefaults(defineProps<MjlTextareaProps>(), {
	modelValue: '',
	rows: 4,
	disabled: false,
	required: false,
	hasError: false,
	maxlength: undefined,
	describedBy: undefined,
});

defineEmits<{
	'update:modelValue': [value: string];
}>();
</script>

<template>
	<textarea
		:id="id"
		:value="modelValue"
		:placeholder="placeholder"
		:rows="rows"
		:disabled="disabled"
		:required="required"
		:maxlength="maxlength"
		:aria-invalid="hasError ? 'true' : undefined"
		:aria-describedby="describedBy"
		:class="['mjl-textarea', { 'mjl-textarea--error': hasError }]"
		@input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
	/>
</template>
