export type Theme = 'auto' | 'light' | 'dark'

/**
 * Pilihan tema disimpan di cookie (bukan localStorage) supaya server
 * langsung merender data-theme yang benar dan halaman tidak berkedip.
 */
export function useTheme() {
  return useCookie<Theme>('mjl-theme', {
    default: () => 'auto',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })
}
