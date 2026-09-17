import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import colorData from "./src/global/color.json";
import typographyData from "./src/global/typography.json";
import spacingData from "./src/global/spacing.json";
import elevationData from "./src/global/elevation.json";
import lightSemantic from "./src/semantic/light.json";
import darkSemantic from "./src/semantic/dark.json";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "dist");
mkdirSync(distDir, { recursive: true });

// 1. Generate Light & Global CSS
let css = `/**
 * @majalengka/tokens
 * Majalengka Design System - Core Design Tokens
 * Generated automatically from W3C DTCG Token definitions
 */

:root {
  /* Global Color: Primary (Biru Majalengka) */
`;

for (const [step, obj] of Object.entries(colorData.color.primary)) {
  css += `  --mjl-color-primary-${step}: ${obj.$value};\n`;
}

css += `\n  /* Global Color: Neutral */\n`;
for (const [step, obj] of Object.entries(colorData.color.neutral)) {
  css += `  --mjl-color-neutral-${step}: ${obj.$value};\n`;
}

css += `\n  /* Global Color: Status */\n`;
css += `  --mjl-color-status-success-bg: ${colorData.color.status.success.bg.$value};\n`;
css += `  --mjl-color-status-success-border: ${colorData.color.status.success.border.$value};\n`;
css += `  --mjl-color-status-success-fg: ${colorData.color.status.success.fg.$value};\n`;
css += `  --mjl-color-status-warning-bg: ${colorData.color.status.warning.bg.$value};\n`;
css += `  --mjl-color-status-warning-border: ${colorData.color.status.warning.border.$value};\n`;
css += `  --mjl-color-status-warning-fg: ${colorData.color.status.warning.fg.$value};\n`;
css += `  --mjl-color-status-danger-bg: ${colorData.color.status.danger.bg.$value};\n`;
css += `  --mjl-color-status-danger-border: ${colorData.color.status.danger.border.$value};\n`;
css += `  --mjl-color-status-danger-fg: ${colorData.color.status.danger.fg.$value};\n`;
css += `  --mjl-color-status-info-bg: ${colorData.color.status.info.bg.$value};\n`;
css += `  --mjl-color-status-info-border: ${colorData.color.status.info.border.$value};\n`;
css += `  --mjl-color-status-info-fg: ${colorData.color.status.info.fg.$value};\n`;
css += `  --mjl-color-status-mango: ${colorData.color.status.mango.fg.$value};\n`;

css += `\n  /* Typography */\n`;
css += `  --mjl-font-title: ${typographyData.typography.fontFamily.title.$value};\n`;
css += `  --mjl-font-body: ${typographyData.typography.fontFamily.body.$value};\n`;
css += `  --mjl-font-mono: ${typographyData.typography.fontFamily.mono.$value};\n`;

for (const [step, obj] of Object.entries(typographyData.typography.scale)) {
  css += `  --mjl-text-${step}-size: ${obj.fontSize.$value};\n`;
  css += `  --mjl-text-${step}-line-height: ${obj.lineHeight.$value};\n`;
}

css += `\n  /* Spacing Grid (4px base) */\n`;
for (const [step, obj] of Object.entries(spacingData.spacing.grid)) {
  css += `  --mjl-space-${step}: ${obj.$value};\n`;
}

css += `\n  /* Radii */\n`;
for (const [step, obj] of Object.entries(spacingData.spacing.radius)) {
  css += `  --mjl-radius-${step}: ${obj.$value};\n`;
}

css += `\n  /* Touch Targets */\n`;
css += `  --mjl-touch-min: ${spacingData.spacing.touchTarget.min.$value};\n`;
css += `  --mjl-touch-large: ${spacingData.spacing.touchTarget.large.$value};\n`;

css += `\n  /* Elevation: Shadows */\n`;
for (const [step, obj] of Object.entries(elevationData.elevation.shadow)) {
  css += `  --mjl-shadow-${step}: ${obj.$value};\n`;
}

css += `\n  /* Elevation: Layers (Z-Index) */\n`;
for (const [step, obj] of Object.entries(elevationData.elevation.layer)) {
  css += `  --mjl-layer-${step}: ${obj.$value};\n`;
}

css += `\n  /* Motion */\n`;
for (const [step, obj] of Object.entries(elevationData.elevation.motion.duration)) {
  css += `  --mjl-duration-${step}: ${obj.$value};\n`;
}
for (const [step, obj] of Object.entries(elevationData.elevation.motion.easing)) {
  css += `  --mjl-ease-${step}: ${obj.$value};\n`;
}

