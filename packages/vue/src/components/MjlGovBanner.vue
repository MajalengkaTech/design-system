<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
const toggle = () => {
	isOpen.value = !isOpen.value;
};
</script>

<template>
	<aside
		class="mjl-gov-banner"
		aria-label="Pemberitahuan resmi pemerintah"
	>
		<div class="mjl-gov-banner__inner">
			<div class="mjl-gov-banner__content">
				<svg
					class="mjl-gov-banner__flag"
					viewBox="0 0 30 20"
					aria-hidden="true"
				>
					<rect width="30" height="10" fill="#E70011" />
					<rect y="10" width="30" height="10" fill="#FFFFFF" />
				</svg>
				<span class="mjl-gov-banner__text">
					Situs resmi <strong>Pemerintah Kabupaten Majalengka</strong>
				</span>
			</div>
			<button
				type="button"
				class="mjl-gov-banner__toggle"
				:aria-expanded="isOpen"
				aria-controls="mjl-gov-banner-details"
				@click="toggle"
			>
				Cara mengidentifikasi
				<span aria-hidden="true">{{ isOpen ? '▲' : '▼' }}</span>
			</button>
		</div>

		<div
			v-show="isOpen"
			id="mjl-gov-banner-details"
			class="mjl-gov-banner__details"
		>
			<div>
				<strong>Domain resmi (.go.id / majalengka.tech)</strong>
				<p class="mjl-text-sm" style="margin-top: 4px; color: var(--mjl-color-text-secondary);">
					Situs resmi pemerintah daerah berakhiran domain <code>.go.id</code> atau dipublikasikan melalui inisiatif resmi komunitas teknologi daerah <code>majalengka.tech</code>.
				</p>
			</div>
			<div>
				<strong>Protokol Aman (HTTPS)</strong>
				<p class="mjl-text-sm" style="margin-top: 4px; color: var(--mjl-color-text-secondary);">
					Pastikan terdapat ikon gembok terkunci pada bilah alamat browser Anda untuk memastikan data formulir terenkripsi dengan aman.
				</p>
			</div>
		</div>
	</aside>
</template>
