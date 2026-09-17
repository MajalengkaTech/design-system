<script setup lang="ts">
export interface MjlSelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface MjlSelectProps {
	modelValue?: string;
	id?: string;
	options?: MjlSelectOption[];
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	hasError?: boolean;
	size?: 'md' | 'lg';
	describedBy?: string;
}

withDefaults(defineProps<MjlSelectProps>(), {
	modelValue: '',
	options: () => [],
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
	<select
		:id="id"
		:value="modelValue"
		:disabled="disabled"
		:required="required"
		:aria-invalid="hasError ? 'true' : undefined"
		:aria-describedby="describedBy"
		:class="[
			'mjl-select',
			`mjl-select--${size}`,
			{ 'mjl-select--error': hasError },
		]"
		@change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
	>
		<option
			v-if="placeholder"
			value=""
			disabled
			:selected="!modelValue"
		>{{ placeholder }}</option>
		<slot>
			<option
				v-for="opt in options"
				:key="opt.value"
				:value="opt.value"
				:disabled="opt.disabled"
			>{{ opt.label }}</option>
		</slot>
	</select>
</template>