css += `\n  /* ==========================================================================
     Semantic Functional Tokens (Kumo-Style Architecture) - Light Mode
     ========================================================================== */
  /* Surfaces */
  --mjl-bg-canvas: var(--mjl-color-neutral-100);
  --mjl-bg-base: #FFFFFF;
  --mjl-bg-elevated: #F7F8FA;
  --mjl-bg-tint: rgba(0, 0, 0, 0.04);
  --mjl-bg-sunken: #EEF0F4;

  /* Typography */
  --mjl-text-strong: #0B0E15;
  --mjl-text-default: #222834;
  --mjl-text-subtle: #6B7488;
  --mjl-text-muted: #97A0B2;
  --mjl-text-inverse: #FFFFFF;
  --mjl-text-brand: var(--mjl-color-primary-700); /* #0014A8 Hero Biru Majalengka */

  /* Borders & Hairlines */
  --mjl-border-line: rgba(0, 0, 0, 0.08);
  --mjl-border-hairline: rgba(0, 0, 0, 0.05);
  --mjl-border-input: #DFE3EA;
  --mjl-border-focus: var(--mjl-color-primary-500);
  --mjl-border-brand: var(--mjl-color-primary-700);

  /* Actions */
  --mjl-action-primary-bg: var(--mjl-color-primary-700); /* #0014A8 di mode terang */
  --mjl-action-primary-hover: var(--mjl-color-primary-800); /* #001086 */
  --mjl-action-primary-active: var(--mjl-color-primary-900); /* #000C63 */
  --mjl-action-primary-fg: #FFFFFF;
  --mjl-action-primary-ring: rgba(0, 20, 168, 0.25);

  --mjl-action-secondary-bg: var(--mjl-bg-base);
  --mjl-action-secondary-hover: var(--mjl-bg-tint);
  --mjl-action-secondary-fg: var(--mjl-text-default);
  --mjl-action-secondary-border: var(--mjl-border-line);

  --mjl-action-danger-bg: var(--mjl-color-status-danger-fg);
  --mjl-action-danger-hover: #931d17;
  --mjl-action-danger-fg: #FFFFFF;

  /* Backward Compatibility Aliases */
  --mjl-color-surface-canvas: var(--mjl-bg-canvas);
  --mjl-color-surface-card: var(--mjl-bg-base);
  --mjl-color-surface-sunken: var(--mjl-bg-sunken);
  --mjl-color-surface-overlay: var(--mjl-bg-elevated);
  --mjl-color-text-primary: var(--mjl-text-strong);
  --mjl-color-text-secondary: var(--mjl-text-subtle);
  --mjl-color-text-muted: var(--mjl-text-muted);
  --mjl-color-text-inverse: var(--mjl-text-inverse);
  --mjl-color-text-link: var(--mjl-text-brand);
  --mjl-color-text-link-hover: var(--mjl-color-primary-800);
  --mjl-color-action-primary-default: var(--mjl-action-primary-bg);
  --mjl-color-action-primary-hover: var(--mjl-action-primary-hover);
  --mjl-color-action-primary-active: var(--mjl-action-primary-active);
  --mjl-color-action-primary-fg: var(--mjl-action-primary-fg);
  --mjl-color-action-secondary-default: var(--mjl-action-secondary-bg);
  --mjl-color-action-secondary-hover: var(--mjl-action-secondary-hover);
  --mjl-color-action-secondary-active: var(--mjl-color-neutral-400);
  --mjl-color-action-secondary-fg: var(--mjl-action-secondary-fg);
  --mjl-color-border-subtle: var(--mjl-border-hairline);
  --mjl-color-border-default: var(--mjl-border-line);
  --mjl-color-border-input: var(--mjl-border-input);
  --mjl-color-border-focus: var(--mjl-border-focus);
  --mjl-color-border-error: var(--mjl-color-status-danger-fg);
}

/* ==========================================================================
   Semantic Functional Tokens - Dark Mode (Automatic High Contrast)
   ========================================================================== */
[data-theme="dark"],
[data-mode="dark"],
.dark {
  /* Surfaces */
  --mjl-bg-canvas: #0B0E15;
  --mjl-bg-base: #151922;
  --mjl-bg-elevated: #1C222E;
  --mjl-bg-tint: rgba(255, 255, 255, 0.06);
  --mjl-bg-sunken: #07090E;

  /* Typography */
  --mjl-text-strong: #F7F8FA;
  --mjl-text-default: #DFE3EA;
  --mjl-text-subtle: #97A0B2;
  --mjl-text-muted: #6B7488;
  --mjl-text-inverse: #0B0E15;
  --mjl-text-brand: #94A3FF; /* Luminous Majalengka Blue (WCAG AAA kontras di latar gelap) */

  /* Borders & Hairlines */
  --mjl-border-line: rgba(255, 255, 255, 0.12);
  --mjl-border-hairline: rgba(255, 255, 255, 0.06);
  --mjl-border-input: #2D3748;
  --mjl-border-focus: #6B7DFF;
  --mjl-border-brand: #6B7DFF;

  /* Actions */
  --mjl-action-primary-bg: #4256F5; /* Luminous Blue Majalengka agar kontras & menyala di latar gelap */
  --mjl-action-primary-hover: #6B7DFF;
  --mjl-action-primary-active: #94A3FF;
  --mjl-action-primary-fg: #FFFFFF;
  --mjl-action-primary-ring: rgba(107, 125, 255, 0.35);

  --mjl-action-secondary-bg: var(--mjl-bg-base);
  --mjl-action-secondary-hover: var(--mjl-bg-tint);
  --mjl-action-secondary-fg: var(--mjl-text-default);
  --mjl-action-secondary-border: var(--mjl-border-line);

  --mjl-action-danger-bg: #E03131;
  --mjl-action-danger-hover: #F03E3E;
  --mjl-action-danger-fg: #FFFFFF;

  /* Backward Compatibility Aliases */
  --mjl-color-surface-canvas: var(--mjl-bg-canvas);
  --mjl-color-surface-card: var(--mjl-bg-base);
  --mjl-color-surface-sunken: var(--mjl-bg-sunken);
  --mjl-color-surface-overlay: var(--mjl-bg-elevated);
  --mjl-color-text-primary: var(--mjl-text-strong);
  --mjl-color-text-secondary: var(--mjl-text-subtle);
  --mjl-color-text-muted: var(--mjl-text-muted);
  --mjl-color-text-inverse: var(--mjl-text-inverse);
  --mjl-color-text-link: var(--mjl-text-brand);
  --mjl-color-text-link-hover: #BCC7FF;
  --mjl-color-action-primary-default: var(--mjl-action-primary-bg);
  --mjl-color-action-primary-hover: var(--mjl-action-primary-hover);
  --mjl-color-action-primary-active: var(--mjl-action-primary-active);
  --mjl-color-action-primary-fg: var(--mjl-action-primary-fg);
  --mjl-color-action-secondary-default: var(--mjl-action-secondary-bg);
  --mjl-color-action-secondary-hover: var(--mjl-action-secondary-hover);
  --mjl-color-action-secondary-active: #4C5466;
  --mjl-color-action-secondary-fg: var(--mjl-action-secondary-fg);
  --mjl-color-border-subtle: var(--mjl-border-hairline);
  --mjl-color-border-default: var(--mjl-border-line);
  --mjl-color-border-input: var(--mjl-border-input);
  --mjl-color-border-focus: var(--mjl-border-focus);
  --mjl-color-border-error: #F87171;
}
`;

