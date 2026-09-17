<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)

function triggerLoading() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

<template>
  <div class="space-y-8 my-6">
    <!-- 1. Variasi Gaya -->
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="mb-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">1. Variasi Gaya (Variants)</h4>
        <p class="text-xs text-slate-500 dark:text-slate-400">Lima varian tombol resmi yang disesuaikan dengan hierarki aksi antarmuka.</p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button type="button" class="mjl-btn mjl-btn--primary">
          Tombol Utama (Primary)
        </button>

        <button type="button" class="mjl-btn mjl-btn--secondary">
          Sekunder (Secondary)
        </button>

        <button type="button" class="mjl-btn mjl-btn--outline">
          Garis Luar (Outline)
        </button>

        <button type="button" class="mjl-btn mjl-btn--ghost">
          Ghost / Polos
        </button>

        <button type="button" class="mjl-btn mjl-btn--danger">
          Aksi Bahaya (Danger)
        </button>
      </div>
    </div>

    <!-- 2. Ukuran Tombol -->
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="mb-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">2. Ukuran Tombol (Sizes)</h4>
        <p class="text-xs text-slate-500 dark:text-slate-400">Target sentuh minimum 44px (WCAG 2.1 AA) pada ukuran standar.</p>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <button type="button" class="mjl-btn mjl-btn--primary mjl-btn--sm">
          Kecil (sm · 32px)
        </button>

        <button type="button" class="mjl-btn mjl-btn--primary mjl-btn--md">
          Standar (md · 40px)
        </button>

        <button type="button" class="mjl-btn mjl-btn--primary mjl-btn--lg">
          Besar (lg · 48px)
        </button>
      </div>
    </div>

    <!-- 3. Status Interaktif -->
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="mb-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">3. Status Interaktif (Interactive States)</h4>
        <p class="text-xs text-slate-500 dark:text-slate-400">Klik tombol "Klik untuk Simulasi Loading" untuk melihat efek spinner.</p>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <button type="button" class="mjl-btn mjl-btn--primary">
          Normal
        </button>

        <button
          type="button"
          class="mjl-btn mjl-btn--primary"
          :aria-busy="isLoading"
          :disabled="isLoading"
          @click="triggerLoading"
        >
          <span v-if="isLoading" class="mjl-spinner mjl-spinner--sm mjl-spinner--white mr-2" />
          <span>{{ isLoading ? 'Sedang Memproses...' : 'Klik untuk Simulasi Loading' }}</span>
        </button>

        <button type="button" class="mjl-btn mjl-btn--primary" disabled>
          Dinonaktifkan (Disabled)
        </button>
      </div>
    </div>

    <!-- 4. Tombol dengan Ikon -->
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div class="mb-4">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">4. Tombol dengan Ikon</h4>
        <p class="text-xs text-slate-500 dark:text-slate-400">Kombinasi ikon tajam untuk mempercepat identifikasi visual.</p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button type="button" class="mjl-btn mjl-btn--primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
          Unggah KTP Elektronik
        </button>

        <button type="button" class="mjl-btn mjl-btn--secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          Cetak Tanda Terima
        </button>

        <button type="button" class="mjl-btn mjl-btn--outline" aria-label="Bantuan Layanan">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </button>
      </div>
    </div>
  </div>
</template>
