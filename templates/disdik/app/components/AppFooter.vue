<script setup lang="ts">
import { kontak, menu, RESMI } from '~/data/situs'
</script>

<template>
  <footer class="mjl-footer px-0">
    <div class="mjl-container">
      <div class="mjl-footer__grid">
        <div>
          <p class="mjl-footer__heading">Dinas Pendidikan Kabupaten Majalengka</p>
          <address class="not-italic text-mjl-sm leading-relaxed">
            {{ kontak.alamat }}
          </address>
        </div>

        <div>
          <p class="mjl-footer__heading">Jam pelayanan</p>
          <ul class="mjl-footer__list">
            <li v-for="j in kontak.jam" :key="j.hari">
              {{ j.hari }}: <span class="text-mjl-neutral-50">{{ j.waktu }}</span>
            </li>
          </ul>
        </div>

        <div>
          <p class="mjl-footer__heading">Hubungi kami</p>
          <ul class="mjl-footer__list">
            <li><a :href="kontak.whatsappUrl">WhatsApp {{ kontak.whatsapp }}</a></li>
            <li><a :href="`mailto:${kontak.email}`">{{ kontak.email }}</a></li>
          </ul>
        </div>

        <nav aria-label="Tautan footer">
          <p class="mjl-footer__heading">Tautan</p>
          <ul class="mjl-footer__list">
            <li v-for="item in menu" :key="item.label">
              <NuxtLink :to="item.to" :external="item.to.startsWith('http')">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="mjl-footer__bottom">
        <p>
          Konsep redesain dengan Majalengka Design System, bukan situs resmi.
          Situs resmi: <a :href="RESMI" class="underline text-mjl-neutral-50">disdik.majalengkakab.go.id</a>
        </p>
        <p>Isi diambil dari situs resmi, September 2026.</p>
      </div>
    </div>
  </footer>
</template>
