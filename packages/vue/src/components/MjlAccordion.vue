<script setup lang="ts">
import { useId } from 'vue';

export interface MjlAccordionItem {
	title: string;
	content?: string;
	open?: boolean;
}

export interface MjlAccordionProps {
	items: MjlAccordionItem[];
	/** Hanya satu butir yang boleh terbuka (atribut name native pada <details>). */
	exclusive?: boolean;
}

withDefaults(defineProps<MjlAccordionProps>(), {
	exclusive: false,
});

const groupName = useId();
</script>

<template>
	<div class="mjl-accordion">
		<details
			v-for="(item, i) in items"
			:key="i"
			class="mjl-accordion__item"
			:name="exclusive ? groupName : undefined"
			:open="item.open"
		>
			<summary class="mjl-accordion__summary">
				{{ item.title }}
				<svg
					class="mjl-accordion__icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</summary>
			<div class="mjl-accordion__content">
				<slot
					:name="`item-${i}`"
					:item="item"
				>
					<p>{{ item.content }}</p>
				</slot>
			</div>
		</details>
	</div>
</template>
