/**
 * @majalengka/tokens - UnoCSS Preset
 *
 * Primitive (bg-mjl-primary-700, p-mjl-4) berisi nilai literal.
 * Semantik (bg-mjl-bg-base, text-mjl-text-default, bg-mjl-action-primary-bg)
 * berisi var(--mjl-*), jadi otomatis mengikuti mode gelap. Variabelnya
 * disuntikkan lewat preflight; matikan dengan { preflight: false } kalau
 * tokens.css sudah dimuat sendiri.
 */

import { light, primitives, raw } from "./model";

// Diisi oleh build.ts saat bundling. Kosong kalau file ini dipakai langsung dari src.
declare const __MJL_TOKENS_CSS__: string;
const TOKENS_CSS = typeof __MJL_TOKENS_CSS__ === "string" ? __MJL_TOKENS_CSS__ : "";

export interface PresetMajalengkaOptions {
  /** Suntikkan variabel CSS token (termasuk mode gelap). Default: true. */
  preflight?: boolean;
}

function group(prefix: string, rename: (rest: string) => string = (r) => r) {
  const out: Record<string, string> = {};
  for (const t of primitives) {
    if (t.path.startsWith(prefix)) out[rename(t.path.slice(prefix.length))] = t.value;
  }
  return out;
}

function buildColors() {
  const colors: Record<string, Record<string, string>> = {};
  for (const t of primitives) {
    const m = t.path.match(/^color\.([^.]+)\.(.+)$/);
    if (!m) continue;
    (colors[`mjl-${m[1]}`] ??= {})[m[2]] = t.value;
  }
  colors["mjl-mango"].DEFAULT = raw.color.mango["500"].$value;

  // Semantik: grup = segmen pertama, kunci = sisanya (action.primary.bg -> mjl-action / primary-bg)
  for (const t of light) {
    const [head, ...rest] = t.path.split(".");
    (colors[`mjl-${head}`] ??= {})[rest.join("-")] = `var(--mjl-${t.name})`;
  }
  return colors;
}

export function presetMajalengka(options: PresetMajalengkaOptions = {}) {
  const touch = raw.spacing.touchTarget;

  const fontSize: Record<string, [string, string]> = {};
  for (const [step, s] of Object.entries(raw.typography.scale)) {
    fontSize[`mjl-${step}`] = [s.fontSize.$value, String(s.lineHeight.$value)];
  }

  return {
    name: "unocss-preset-majalengka",
    theme: {
      colors: buildColors(),
      fontFamily: group("typography.fontFamily.", (k) => `mjl-${k}`),
      fontSize,
      spacing: {
        ...group("spacing.grid.", (k) => `mjl-${k}`),
        "mjl-touch": touch.min.$value,
        "mjl-touch-lg": touch.large.$value,
      },
      breakpoints: group("spacing.breakpoint.", (k) => `mjl-${k}`),
      borderRadius: group("spacing.radius.", (k) => `mjl-${k}`),
      boxShadow: group("elevation.shadow.", (k) => `mjl-${k}`),
      duration: group("elevation.motion.duration.", (k) => `mjl-${k}`),
      easing: group("elevation.motion.easing.", (k) => `mjl-${k}`),
    },
    preflights: options.preflight === false || !TOKENS_CSS ? [] : [{ getCSS: () => TOKENS_CSS }],
    shortcuts: {
      "mjl-container": "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      "mjl-skip-link":
        "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 bg-mjl-action-primary-bg text-mjl-action-primary-fg rounded-mjl-md shadow-mjl-md",

      "mjl-btn-base":
        "inline-flex items-center justify-center gap-2 font-semibold border border-transparent transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mjl-border-focus focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
      "mjl-btn-sm": "min-h-8 px-3 text-mjl-sm rounded-mjl-sm",
      "mjl-btn-md": `min-h-[${touch.min.$value}] px-4 text-mjl-sm rounded-mjl-md`,
      "mjl-btn-lg": `min-h-[${touch.large.$value}] px-6 text-mjl-base rounded-mjl-md`,
      "mjl-btn-primary":
        "bg-mjl-action-primary-bg text-mjl-action-primary-fg hover:bg-mjl-action-primary-hover active:bg-mjl-action-primary-active",
      "mjl-btn-secondary":
        "bg-mjl-action-secondary-bg text-mjl-action-secondary-fg border-mjl-action-secondary-border hover:bg-mjl-action-secondary-hover active:bg-mjl-action-secondary-active",
      "mjl-btn-outline": "bg-transparent text-mjl-text-brand border-mjl-border-brand hover:bg-mjl-bg-tint",
      "mjl-btn-danger":
        "bg-mjl-action-danger-bg text-mjl-action-danger-fg hover:bg-mjl-action-danger-hover active:bg-mjl-action-danger-active",

      "mjl-input": `w-full min-h-[${touch.min.$value}] px-3 py-2 text-mjl-base bg-mjl-bg-base text-mjl-text-default border border-mjl-border-input rounded-mjl-md transition-colors focus:outline-none focus:border-mjl-border-focus focus:ring-2 focus:ring-mjl-action-primary-ring`,
      "mjl-label": "block text-mjl-sm font-medium text-mjl-text-strong mb-1.5",

      "mjl-badge": "inline-flex items-center gap-1 font-medium px-2.5 py-0.5 rounded-mjl-full text-mjl-xs border",
      "mjl-badge-success": "bg-mjl-status-success-bg text-mjl-status-success-fg border-mjl-status-success-border",
      "mjl-badge-warning": "bg-mjl-status-warning-bg text-mjl-status-warning-fg border-mjl-status-warning-border",
      "mjl-badge-danger": "bg-mjl-status-danger-bg text-mjl-status-danger-fg border-mjl-status-danger-border",
      "mjl-badge-info": "bg-mjl-status-info-bg text-mjl-status-info-fg border-mjl-status-info-border",

      "mjl-card-base": "bg-mjl-bg-base text-mjl-text-default border border-mjl-border-line rounded-mjl-lg p-6 shadow-mjl-sm",
    },
  };
}

export default presetMajalengka;
