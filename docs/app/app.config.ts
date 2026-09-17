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
    sub: false,
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
      neutral: 'slate',
    },
    // Docus subcomponent defaults (sesuai docs docus.dev/en/concepts/theme)
    toc: {
      title: 'Daftar Isi',
    },
    contentToc: {
      defaultVariants: {
        highlight: true,
        highlightColor: 'primary',
        highlightVariant: 'circuit',
      },
    },
    contentNavigation: {
      defaultVariants: {
        variant: 'pill',
        highlight: true,
        highlightColor: 'primary',
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
