import { closest } from "./util";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: "success" | "warning" | "danger" | "info";
  /** Milidetik sebelum toast hilang. 0 = tetap sampai ditutup. Default 6000, atau 0 untuk "danger". */
  duration?: number;
  /** Label tombol tutup untuk pembaca layar. Default "Tutup notifikasi". */
  closeLabel?: string;
}

export interface ToastHandle {
  close(): void;
}

let container: HTMLElement | null = null;

function el(tag: string, className: string, text?: string): HTMLElement {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/**
 * Tampilkan toast. Wadahnya sebuah live region (aria-live="polite"); toast
 * "danger" memakai role="alert" supaya langsung dibacakan. Timer berhenti
 * selama kursor atau fokus ada di toast (WCAG 2.2.1).
 */
export function toast(options: ToastOptions): ToastHandle {
  const fresh = !container?.isConnected;
  if (fresh) {
    container = document.querySelector<HTMLElement>(".mjl-toast-container") ?? document.body.appendChild(el("div", "mjl-toast-container"));
    container.setAttribute("aria-live", "polite");
  }

  const { title, description, variant, closeLabel = "Tutup notifikasi" } = options;
  const duration = options.duration ?? (variant === "danger" ? 0 : 6000);

  const item = el("div", `mjl-toast${variant ? ` mjl-toast--${variant}` : ""}`);
  if (variant === "danger") item.setAttribute("role", "alert");
  const content = el("div", "mjl-toast__content");
  content.append(el("div", "mjl-toast__title", title));
  if (description) content.append(el("div", "mjl-toast__desc", description));
  const close = el("button", "mjl-toast__close");
  close.setAttribute("type", "button");
  close.setAttribute("aria-label", closeLabel);
  const icon = el("span", "", "✕");
  icon.setAttribute("aria-hidden", "true");
  close.append(icon);
  item.append(content, close);

  let timer: ReturnType<typeof setTimeout> | undefined;
  let remaining = duration;
  let startedAt = 0;
  const dismiss = () => {
    clearTimeout(timer);
    item.remove();
  };
  const start = () => {
    if (!remaining) return;
    clearTimeout(timer);
    startedAt = Date.now();
    timer = setTimeout(dismiss, remaining);
  };
  const pause = () => {
    if (!remaining || timer === undefined) return;
    clearTimeout(timer);
    timer = undefined;
    remaining = Math.max(1000, remaining - (Date.now() - startedAt));
  };
  item.addEventListener("pointerenter", pause);
  item.addEventListener("focusin", pause);
  item.addEventListener("pointerleave", start);
  item.addEventListener("focusout", start);

  // Live region yang baru dibuat perlu jeda sebentar sebelum diisi,
  // kalau tidak pembaca layar melewatkan pengumuman pertama.
  const show = () => {
    container!.append(item);
    start();
  };
  if (fresh) setTimeout(show, 100);
  else show();

  return { close: dismiss };
}

/** Tombol .mjl-toast__close di markup statis juga menutup toast-nya. */
export function setupToast(): void {
  document.addEventListener("click", (event) => {
    closest(event.target, ".mjl-toast__close")?.closest(".mjl-toast")?.remove();
  });
}
