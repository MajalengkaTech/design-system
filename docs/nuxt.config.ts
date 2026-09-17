export default defineNuxtConfig({
  compatibilityDate: '2026-09-17',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],

  // Site identity — dipakai AI assistant & llms.txt
  site: {
    name: 'Majalengka Design System',
    url: 'https://ui.majalengka.tech',
  },

  // LLMs integration — generate /llms.txt & /llms-full.txt
  llms: {
    domain: 'https://ui.majalengka.tech',
    title: 'Majalengka Design System',
    description: 'Design system open-source buatan komunitas warga Majalengka — antarmuka aksesibel, konsisten, dan mudah diintegrasikan di teknologi apapun.',
    full: {
      title: 'Majalengka Design System — Dokumentasi Lengkap',
      description: 'Panduan lengkap komponen, token desain, dan panduan aksesibilitas open-source dari komunitas warga Majalengka.',
    },
    sections: [
      {
        title: 'Sumber Developer',
        description: 'Entry point machine-readable untuk dokumentasi ini.',
        links: [
          {
            title: 'Source di GitHub',
            description: 'Issues, rilis, dan kontribusi.',
            href: 'https://github.com/MajalengkaTech/design-system',
          },
        ],
      },
    ],
    notes: [
      'Design system ini dibuat oleh komunitas warga Majalengka, bukan produk resmi pemerintah daerah.',
      'Semua komponen memenuhi standar aksesibilitas WCAG 2.1 Level AA.',
      'Untuk membaca dokumentasi sebagai agent: tambahkan .md di akhir URL halaman, atau kirim Accept: text/markdown.',
    ],
  },

  // Docus AI Assistant — aktifkan dengan API key
  docus: {
    assistant: {
      enabled: true,
      mcpServer: '/mcp',
    },
  },

  // Runtime config — expose AI_GATEWAY_API_KEY ke server Nitro
  runtimeConfig: {
    aiGatewayApiKey: process.env.AI_GATEWAY_API_KEY || '',
  },

  // Shiki (syntax highlighter, dipakai AssistantPanel & MDC) bawa onig.wasm.
  // Rolldown tidak bisa bundle WASM itu untuk target Workers (import "env"
  // bawaan WASM disangka module JS) — externalize saja, bukan sesuatu yang
  // perlu di-bundle.
  vite: {
    build: {
      rolldownOptions: {
        external: [/onig\.wasm$/],
      },
    },
  },

  app: {
    head: {
      titleTemplate: '%s · Majalengka Design System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Design system open-source buatan komunitas warga Majalengka. Antarmuka aksesibel, konsisten, dan mudah diintegrasikan di framework apapun.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo-circle.svg' },
      ],
    },
  },
})
