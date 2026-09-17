<script setup lang="ts">
export interface MjlPaginationProps {
	modelValue: number;
	pageCount: number;
}

const props = defineProps<MjlPaginationProps>();

const emit = defineEmits<{
	'update:modelValue': [page: number];
}>();

function go(page: number) {
	if (page < 1 || page > props.pageCount || page === props.modelValue) return;
	emit('update:modelValue', page);
}
</script>

<template>
	<nav aria-label="Navigasi Halaman Data">
		<ul class="mjl-pagination">
			<li class="mjl-pagination__item">
				<button
					type="button"
					class="mjl-pagination__link"
					aria-label="Halaman Sebelumnya"
					:disabled="modelValue <= 1"
					@click="go(modelValue - 1)"
				>←</button>
			</li>
			<li
				v-for="page in pageCount"
				:key="page"
				class="mjl-pagination__item"
			>
				<button
					type="button"
					:class="['mjl-pagination__link', { 'mjl-pagination__link--active': page === modelValue }]"
					:aria-current="page === modelValue ? 'page' : undefined"
					@click="go(page)"
				>{{ page }}</button>
			</li>
			<li class="mjl-pagination__item">
				<button
					type="button"
					class="mjl-pagination__link"
					aria-label="Halaman Selanjutnya"
					:disabled="modelValue >= pageCount"
					@click="go(modelValue + 1)"
				>→</button>
			</li>
		</ul>
	</nav>
</template>
