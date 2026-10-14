<script setup lang="ts">
export interface MjlStatCardProps {
	label: string;
	value: string | number;
	trend?: 'up' | 'down';
	/** Besaran perubahan, mis. "12%". */
	trendValue?: string;
	/** Keterangan tambahan, mis. "dibanding bulan lalu". */
	meta?: string;
}

withDefaults(defineProps<MjlStatCardProps>(), {
	trend: undefined,
	trendValue: undefined,
	meta: undefined,
});
</script>

<template>
	<div class="mjl-stat-card">
		<span class="mjl-stat-card__label">{{ label }}</span>
		<span class="mjl-stat-card__value">{{ value }}</span>
		<div
			v-if="trend || meta || $slots.meta"
			class="mjl-stat-card__meta"
		>
			<span
				v-if="trend"
				:class="['mjl-stat-card__trend', `mjl-stat-card__trend--${trend}`]"
			>
				<span aria-hidden="true">{{ trend === 'up' ? '▲' : '▼' }}</span>
				<!-- Arah tren jangan hanya lewat warna/panah (WCAG 1.4.1). -->
				<span class="sr-only">{{ trend === 'up' ? 'Naik' : 'Turun' }}</span>
				{{ trendValue }}
			</span>
			<slot name="meta">{{ meta }}</slot>
		</div>
	</div>
</template>
