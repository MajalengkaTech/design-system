<script setup lang="ts">
export interface MjlPageHeaderProps {
	title: string;
	description?: string;
}

defineProps<MjlPageHeaderProps>();
</script>

<template>
	<div class="mjl-page-header">
		<div>
			<slot name="breadcrumb" />
			<h1 class="mjl-page-header__title">{{ title }}</h1>
			<p
				v-if="description"
				class="mjl-page-header__desc"
			>{{ description }}</p>
		</div>

		<div
			v-if="$slots.actions"
			class="mjl-page-header__actions"
		>
			<slot name="actions" />
		</div>
	</div>
</template>
