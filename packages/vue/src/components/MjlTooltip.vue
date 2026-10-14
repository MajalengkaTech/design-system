<script setup lang="ts">
import { useId } from 'vue';

export interface MjlTooltipProps {
	text: string;
}

defineProps<MjlTooltipProps>();

const tooltipId = useId();
</script>

<template>
	<!--
		Tooltip CSS murni (::after) tidak terbaca pembaca layar, jadi teksnya juga
		ditaruh di elemen sr-only. Ikat ke pemicu lewat slot prop:
		<MjlTooltip text="..." v-slot="{ describedby }">
			<button :aria-describedby="describedby">?</button>
		</MjlTooltip>
	-->
	<span :data-mjl-tooltip="text">
		<slot :describedby="tooltipId" />
		<span
			:id="tooltipId"
			role="tooltip"
			class="sr-only"
		>{{ text }}</span>
	</span>
</template>
