<script setup lang="ts">
import { computed, nextTick, ref, useId } from 'vue';

export interface MjlTabItem {
	key: string;
	label: string;
	disabled?: boolean;
}

export interface MjlTabsProps {
	items: MjlTabItem[];
	/** Nama daftar tab untuk pembaca layar. */
	label?: string;
	variant?: 'underline' | 'pill';
}

const props = withDefaults(defineProps<MjlTabsProps>(), {
	label: undefined,
	variant: 'underline',
});

defineSlots<Record<string, () => unknown>>();

const active = defineModel<string>();
const current = computed(() => active.value ?? props.items.find(i => !i.disabled)?.key);
const baseId = useId();
const tabRefs = ref<HTMLButtonElement[]>([]);

const tabId = (key: string) => `${baseId}-tab-${key}`;
const panelId = (key: string) => `${baseId}-panel-${key}`;

async function select(index: number, focus: boolean) {
	const item = props.items[index];
	if (!item || item.disabled) return;
	active.value = item.key;
	if (focus) {
		await nextTick();
		tabRefs.value[index]?.focus();
	}
}

// Pola WAI-ARIA: panah berpindah (berputar di ujung), Home/End, tab disabled dilewati
function onKeydown(event: KeyboardEvent, index: number) {
	const enabled = props.items.map((item, i) => (item.disabled ? -1 : i)).filter(i => i >= 0);
	const pos = enabled.indexOf(index);
	const target = {
		ArrowRight: enabled[(pos + 1) % enabled.length],
		ArrowLeft: enabled[(pos - 1 + enabled.length) % enabled.length],
		Home: enabled[0],
		End: enabled[enabled.length - 1],
	}[event.key];
	if (target === undefined) return;
	event.preventDefault();
	select(target, true);
}
</script>

<template>
	<div
		:class="['mjl-tabs', { 'mjl-tabs--pill': variant === 'pill' }]"
		data-mjl-manual
	>
		<!-- data-mjl-manual: @majalengka/js tidak ikut mengelola tabs ini -->
		<div
			class="mjl-tab-list"
			role="tablist"
			:aria-label="label"
		>
			<button
				v-for="(item, i) in items"
				:id="tabId(item.key)"
				:key="item.key"
				:ref="(el) => (tabRefs[i] = el as HTMLButtonElement)"
				type="button"
				role="tab"
				:class="['mjl-tab', { 'mjl-tab--active': item.key === current }]"
				:aria-selected="item.key === current"
				:aria-controls="panelId(item.key)"
				:tabindex="item.key === current ? 0 : -1"
				:disabled="item.disabled"
				@click="select(i, false)"
				@keydown="onKeydown($event, i)"
			>
				{{ item.label }}
			</button>
		</div>

		<div
			v-for="item in items"
			:id="panelId(item.key)"
			:key="item.key"
			role="tabpanel"
			class="mjl-tab-panel"
			:aria-labelledby="tabId(item.key)"
			tabindex="0"
			:hidden="item.key !== current"
		>
			<slot :name="item.key" />
		</div>
	</div>
</template>
