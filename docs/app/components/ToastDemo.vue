<script setup lang="ts">
import { toast } from '@majalengka/js'

const examples = [
	{ label: 'Berhasil', variant: 'success', title: 'Permohonan terkirim', description: 'Nomor registrasi #MJL-2026-9812 dikirim lewat SMS.' },
	{ label: 'Info', variant: 'info', title: 'Draf tersimpan', description: 'Anda bisa melanjutkan pengisian kapan saja.' },
	{ label: 'Peringatan', variant: 'warning', title: 'Sesi hampir habis', description: 'Simpan isian Anda dalam 2 menit.' },
	{ label: 'Gagal', variant: 'danger', title: 'Berkas gagal diunggah', description: 'Ukuran file melebihi 2 MB. Toast ini tidak hilang sendiri.' },
] as const
</script>

<template>
	<div class="flex flex-wrap gap-2">
		<button
			v-for="e in examples"
			:key="e.variant"
			type="button"
			:class="['mjl-btn', e.variant === 'danger' ? 'mjl-btn--danger' : 'mjl-btn--secondary']"
			@click="toast({ title: e.title, description: e.description, variant: e.variant })"
		>
			{{ e.label }}
		</button>
	</div>
</template>
