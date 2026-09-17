<script setup lang="ts">
export interface MjlBreadcrumbItem {
	label: string;
	href?: string;
}

export interface MjlBreadcrumbProps {
	items: MjlBreadcrumbItem[];
}

defineProps<MjlBreadcrumbProps>();
</script>

<template>
	<nav aria-label="Jejak Navigasi">
		<ol class="mjl-breadcrumb">
			<li
				v-for="(item, i) in items"
				:key="i"
			>
				<a
					v-if="item.href && i < items.length - 1"
					:href="item.href"
				>{{ item.label }}</a>
				<span
					v-else
					aria-current="page"
				>{{ item.label }}</span>
			</li>
		</ol>
	</nav>
</template>