writeFileSync(resolve(distDir, "tokens.css"), css);
writeFileSync(resolve(distDir, "tokens-dark.css"), css.slice(css.indexOf('[data-theme="dark"]')));

// 3. Generate TypeScript Export
const tsContent = `/**
 * @majalengka/tokens TypeScript exports
 */

export const colors = ${JSON.stringify(colorData.color, null, 2)} as const;
export const typography = ${JSON.stringify(typographyData.typography, null, 2)} as const;
export const spacing = ${JSON.stringify(spacingData.spacing, null, 2)} as const;
export const elevation = ${JSON.stringify(elevationData.elevation, null, 2)} as const;

export const brand = {
  primary: "#0014A8",
  mango: "#F0A202",
  name: "Majalengka Design System",
  tagline: "Design system open-source untuk ekosistem web Majalengka.tech"
} as const;
`;

// index.js is executed as plain JS at runtime — "as const" is TS-only syntax
// and would throw a SyntaxError there, so strip it. index.d.ts is read by the
// TypeScript compiler only, so it keeps "as const" for literal-type inference.
writeFileSync(resolve(distDir, "index.js"), tsContent.replaceAll(" as const", ""));
writeFileSync(resolve(distDir, "index.d.ts"), tsContent);

// 4. Generate UnoCSS Preset & Tailwind Config helper
const presetContent = `/**
 * @majalengka/tokens - UnoCSS Preset & Tailwind Theme Config
 */

export function presetMajalengka() {
  const primaryColors = ${JSON.stringify(
    Object.fromEntries(Object.entries(colorData.color.primary).map(([k, v]) => [k, v.$value])),
    null,
    2
  )};

  const neutralColors = ${JSON.stringify(
    Object.fromEntries(Object.entries(colorData.color.neutral).map(([k, v]) => [k, v.$value])),
    null,
    2
  )};

  return {
    name: "unocss-preset-majalengka",
    theme: {
      colors: {
        "mjl-primary": primaryColors,
        "mjl-neutral": neutralColors,
        "mjl-mango": "${colorData.color.status.mango.fg.$value}",
        "mjl-status": {
          "success-bg": "${colorData.color.status.success.bg.$value}",
          "success-border": "${colorData.color.status.success.border.$value}",
          "success-fg": "${colorData.color.status.success.fg.$value}",
          "warning-bg": "${colorData.color.status.warning.bg.$value}",
          "warning-border": "${colorData.color.status.warning.border.$value}",
          "warning-fg": "${colorData.color.status.warning.fg.$value}",
          "danger-bg": "${colorData.color.status.danger.bg.$value}",
          "danger-border": "${colorData.color.status.danger.border.$value}",
          "danger-fg": "${colorData.color.status.danger.fg.$value}",
          "info-bg": "${colorData.color.status.info.bg.$value}",
          "info-border": "${colorData.color.status.info.border.$value}",
          "info-fg": "${colorData.color.status.info.fg.$value}"
        }
      },
      fontFamily: {
        "mjl-title": ["${typographyData.typography.fontFamily.title.$value}", "sans-serif"],
        "mjl-body": ["${typographyData.typography.fontFamily.body.$value}", "sans-serif"],
        "mjl-mono": ["${typographyData.typography.fontFamily.mono.$value}", "monospace"]
      },
      borderRadius: {
        "mjl-sm": "${spacingData.spacing.radius.sm.$value}",
        "mjl-md": "${spacingData.spacing.radius.md.$value}",
        "mjl-lg": "${spacingData.spacing.radius.lg.$value}",
        "mjl-full": "${spacingData.spacing.radius.full.$value}"
      },
      boxShadow: {
        "mjl-sm": "${elevationData.elevation.shadow.sm.$value}",
        "mjl-md": "${elevationData.elevation.shadow.md.$value}",
        "mjl-lg": "${elevationData.elevation.shadow.lg.$value}"
      }
    },
    shortcuts: {
      "mjl-btn-base": "inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "mjl-btn-sm": "h-8 px-3 text-xs rounded-mjl-sm gap-1.5",
      "mjl-btn-md": "h-10 px-4 text-sm rounded-mjl-md gap-2",
      "mjl-btn-lg": "h-12 px-6 text-base rounded-mjl-md gap-2.5",
      "mjl-btn-primary": "bg-mjl-primary-700 text-white hover:bg-mjl-primary-800 active:bg-mjl-primary-900 focus-visible:ring-mjl-primary-500",
      "mjl-btn-secondary": "bg-mjl-neutral-200 text-mjl-neutral-900 hover:bg-mjl-neutral-300 active:bg-mjl-neutral-400 focus-visible:ring-mjl-neutral-400",
      "mjl-btn-outline": "border border-mjl-primary-700 text-mjl-primary-700 hover:bg-mjl-primary-50 active:bg-mjl-primary-100 focus-visible:ring-mjl-primary-500",
      "mjl-card-base": "bg-white dark:bg-mjl-neutral-900 border border-mjl-neutral-200 dark:border-mjl-neutral-800 rounded-mjl-lg p-6 shadow-mjl-sm"
    }
  };
}

export default presetMajalengka;
`;

const presetDts = `export declare function presetMajalengka(): any;
export default presetMajalengka;
`;

writeFileSync(resolve(distDir, "preset.js"), presetContent);
writeFileSync(resolve(distDir, "preset.d.ts"), presetDts);

console.log("Tokens and UnoCSS preset compiled successfully to dist/");

