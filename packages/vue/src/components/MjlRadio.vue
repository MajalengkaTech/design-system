<script setup lang="ts">
import { useId } from 'vue';

export interface MjlRadioProps {
	value: string;
	name: string;
	id?: string;
	disabled?: boolean;
}

const props = withDefaults(defineProps<MjlRadioProps>(), {
	id: undefined,
	disabled: false,
});

const model = defineModel<string>();
const autoId = useId();
</script>

<template>
	<label
		class="mjl-control-group"
		:for="props.id ?? autoId"
	>
		<input
			:id="props.id ?? autoId"
			v-model="model"
			type="radio"
			class="mjl-radio"
			:name="name"
			:value="value"
			:disabled="disabled"
		>
		<span><slot /></span>
	</label>
</template>
