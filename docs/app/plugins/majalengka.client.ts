import { init } from '@majalengka/js'

// Demo komponen di docs memakai @majalengka/js yang sama dengan pengguna:
// tabs, dialog, toggle, tooltip, dan OTP langsung berfungsi. MutationObserver
// di dalamnya ikut menangani halaman yang dimuat lewat navigasi SPA.
export default defineNuxtPlugin(() => {
	init()
})
