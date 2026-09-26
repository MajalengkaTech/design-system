<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const hilang = computed(() => props.error.statusCode === 404)
const theme = useTheme()
useHead({ title: hilang.value ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan', htmlAttrs: { 'data-theme': theme } })
</script>

<template>
  <NuxtLayout>
    <div class="mjl-container py-16">
      <div class="mjl-error-page">
        <p class="mjl-error-page__code">{{ error.statusCode }}</p>
        <h1 class="mjl-error-page__title">
          {{ hilang ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan' }}
        </h1>
        <p class="mjl-error-page__desc">
          {{ hilang ? 'Alamatnya mungkin salah ketik, atau halamannya sudah dipindahkan.' : 'Coba muat ulang halaman beberapa saat lagi.' }}
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <button type="button" class="mjl-btn" @click="clearError({ redirect: '/' })">Kembali ke beranda</button>
          <button type="button" class="mjl-btn mjl-btn--secondary" @click="clearError({ redirect: '/layanan' })">Daftar layanan</button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
