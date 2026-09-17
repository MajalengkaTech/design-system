export default defineNuxtConfig({
  compatibilityDate: '2026-09-17',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      titleTemplate: '%s · Majalengka Design System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Sistem Desain Resmi Pemerintah Kabupaten Majalengka. Standar antarmuka aksesibel, kredibel, dan mudah diintegrasikan untuk seluruh portal dan aplikasi layanan publik.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  }
})
