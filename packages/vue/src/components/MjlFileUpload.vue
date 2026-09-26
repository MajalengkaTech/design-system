<script setup lang="ts">
import { useFieldControl } from '../field';

export interface MjlFileUploadProps {
	id?: string;
	accept?: string;
	multiple?: boolean;
	hint?: string;
	disabled?: boolean;
	required?: boolean;
	hasError?: boolean;
	describedBy?: string;
	/** Teks ajakan di area unggah. */
	label?: string;
}

const props = withDefaults(defineProps<MjlFileUploadProps>(), {
	id: undefined,
	accept: undefined,
	multiple: false,
	hint: undefined,
	disabled: false,
	required: false,
	hasError: false,
	describedBy: undefined,
	label: 'Pilih berkas atau seret ke sini',
});

const emit = defineEmits<{
	'update:modelValue': [files: FileList | null];
}>();

const { id, describedBy, invalid, required } = useFieldControl(props);
</script>

<template>
	<label
		:for="id"
		class="mjl-file-upload"
	>
		<!-- <label> membuat seluruh area bisa diklik dan memberi nama pada input -->
		<slot>
			<span class="mjl-file-upload__label">{{ label }}</span>
			<span
				v-if="hint"
				class="mjl-file-upload__hint"
			>{{ hint }}</span>
		</slot>
		<input
			:id="id"
			type="file"
			:accept="accept"
			:multiple="multiple"
			:disabled="disabled"
			:required="required"
			:aria-invalid="invalid ? 'true' : undefined"
			:aria-describedby="describedBy"
			@change="emit('update:modelValue', ($event.target as HTMLInputElement).files)"
		>
	</label>
</template>
