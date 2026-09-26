export default defineNuxtConfig({
  compatibilityDate: '2026-09-27',
  devtools: { enabled: false },
  modules: ['@unocss/nuxt'],

  // reset.css: template ini situs baru, jadi body ikut diatur (latar, teks, mode gelap).
  // uno.css disuntikkan modul UnoCSS setelah ini, sehingga utilitas menang atas kelas mjl-*.
  css: ['@majalengka/css/reset', '@majalengka/css'],

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      titleTemplate: '%s · Dinas Pendidikan Kabupaten Majalengka (konsep)',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Konsep redesain portal Dinas Pendidikan Kabupaten Majalengka dengan Majalengka Design System. Bukan situs resmi.' },
        // Konsep, bukan situs resmi: jangan sampai terindeks mesin pencari
        { name: 'robots', content: 'noindex, nofollow' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap' },
      ],
    },
  },
})
