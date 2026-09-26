<script setup lang="ts">
import { useFieldControl } from '../field';

export interface MjlTextareaProps {
	id?: string;
	placeholder?: string;
	rows?: number;
	disabled?: boolean;
	required?: boolean;
	hasError?: boolean;
	maxlength?: number;
	describedBy?: string;
}

const props = withDefaults(defineProps<MjlTextareaProps>(), {
	id: undefined,
	placeholder: undefined,
	rows: 4,
	disabled: false,
	required: false,
	hasError: false,
	maxlength: undefined,
	describedBy: undefined,
});

const model = defineModel<string>({ default: '' });
const { id, describedBy, invalid, required } = useFieldControl(props);
</script>

<template>
	<textarea
		:id="id"
		v-model="model"
		:placeholder="placeholder"
		:rows="rows"
		:disabled="disabled"
		:required="required"
		:maxlength="maxlength"
		:aria-invalid="invalid ? 'true' : undefined"
		:aria-describedby="describedBy"
		:class="['mjl-textarea', { 'mjl-textarea--error': invalid }]"
	/>
</template>
