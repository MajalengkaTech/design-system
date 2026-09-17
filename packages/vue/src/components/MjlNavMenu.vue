<script setup lang="ts">
import { ref } from 'vue';

export interface MjlNavItem {
	label: string;
	href: string;
	active?: boolean;
}

export interface MjlNavMenuProps {
	items: MjlNavItem[];
}

defineProps<MjlNavMenuProps>();

const drawerRef = ref<HTMLDialogElement>();

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
			<a
				:href="item.href"
				:class="['mjl-nav-menu__link', { 'mjl-nav-menu__link--active': item.active }]"
				:aria-current="item.active ? 'page' : undefined"
			>{{ item.label }}</a>
		</li>
	</ul>

	<dialog
		ref="drawerRef"
		class="mjl-nav-drawer"
		aria-label="Menu navigasi"
	>
		<div class="mjl-nav-drawer__header">
			<strong>Menu</strong>
			<button
				type="button"
				class="mjl-icon-btn"
				aria-label="Tutup menu"
				@click="closeDrawer"
			>✕</button>
		</div>
		<ul class="mjl-nav-menu mjl-nav-menu--mobile">
			<li
				v-for="item in items"
				:key="item.href"
			>
				<a
					:href="item.href"
					:class="['mjl-nav-menu__link', { 'mjl-nav-menu__link--active': item.active }]"
					:aria-current="item.active ? 'page' : undefined"
					@click="closeDrawer"
				>{{ item.label }}</a>
			</li>
		</ul>
	</dialog>
</template>
