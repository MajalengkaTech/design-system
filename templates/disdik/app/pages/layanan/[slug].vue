<script setup lang="ts">
import { layanan } from '~/data/layanan'
import { kontak } from '~/data/situs'

const route = useRoute()
const item = layanan.find(l => l.slug === route.params.slug)
if (!item) throw createError({ statusCode: 404, statusMessage: 'Layanan tidak ditemukan', fatal: true })

useHead({ title: item.nama })
const d = item.detail
</script>

<template>
  <div class="mjl-container flex flex-col gap-8 py-10 md:py-14">
    <nav aria-label="Jejak navigasi">
      <ol class="mjl-breadcrumb m-0 p-0">
        <li><NuxtLink to="/">Beranda</NuxtLink></li>
        <li><NuxtLink to="/layanan">Layanan publik</NuxtLink></li>
        <li><span aria-current="page">{{ item.nama }}</span></li>
      </ol>
    </nav>

    <header class="flex flex-col gap-4 max-w-3xl">
      <span class="grid place-items-center w-14 h-14 rounded-mjl-lg bg-mjl-bg-brand-subtle text-mjl-text-brand" aria-hidden="true">
        <span :class="item.ikon" class="text-3xl" />
      </span>
      <h1 class="m-0 font-mjl-title font-extrabold text-mjl-3xl md:text-mjl-4xl text-mjl-text-strong">{{ item.nama }}</h1>
      <p class="m-0 text-mjl-lg text-mjl-text-subtle">{{ item.ringkas }}</p>
    </header>

    <div class="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
      <div v-if="d" class="flex flex-col gap-10 min-w-0">
        <section aria-labelledby="syarat" class="flex flex-col gap-4">
          <h2 id="syarat" class="m-0 font-mjl-title text-mjl-2xl font-bold text-mjl-text-strong">Yang perlu dibawa</h2>
          <ul class="m-0 p-0 list-none flex flex-col gap-3">
            <li v-for="s in d.syarat" :key="s" class="flex gap-3 p-4 rounded-mjl-md bg-mjl-bg-base border border-mjl-border-line">
              <span class="i-lucide-check mt-0.5 text-lg text-mjl-status-success-fg" aria-hidden="true" />
              <span>{{ s }}</span>
            </li>
          </ul>
        </section>

        <section aria-labelledby="alur" class="flex flex-col gap-4">
          <h2 id="alur" class="m-0 font-mjl-title text-mjl-2xl font-bold text-mjl-text-strong">Langkah-langkah</h2>
          <ol class="m-0 p-0 list-none flex flex-col">
            <li v-for="(a, i) in d.alur" :key="a" class="relative flex gap-4 pb-6 last:pb-0">
              <span
                class="relative z-1 grid place-items-center shrink-0 w-9 h-9 rounded-full font-mjl-title font-bold text-mjl-sm bg-mjl-action-primary-bg text-mjl-action-primary-fg"
                aria-hidden="true"
              >{{ i + 1 }}</span>
              <span
                v-if="i < d.alur.length - 1"
                class="absolute left-[17px] top-9 bottom-0 w-0.5 bg-mjl-border-line"
                aria-hidden="true"
              />
              <p class="m-0 pt-1.5">{{ a }}</p>
            </li>
          </ol>
        </section>

        <section aria-labelledby="faq" class="flex flex-col gap-4">
          <h2 id="faq" class="m-0 font-mjl-title text-mjl-2xl font-bold text-mjl-text-strong">Pertanyaan umum</h2>
          <div class="mjl-accordion">
            <details v-for="f in d.faq" :key="f.tanya" class="mjl-accordion__item">
              <summary class="mjl-accordion__summary">{{ f.tanya }}</summary>
              <div class="mjl-accordion__content"><p class="m-0">{{ f.jawab }}</p></div>
            </details>
          </div>
        </section>
      </div>

      <div v-else class="mjl-alert mjl-alert--info m-0">
        <span class="i-lucide-info mjl-alert__icon" aria-hidden="true" />
        <div class="mjl-alert__content">
          <p class="mjl-alert__title m-0">Detail layanan ini belum dimuat di template</p>
          <p class="m-0">
            Syarat dan alur untuk {{ item.nama }} tidak kami karang. Lihat informasinya di
            <a :href="item.sumber" class="underline text-inherit">halaman resmi layanan ini</a>.
          </p>
        </div>
      </div>

      <aside class="mjl-card gap-5 lg:sticky lg:top-24" aria-labelledby="ringkasan">
        <h2 id="ringkasan" class="m-0 font-mjl-title text-mjl-lg font-bold text-mjl-text-strong">Ringkasan</h2>
        <dl class="m-0 grid gap-4 text-mjl-sm">
          <div v-if="d">
            <dt class="text-mjl-text-subtle">Biaya</dt>
            <dd class="m-0 font-semibold text-mjl-text-strong">{{ d.biaya }}</dd>
          </div>
          <div>
            <dt class="text-mjl-text-subtle">Tempat</dt>
            <dd class="m-0 text-mjl-text-strong">Sekretariat Dinas Pendidikan, {{ kontak.alamat }}</dd>
          </div>
          <div>
            <dt class="text-mjl-text-subtle">Jam pelayanan</dt>
            <dd v-for="j in kontak.jam" :key="j.hari" class="m-0 text-mjl-text-strong">{{ j.hari }}: {{ j.waktu }}</dd>
          </div>
        </dl>
        <div class="flex flex-col gap-2">
          <a :href="kontak.whatsappUrl" class="mjl-btn mjl-btn--block">
            <span class="i-lucide-message-circle" aria-hidden="true" /> Tanya lewat WhatsApp
          </a>
          <a :href="item.sumber" class="mjl-btn mjl-btn--block mjl-btn--ghost">
            Halaman resmi <span class="i-lucide-external-link" aria-hidden="true" />
          </a>
        </div>
      </aside>
    </div>
  </div>
</template>
