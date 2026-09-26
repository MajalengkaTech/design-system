/**
 * @majalengka/js — perilaku kecil untuk komponen @majalengka/css. Tanpa dependensi.
 *
 *   import { init, toast } from "@majalengka/js";
 *   init();
 *
 * Aman di-import saat SSR: tidak ada yang menyentuh document sebelum init() dipanggil.
 */

import { setupCommands } from "./command";
import { enhanceToggles, setupToggles } from "./disclosure";
import { enhancePins, setupPins } from "./pin";
import { enhanceTabs, setupTabs } from "./tabs";
import { setupToast, toast } from "./toast";
import { enhanceTooltips, setupTooltips } from "./tooltip";

export { toast };
export type { ToastOptions, ToastHandle } from "./toast";

export interface InitOptions {
  /** Pantau DOM dan pasang perilaku ke elemen yang ditambahkan belakangan. Default: true. */
  observe?: boolean;
}

let started = false;

function enhance(root: ParentNode): void {
  enhanceTabs(root);
  enhanceTooltips(root);
  enhanceToggles(root);
  enhancePins(root);
}

/**
 * Pasang semua perilaku. Aman dipanggil berkali-kali: listener global hanya
 * dipasang sekali, dan elemen yang sudah diproses dilewati.
 */
export function init(root: ParentNode = document, options: InitOptions = {}): void {
  if (!started) {
    started = true;
    setupCommands();
    setupTabs();
    setupTooltips();
    setupToggles();
    setupPins();
    setupToast();
    if (options.observe !== false) {
      new MutationObserver((mutations) => {
        for (const m of mutations) m.addedNodes.forEach((node) => node instanceof Element && enhance(node));
      }).observe(document.documentElement, { childList: true, subtree: true });
    }
  }
  enhance(root);
}
