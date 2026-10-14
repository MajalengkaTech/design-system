<script setup lang="ts">
export interface MjlSwitchProps {
	label?: string;
	disabled?: boolean;
}

withDefaults(defineProps<MjlSwitchProps>(), {
	label: undefined,
	disabled: false,
});

const model = defineModel<boolean>({ default: false });

// Atribut (id, name, aria-describedby, ...) diteruskan ke <input>, bukan ke <label>.
defineOptions({ inheritAttrs: false });
</script>

<template>
	<label :class="['mjl-switch', { 'mjl-switch--disabled': disabled }]">
		<input
			v-bind="$attrs"
			v-model="model"
			type="checkbox"
			role="switch"
			class="mjl-switch__input"
			:disabled="disabled"
		>
		<span
			class="mjl-switch__track"
			aria-hidden="true"
		>
			<span class="mjl-switch__thumb" />
		</span>
		<span><slot>{{ label }}</slot></span>
	</label>
</template>
