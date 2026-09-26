<script setup lang="ts">
import { useLink } from '../config';

export interface MjlBreadcrumbItem {
	label: string;
	href?: string;
}

export interface MjlBreadcrumbProps {
	items: MjlBreadcrumbItem[];
	label?: string;
}

withDefaults(defineProps<MjlBreadcrumbProps>(), {
	label: 'Jejak navigasi',
});

const link = useLink();
</script>

<template>
	<nav :aria-label="label">
		<ol class="mjl-breadcrumb">
			<li
				v-for="(item, i) in items"
				:key="i"
			>
				<component
					:is="link(item.href!).is"
					v-if="item.href && i < items.length - 1"
					v-bind="link(item.href!).attrs"
				>
					{{ item.label }}
				</component>
				<span
					v-else
					aria-current="page"
				>{{ item.label }}</span>
			</li>
		</ol>
	</nav>
</template>
