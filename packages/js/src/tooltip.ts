import { all, closest, ensureId } from "./util";

/**
 * Tooltip CSS (data-mjl-tooltip) dibuat bisa diakses:
 * - teksnya disambungkan lewat aria-describedby, jadi dibacakan pembaca layar
 * - Esc menyembunyikannya sampai kursor/fokus pindah (WCAG 1.4.13)
 */

export function enhanceTooltips(root: ParentNode): void {
  for (const trigger of all<HTMLElement>(root, "[data-mjl-tooltip]:not([data-mjl-tooltip-ready])")) {
    const text = document.createElement("span");
    text.hidden = true;
    text.textContent = trigger.dataset.mjlTooltip ?? "";
    trigger.after(text);
    const describedBy = trigger.getAttribute("aria-describedby");
    trigger.setAttribute("aria-describedby", `${describedBy ? `${describedBy} ` : ""}${ensureId(text, "tip")}`);
    trigger.setAttribute("data-mjl-tooltip-ready", "");
  }
}

export function setupTooltips(): void {
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document
      .querySelectorAll("[data-mjl-tooltip]:hover, [data-mjl-tooltip]:focus-visible")
      .forEach((trigger) => trigger.setAttribute("data-mjl-tooltip-dismissed", ""));
  });

  // Hanya saat benar-benar keluar dari trigger, bukan pindah ke elemen di dalamnya
  const reset = (event: PointerEvent | FocusEvent) => {
    const trigger = closest(event.target, "[data-mjl-tooltip]");
    const to = event.relatedTarget;
    if (trigger && !(to instanceof Node && trigger.contains(to))) trigger.removeAttribute("data-mjl-tooltip-dismissed");
  };
  document.addEventListener("pointerout", reset);
  document.addEventListener("focusout", reset);
}
