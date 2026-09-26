import { all, closest } from "./util";

/**
 * Tombol buka/tutup untuk satu area, mis. "Cara memastikan" di TrustBanner:
 *
 *   <button data-mjl-toggle aria-controls="detail" aria-expanded="false">…</button>
 *   <div id="detail" hidden>…</div>
 *
 * Atribut data-mjl-toggle wajib, supaya tidak bentrok dengan tombol
 * aria-expanded milik tema atau plugin lain.
 */

const target = (button: Element) => document.getElementById(button.getAttribute("aria-controls") ?? "");

export function enhanceToggles(root: ParentNode): void {
  for (const button of all(root, "[data-mjl-toggle]:not([aria-expanded])")) {
    const panel = target(button);
    if (panel) button.setAttribute("aria-expanded", String(!panel.hidden));
  }
}

export function setupToggles(): void {
  document.addEventListener("click", (event) => {
    const button = closest(event.target, "[data-mjl-toggle]");
    const panel = button && target(button);
    if (!button || !panel) return;
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
  });
}
