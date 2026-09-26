<script setup lang="ts">
import { layanan } from '~/data/layanan'
import { berita, bidang, kontak, RESMI } from '~/data/situs'

useHead({ title: 'Beranda' })

const populer = ['legalisir-ijazah', 'ppdb', 'aktivasi-dapodik']
  .map(slug => layanan.find(l => l.slug === slug)!)
</script>

<template>
  <!-- Hero: tugas warga lebih dulu (cari layanan), bukan berita -->
  <section class="bg-mjl-bg-brand-subtle border-b border-mjl-border-hairline" aria-labelledby="judul-hero">
    <div class="mjl-container grid gap-10 py-12 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
      <div class="flex flex-col gap-6">
        <p class="eyebrow m-0">Dinas Pendidikan Kabupaten Majalengka</p>
        <h1 id="judul-hero" class="m-0 font-mjl-title font-extrabold text-mjl-4xl md:text-mjl-5xl text-mjl-text-strong">
          Urus layanan pendidikan tanpa bolak-balik
        </h1>
        <p class="m-0 text-mjl-lg text-mjl-text-default max-w-prose">
          Cek syarat dan alur legalisir ijazah, PPDB, aktivasi Dapodik, dan layanan lain
          sebelum datang ke kantor dinas.
        </p>

        <CariLayanan besar />

        <div class="flex flex-wrap items-center gap-2 text-mjl-sm">
          <span class="text-mjl-text-subtle">Paling dicari:</span>
          <NuxtLink
            v-for="l in populer"
            :key="l.slug"
            :to="`/layanan/${l.slug}`"
            class="mjl-badge mjl-badge--pill mjl-badge--lg no-underline hover:border-mjl-border-brand"
          >
            {{ l.nama }}
          </NuxtLink>
        </div>
      </div>

      <aside class="mjl-card gap-4" aria-labelledby="judul-kantor">
        <h2 id="judul-kantor" class="m-0 font-mjl-title text-mjl-lg font-bold text-mjl-text-strong">
          Kantor layanan
        </h2>
        <dl class="m-0 grid gap-4 text-mjl-sm">
          <div class="flex gap-3">
            <dt><span class="i-lucide-clock text-lg text-mjl-text-brand" /><span class="mjl-sr-only">Jam pelayanan</span></dt>
            <dd class="m-0">
              <div v-for="j in kontak.jam" :key="j.hari">
                {{ j.hari }}: <strong class="text-mjl-text-strong">{{ j.waktu }}</strong>
              </div>
            </dd>
          </div>
          <div class="flex gap-3">
            <dt><span class="i-lucide-map-pin text-lg text-mjl-text-brand" /><span class="mjl-sr-only">Alamat</span></dt>
            <dd class="m-0">{{ kontak.alamat }}</dd>
          </div>
          <div class="flex gap-3">
            <dt><span class="i-lucide-message-circle text-lg text-mjl-text-brand" /><span class="mjl-sr-only">WhatsApp</span></dt>
            <dd class="m-0"><a :href="kontak.whatsappUrl" class="mjl-link">{{ kontak.whatsapp }}</a></dd>
          </div>
        </dl>
      </aside>
    </div>
  </section>

  <section class="section-y" aria-labelledby="judul-layanan">
    <div class="mjl-container flex flex-col gap-8">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div class="flex flex-col gap-2">
          <p class="eyebrow m-0">Layanan publik</p>
          <h2 id="judul-layanan" class="section-title m-0">Pilih layanan yang Anda butuhkan</h2>
        </div>
        <NuxtLink to="/layanan" class="mjl-btn mjl-btn--outline">Semua layanan</NuxtLink>
      </div>
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
        <li v-for="l in layanan" :key="l.slug">
          <LayananCard :layanan="l" />
        </li>
      </ul>
    </div>
  </section>

  <section class="section-y bg-mjl-bg-base border-y border-mjl-border-hairline" aria-labelledby="judul-bidang">
    <div class="mjl-container flex flex-col gap-8">
      <div class="flex flex-col gap-2">
        <p class="eyebrow m-0">Menurut jenjang</p>
        <h2 id="judul-bidang" class="section-title m-0">Bidang di Dinas Pendidikan</h2>
      </div>
      <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
        <li v-for="b in bidang" :key="b.singkat">
          <a :href="b.to" class="flex items-center gap-3 h-full p-4 rounded-mjl-lg border border-mjl-border-line no-underline text-mjl-text-default hover:border-mjl-border-brand hover:bg-mjl-bg-tint transition-colors">
            <span :class="b.ikon" class="text-2xl text-mjl-text-brand" aria-hidden="true" />
            <span class="flex flex-col">
              <span class="font-mjl-title font-bold text-mjl-text-strong">{{ b.singkat }}</span>
              <span class="text-mjl-sm text-mjl-text-subtle">{{ b.nama }}</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>

  <section class="section-y" aria-labelledby="judul-berita">
    <div class="mjl-container flex flex-col gap-8">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div class="flex flex-col gap-2">
          <p class="eyebrow m-0">Publikasi</p>
          <h2 id="judul-berita" class="section-title m-0">Kabar terbaru</h2>
        </div>
        <a :href="`${RESMI}/publikasi`" class="mjl-btn mjl-btn--ghost">
          Semua publikasi <span class="i-lucide-external-link" aria-hidden="true" />
        </a>
      </div>
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
        <li v-for="b in berita" :key="b.url">
          <BeritaCard v-bind="b" />
        </li>
      </ul>
    </div>
  </section>

  <section class="pb-16" aria-labelledby="judul-bantuan">
    <div class="mjl-container">
      <div class="flex flex-col gap-6 p-8 md:p-10 rounded-mjl-lg bg-mjl-action-primary-bg text-mjl-action-primary-fg md:flex-row md:items-center md:justify-between">
        <div class="flex flex-col gap-2">
          <h2 id="judul-bantuan" class="m-0 font-mjl-title text-mjl-2xl font-bold">Masih bingung atau ingin mengadu?</h2>
          <p class="m-0 opacity-90">Sampaikan lewat Hallo Disdik atau WhatsApp hotline Dinas Pendidikan.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a :href="`${RESMI}/hallo-disdik`" class="mjl-btn mjl-btn--lg mjl-btn--secondary">Hallo Disdik</a>
          <a :href="kontak.whatsappUrl" class="mjl-btn mjl-btn--lg mjl-btn--outline border-current text-inherit hover:bg-white/10">
            <span class="i-lucide-message-circle" aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
