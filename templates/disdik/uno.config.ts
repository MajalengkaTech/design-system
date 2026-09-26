import { defineConfig, presetIcons, presetWind3 } from 'unocss'
import { presetMajalengka } from '@majalengka/tokens/preset'

export default defineConfig({
  // Default UnoCSS tidak memindai .ts; kelas ikon ada di app/data/*.ts
  content: {
    pipeline: {
      include: [/\.(vue|ts|html)($|\?)/],
    },
  },
  presets: [
    presetWind3(),
    // preflight: false karena variabel token sudah dimuat lewat @majalengka/css
    presetMajalengka({ preflight: false }),
    presetIcons({
      // Didaftarkan eksplisit: pencarian otomatis Iconify tidak menemukan
      // paket di node_modules bergaya isolated milik Bun workspace
      collections: {
        lucide: () => import('@iconify-json/lucide/icons.json', { with: { type: 'json' } }).then(i => i.default),
      },
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle', 'flex-shrink': '0' },
    }),
  ],
  shortcuts: {
    'section-y': 'py-12 md:py-16',
    'eyebrow': 'text-mjl-xs font-semibold uppercase tracking-wider text-mjl-text-brand',
    'section-title': 'font-mjl-title text-mjl-2xl md:text-mjl-3xl font-bold text-mjl-text-strong',
  },
})
