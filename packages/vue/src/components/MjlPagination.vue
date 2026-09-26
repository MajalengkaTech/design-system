<script setup lang="ts">
import { computed } from 'vue';

export interface MjlPaginationProps {
	pageCount: number;
	/** Jumlah halaman di kiri-kanan halaman aktif sebelum dipotong "…". */
	siblings?: number;
	label?: string;
	prevLabel?: string;
	nextLabel?: string;
	pageLabel?: (page: number) => string;
}

const props = withDefaults(defineProps<MjlPaginationProps>(), {
	siblings: 1,
	label: 'Navigasi halaman',
	prevLabel: 'Halaman sebelumnya',
	nextLabel: 'Halaman berikutnya',
	pageLabel: (page: number) => `Halaman ${page}`,
});

const page = defineModel<number>({ required: true });

/**
 * Jumlah slot tetap (siblings×2 + 5) supaya tombol tidak bergeser saat berpindah halaman:
 * 1 2 3 4 5 … 20 · 1 … 9 10 11 … 20 · 1 … 16 17 18 19 20
 */
const items = computed<(number | 'ellipsis')[]>(() => {
	const total = props.pageCount;
	const s = props.siblings;
	const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
	if (total <= s * 2 + 5) return range(1, total);

	const left = Math.max(page.value - s, 1);
	const right = Math.min(page.value + s, total);
	const edge = s * 2 + 3;
	if (left <= 3) return [...range(1, edge), 'ellipsis', total];
	if (right >= total - 2) return [1, 'ellipsis', ...range(total - edge + 1, total)];
	return [1, 'ellipsis', ...range(left, right), 'ellipsis', total];
});

function go(target: number) {
	if (target >= 1 && target <= props.pageCount && target !== page.value) page.value = target;
}
</script>

<template>
	<nav :aria-label="label">
		<ul class="mjl-pagination">
			<li class="mjl-pagination__item">
				<button
					type="button"
					class="mjl-pagination__link"
					:aria-label="prevLabel"
					:disabled="page <= 1"
					@click="go(page - 1)"
				>
					<span aria-hidden="true">←</span>
				</button>
			</li>
			<li
				v-for="(item, i) in items"
				:key="`${item}-${i}`"
				class="mjl-pagination__item"
			>
				<span
					v-if="item === 'ellipsis'"
					class="mjl-pagination__ellipsis"
					aria-hidden="true"
				>…</span>
				<button
					v-else
					type="button"
					class="mjl-pagination__link"
					:aria-label="pageLabel(item)"
					:aria-current="item === page ? 'page' : undefined"
					@click="go(item)"
				>
					{{ item }}
				</button>
			</li>
			<li class="mjl-pagination__item">
				<button
					type="button"
					class="mjl-pagination__link"
					:aria-label="nextLabel"
					:disabled="page >= pageCount"
					@click="go(page + 1)"
				>
					<span aria-hidden="true">→</span>
				</button>
			</li>
		</ul>
	</nav>
</template>
