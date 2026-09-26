<script setup lang="ts">
import { useFieldControl } from '../field';

export interface MjlSelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface MjlSelectProps {
	id?: string;
	options?: MjlSelectOption[];
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	hasError?: boolean;
	size?: 'sm' | 'md' | 'lg';
	describedBy?: string;
}

const props = withDefaults(defineProps<MjlSelectProps>(), {
	id: undefined,
	options: () => [],
	placeholder: undefined,
	disabled: false,
	required: false,
	hasError: false,
	size: 'md',
	describedBy: undefined,
});

const model = defineModel<string>({ default: '' });
const { id, describedBy, invalid, required } = useFieldControl(props);
</script>

<template>
	<select
		:id="id"
		v-model="model"
		:disabled="disabled"
		:required="required"
		:aria-invalid="invalid ? 'true' : undefined"
		:aria-describedby="describedBy"
		:class="[
			'mjl-select',
			{ [`mjl-select--${size}`]: size !== 'md', 'mjl-select--error': invalid },
		]"
	>
		<option
			v-if="placeholder"
			value=""
			disabled
		>
			{{ placeholder }}
		</option>
		<slot>
			<option
				v-for="opt in options"
				:key="opt.value"
				:value="opt.value"
				:disabled="opt.disabled"
			>
				{{ opt.label }}
			</option>
		</slot>
	</select>
</template>
