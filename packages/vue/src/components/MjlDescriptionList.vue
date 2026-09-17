<script setup lang="ts">
export interface MjlDescriptionItem {
	label: string;
	value: string;
}

export interface MjlDescriptionListProps {
	items: MjlDescriptionItem[];
}

defineProps<MjlDescriptionListProps>();
</script>

<template>
	<dl class="mjl-description-list">
		<template
			v-for="(item, i) in items"
			:key="i"
		>
			<dt>{{ item.label }}</dt>
			<dd>
				<slot
					:name="`value-${i}`"
					:item="item"
				>{{ item.value }}</slot>
			</dd>
		</template>
	</dl>
</template>
