<script setup lang="ts">
export interface MjlAccordionItem {
	title: string;
	content?: string;
	open?: boolean;
}

export interface MjlAccordionProps {
	items: MjlAccordionItem[];
}

defineProps<MjlAccordionProps>();
</script>

<template>
	<div class="mjl-accordion">
		<details
			v-for="(item, i) in items"
			:key="i"
			class="mjl-accordion__item"
			:open="item.open"
		>
			<summary class="mjl-accordion__summary">
				{{ item.title }}
				<span aria-hidden="true">▼</span>
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
