<script setup lang="ts">
import { computed, nextTick, ref, useId } from 'vue';

export interface MjlTabItem {
	/** Kunci unik tab; juga nama slot panelnya. */
	value: string;
	label: string;
	disabled?: boolean;
}

export interface MjlTabsProps {
	items: MjlTabItem[];
	variant?: 'line' | 'pill';
	/** Nama daftar tab untuk pembaca layar. */
	label?: string;
}

const props = withDefaults(defineProps<MjlTabsProps>(), {
	variant: 'line',
	label: undefined,
});

const model = defineModel<string>();

const baseId = useId();
const tabRefs = ref<HTMLButtonElement[]>([]);

const enabled = computed(() => props.items.filter((item) => !item.disabled));
const activeValue = computed(() => model.value ?? enabled.value[0]?.value);

const tabId = (value: string) => `${baseId}-tab-${value}`;
const panelId = (value: string) => `${baseId}-panel-${value}`;

function select(value: string) {
	model.value = value;
}

// Pola WAI-ARIA Tabs (aktivasi otomatis): panah kiri/kanan, Home, End
// memindahkan fokus sekaligus memilih tab; hanya tab aktif yang bisa di-Tab.
async function onKeydown(event: KeyboardEvent) {
	const list = enabled.value;
	if (!list.length) return;
	const current = list.findIndex((item) => item.value === activeValue.value);
	let next: number;
	switch (event.key) {
		case 'ArrowRight': next = (current + 1) % list.length; break;
		case 'ArrowLeft': next = (current - 1 + list.length) % list.length; break;
		case 'Home': next = 0; break;
		case 'End': next = list.length - 1; break;
		default: return;
	}
	event.preventDefault();
	const target = list[next];
	select(target.value);
	await nextTick();
	tabRefs.value[props.items.indexOf(target)]?.focus();
}
</script>

<template>
	<div :class="['mjl-tabs', { 'mjl-tabs--pill': variant === 'pill' }]">
		<div
			class="mjl-tab-list"
			role="tablist"
			:aria-label="label"
			@keydown="onKeydown"
		>
			<button
				v-for="item in items"
				:id="tabId(item.value)"
				:key="item.value"
				ref="tabRefs"
				type="button"
				role="tab"
				:class="['mjl-tab', { 'mjl-tab--active': item.value === activeValue }]"
				:aria-selected="item.value === activeValue"
				:aria-controls="panelId(item.value)"
				:tabindex="item.value === activeValue ? 0 : -1"
				:disabled="item.disabled"
				@click="select(item.value)"
			>
				{{ item.label }}
			</button>
		</div>

		<div
			v-for="item in items"
			:id="panelId(item.value)"
			:key="item.value"
			role="tabpanel"
			:class="['mjl-tab-panel', { 'mjl-tab-panel--active': item.value === activeValue }]"
			:aria-labelledby="tabId(item.value)"
			:hidden="item.value !== activeValue"
			tabindex="0"
		>
			<slot
				:name="item.value"
				:item="item"
			/>
		</div>
	</div>
</template>
