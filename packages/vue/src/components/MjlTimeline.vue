<script setup lang="ts">
export interface MjlTimelineItem {
	title: string;
	/** Waktu yang tampil, mis. "17 Sep 2026, 09.12". */
	time?: string;
	/** Nilai mesin untuk <time datetime>, mis. "2026-09-17T09:12". */
	datetime?: string;
	desc?: string;
	/** Tahap yang sedang berjalan. */
	active?: boolean;
}

export interface MjlTimelineProps {
	items: MjlTimelineItem[];
}

defineProps<MjlTimelineProps>();
</script>

<template>
	<ol class="mjl-timeline">
		<li
			v-for="(item, i) in items"
			:key="i"
			:class="['mjl-timeline__item', { 'mjl-timeline__item--active': item.active }]"
			:aria-current="item.active ? 'step' : undefined"
		>
			<span
				class="mjl-timeline__marker"
				aria-hidden="true"
			/>
			<div class="mjl-timeline__title">{{ item.title }}</div>
			<time
				v-if="item.time"
				class="mjl-timeline__time"
				:datetime="item.datetime"
			>{{ item.time }}</time>
			<div
				v-if="item.desc || $slots[`item-${i}`]"
				class="mjl-timeline__desc"
			>
				<slot
					:name="`item-${i}`"
					:item="item"
				>{{ item.desc }}</slot>
			</div>
		</li>
	</ol>
</template>
