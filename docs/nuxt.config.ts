export default defineNuxtConfig({
  compatibilityDate: '2026-09-17',
  devtools: { enabled: false },
  // CSS custom kita ada di app/app.css — nama file itu memang konvensi
  // khusus Docus (lihat node_modules/docus/modules/css.ts): kalau ada,
  // otomatis di-import SETELAH @import "tailwindcss" di dalam docus.css
  // yang sama, jadi @theme di dalamnya benar-benar diproses Tailwind.
  // Daftar manual lewat css:[...] di sini salah -- file jadi entry CSS
  // terpisah yang tidak tersambung ke proses Tailwind sama sekali (itu
  // kenapa @theme sebelumnya tidak pernah benar-benar aktif).

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

  // Docus AI Assistant. Endpoint-nya ada di server/routes/__docus__/assistant.ts
  // dan memakai Gemini API langsung bila GOOGLE_GENERATIVE_AI_API_KEY diset;
  // tanpa itu ia jatuh ke Vercel AI Gateway (AI_GATEWAY_API_KEY + `model`).
  // Asisten hanya ditampilkan bila salah satu kunci tersedia saat build.
  docus: {
    assistant: {
      enabled: !!(process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.AI_GATEWAY_API_KEY),
      mcpServer: '/mcp',
      // Hanya dipakai jalur AI Gateway. gemini-3-flash (default Docus) ditolak
      // untuk akun Gateway tanpa kredit; gemini-2.5-flash terbukti bisa.
      model: 'google/gemini-2.5-flash',
    },
  },

  // Bahasa syntax highlight. Docus bawaan tidak memuat tsx, php, dan blade,
  // padahal contoh "Penggunaan di Berbagai Teknologi" di halaman komponen
  // memakainya (React, PHP, Laravel). Tanpa ini kodenya tampil polos.
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['bash', 'diff', 'json', 'js', 'ts', 'tsx', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'php', 'blade'],
        },
      },
    },
  },

  // Runtime config (server-only). Bisa juga ditimpa saat runtime lewat
  // NUXT_GOOGLE_API_KEY / NUXT_GEMINI_MODEL / NUXT_AI_GATEWAY_API_KEY.
  runtimeConfig: {
    googleApiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
    geminiModel: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
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
