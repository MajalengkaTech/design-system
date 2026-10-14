<script setup lang="ts">
import { computed } from 'vue';

export interface MjlChipProps {
	/** Angka yang ditampilkan. Diabaikan bila `dot`. */
	count?: number;
	/** Angka di atas batas ini ditampilkan sebagai "99+". */
	max?: number;
	dot?: boolean;
	variant?: 'danger' | 'success' | 'primary';
	/** Teks untuk pembaca layar, mis. "3 notifikasi belum dibaca". Wajib karena chip hanya visual. */
	label: string;
}

const props = withDefaults(defineProps<MjlChipProps>(), {
	count: undefined,
	max: 99,
	dot: false,
	variant: 'danger',
});

const display = computed(() => {
	if (props.dot || props.count === undefined) return '';
	return props.count > props.max ? `${props.max}+` : String(props.count);
});
const visible = computed(() => props.dot || (props.count ?? 0) > 0);
</script>

<template>
	<span class="mjl-chip-wrapper">
		<slot />
		<template v-if="visible">
			<span
				:class="[
					'mjl-chip',
					{ 'mjl-chip--dot': dot, [`mjl-chip--${variant}`]: variant !== 'danger' },
				]"
				aria-hidden="true"
			>{{ display }}</span>
			<span class="sr-only">{{ label }}</span>
		</template>
	</span>
</template>
