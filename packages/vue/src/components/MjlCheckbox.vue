<script setup lang="ts">
export interface MjlCheckboxProps {
	modelValue?: boolean;
	id?: string;
	disabled?: boolean;
	required?: boolean;
}

withDefaults(defineProps<MjlCheckboxProps>(), {
	modelValue: false,
	disabled: false,
	required: false,
});

defineEmits<{
	'update:modelValue': [value: boolean];
}>();
</script>

<template>
	<label class="mjl-control-group">
		<input
			:id="id"
			type="checkbox"
			class="mjl-checkbox"
			:checked="modelValue"
			:disabled="disabled"
			:required="required"
			@change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
		>
		<span><slot /></span>
	</label>
</template>
