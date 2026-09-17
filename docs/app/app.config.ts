export default defineAppConfig({
  header: {
    title: 'Majalengka Design System',
    logo: {
      light: '/logo-circle.svg',
      dark: '/logo-circle.svg',
      alt: 'Majalengka Design System',
    },
  },
  navigation: {
    sub: 'header',
  },
  docus: {
    locale: 'id',
  },
  socials: {
    github: 'https://github.com/MajalengkaTech/design-system',
  },
  ui: {
    colors: {
      primary: 'brand',
      neutral: 'gray',
    },
    // "garis kecil" = ring tipis di dalam (bukan border, biar sudutnya tetap
    // tajam — prinsip kumo-design shadow-borders), "bagian terang di atas" =
    // gradient putih transparan yang memudar ke bawah, cuma kelihatan di
    // solid variant karena butuh latar warna solid buat sheen-nya kebaca.
    button: {
      variants: {
        variant: {
          solid: 'ring-1 ring-inset ring-white/15 bg-linear-to-b from-white/20 to-transparent',
        },
      },
    },
  },

  // AI Assistant configuration
  assistant: {
    floatingInput: true,
    explainWithAi: true,
    shortcuts: {
      focusInput: 'meta_i',
    },
    icons: {
      trigger: 'i-lucide-sparkles',
      explain: 'i-lucide-brain',
    },
    faqQuestions: [
      {
        category: 'Memulai',
        items: [
          'Bagaimana cara menginstall Majalengka Design System?',
          'Apa saja komponen yang tersedia di MDS?',
          'Bagaimana cara menggunakan token warna MDS?',
        ],
      },
      {
        category: 'Komponen',
        items: [
          'Bagaimana cara membuat tombol dengan variasi yang berbeda?',
          'Bagaimana cara menggunakan komponen Form Field?',
          'Apa perbedaan Badge dan Chip?',
          'Kapan pakai Modal, dan kapan pakai ConfirmDialog?',
        ],
      },
      {
        category: 'Aksesibilitas',
        items: [
          'Apakah MDS memenuhi standar WCAG 2.1?',
          'Bagaimana cara memastikan kontras warna yang cukup?',
          'Apa itu TrustBanner dan kapan digunakan?',
        ],
      },
    ],
  },
})
