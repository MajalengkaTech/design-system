<script setup lang="ts">
export interface MjlInputGroupProps {
	/** Teks tempelan di kiri input, mis. "Rp" atau "+62". */
	prefix?: string;
	/** Teks tempelan di kanan input, mis. "kg". */
	suffix?: string;
}

defineProps<MjlInputGroupProps>();
</script>

<template>
	<div class="mjl-input-group">
		<span
			v-if="prefix || $slots.prefix"
			class="mjl-input-group__addon"
		>
			<slot name="prefix">{{ prefix }}</slot>
		</span>
		<slot />
		<span
			v-if="suffix || $slots.suffix"
			class="mjl-input-group__addon"
		>
			<slot name="suffix">{{ suffix }}</slot>
		</span>
	</div>
</template>
