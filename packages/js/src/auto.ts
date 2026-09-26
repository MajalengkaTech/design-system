/**
 * Versi <script> untuk situs tanpa build step (WordPress, PHP, Laravel Blade):
 *
 *   <script src="https://cdn.jsdelivr.net/npm/@majalengka/js/dist/majalengka.iife.js" defer></script>
 *
 * Langsung aktif setelah halaman dimuat. Toast: Mjl.toast({ title: "Tersimpan" }).
 */

import { init, toast } from "./index";

declare global {
  interface Window {
    Mjl: { init: typeof init; toast: typeof toast };
  }
}

window.Mjl = { init, toast };

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => init());
else init();
