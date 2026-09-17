<script setup lang="ts">
export interface MjlFileUploadProps {
	id?: string;
	accept?: string;
	multiple?: boolean;
	hint?: string;
	disabled?: boolean;
}

withDefaults(defineProps<MjlFileUploadProps>(), {
	multiple: false,
	disabled: false,
});

defineEmits<{
	'update:modelValue': [files: FileList | null];
}>();
</script>

<template>
	<div class="mjl-file-upload">
		<slot>
			<p><strong>Klik untuk memilih berkas</strong> atau seret ke sini</p>
			<p
				v-if="hint"
				class="mjl-help-text"
			>{{ hint }}</p>
		</slot>
		<input
			:id="id"
			type="file"
			:accept="accept"
			:multiple="multiple"
			:disabled="disabled"
			@change="$emit('update:modelValue', ($event.target as HTMLInputElement).files)"
		>
	</div>
</template>
