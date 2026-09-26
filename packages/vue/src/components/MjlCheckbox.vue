<script setup lang="ts">
import { useId } from 'vue';

export interface MjlCheckboxProps {
	id?: string;
	disabled?: boolean;
	required?: boolean;
	hasError?: boolean;
	describedBy?: string;
}

const props = withDefaults(defineProps<MjlCheckboxProps>(), {
	id: undefined,
	disabled: false,
	required: false,
	hasError: false,
	describedBy: undefined,
});

const model = defineModel<boolean>({ default: false });
const autoId = useId();
</script>

<template>
	<label
		class="mjl-control-group"
		:for="props.id ?? autoId"
	>
		<!-- Label membungkus input, jadi seluruh baris (min. 44px) bisa diklik -->
		<input
			:id="props.id ?? autoId"
			v-model="model"
			type="checkbox"
			class="mjl-checkbox"
			:disabled="disabled"
			:required="required"
			:aria-invalid="hasError ? 'true' : undefined"
			:aria-describedby="describedBy"
		>
		<span><slot /></span>
	</label>
</template>
