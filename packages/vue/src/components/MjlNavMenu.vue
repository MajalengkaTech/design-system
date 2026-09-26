<script setup lang="ts">
import { ref, useId } from 'vue';
import { useLink } from '../config';

export interface MjlNavItem {
	label: string;
	href: string;
	active?: boolean;
}

export interface MjlNavMenuProps {
	items: MjlNavItem[];
	drawerTitle?: string;
	closeLabel?: string;
}

withDefaults(defineProps<MjlNavMenuProps>(), {
	drawerTitle: 'Menu',
	closeLabel: 'Tutup menu',
});

const link = useLink();
const drawerRef = ref<HTMLDialogElement>();
const titleId = useId();

function openDrawer() {
	drawerRef.value?.showModal();
}
function closeDrawer() {
	drawerRef.value?.close();
}
defineExpose({ openDrawer, closeDrawer });
</script>

<template>
	<ul class="mjl-nav-menu">
		<li
			v-for="item in items"
			:key="item.href"
		>
			<component
				:is="link(item.href).is"
				v-bind="link(item.href).attrs"
				:class="['mjl-nav-menu__link', { 'mjl-nav-menu__link--active': item.active }]"
				:aria-current="item.active ? 'page' : undefined"
			>
				{{ item.label }}
			</component>
		</li>
	</ul>

	<dialog
		ref="drawerRef"
		class="mjl-nav-drawer"
		:aria-labelledby="titleId"
	>
		<div class="mjl-nav-drawer__header">
			<strong :id="titleId">{{ drawerTitle }}</strong>
			<button
				type="button"
				class="mjl-icon-btn"
				:aria-label="closeLabel"
				@click="closeDrawer"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					aria-hidden="true"
				><path d="M18 6 6 18M6 6l12 12" /></svg>
			</button>
		</div>
		<ul class="mjl-nav-menu mjl-nav-menu--mobile">
			<li
				v-for="item in items"
				:key="item.href"
			>
				<component
					:is="link(item.href).is"
					v-bind="link(item.href).attrs"
					:class="['mjl-nav-menu__link', { 'mjl-nav-menu__link--active': item.active }]"
					:aria-current="item.active ? 'page' : undefined"
					@click="closeDrawer"
				>
					{{ item.label }}
				</component>
			</li>
		</ul>
	</dialog>
</template>
