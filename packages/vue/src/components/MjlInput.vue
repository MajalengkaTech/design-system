<script setup lang="ts">
export interface MjlInputProps {
	modelValue?: string | number;
	id?: string;
	type?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	hasError?: boolean;
	size?: 'md' | 'lg';
	describedBy?: string;
}

withDefaults(defineProps<MjlInputProps>(), {
	modelValue: '',
	type: 'text',
	disabled: false,
	required: false,
	hasError: false,
	size: 'md',
	describedBy: undefined,
});

defineEmits<{
	'update:modelValue': [value: string];
}>();
</script>

<template>
	<input
		:id="id"
		:type="type"
		:value="modelValue"
		:placeholder="placeholder"
		:disabled="disabled"
		:required="required"
		:aria-invalid="hasError ? 'true' : undefined"
		:aria-describedby="describedBy"
		:class="[
			'mjl-input',
			`mjl-input--${size}`,
			{ 'mjl-input--error': hasError },
		]"
		@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
	>
</template>
