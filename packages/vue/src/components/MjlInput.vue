<script setup lang="ts">
import { useFieldControl } from '../field';

export interface MjlInputProps {
	id?: string;
	type?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	hasError?: boolean;
	size?: 'sm' | 'md' | 'lg';
	describedBy?: string;
}

const props = withDefaults(defineProps<MjlInputProps>(), {
	id: undefined,
	type: 'text',
	placeholder: undefined,
	disabled: false,
	required: false,
	hasError: false,
	size: 'md',
	describedBy: undefined,
});

const model = defineModel<string | number>({ default: '' });
const { id, describedBy, invalid, required } = useFieldControl(props);
</script>

<template>
	<input
		:id="id"
		v-model="model"
		:type="type"
		:placeholder="placeholder"
		:disabled="disabled"
		:required="required"
		:aria-invalid="invalid ? 'true' : undefined"
		:aria-describedby="describedBy"
		:class="[
			'mjl-input',
			{ [`mjl-input--${size}`]: size !== 'md', 'mjl-input--error': invalid },
		]"
	>
</template>
