<script setup lang="ts">
export interface MjlRadioProps {
	modelValue?: string;
	value: string;
	name: string;
	id?: string;
	disabled?: boolean;
}

withDefaults(defineProps<MjlRadioProps>(), {
	modelValue: undefined,
	disabled: false,
});

defineEmits<{
	'update:modelValue': [value: string];
}>();
</script>

<template>
	<label class="mjl-control-group">
		<input
			:id="id"
			type="radio"
			class="mjl-radio"
			:name="name"
			:value="value"
			:checked="modelValue === value"
			:disabled="disabled"
			@change="$emit('update:modelValue', value)"
		>
		<span><slot /></span>
	</label>
</template>
