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

// 2. Semantic tokens — dibaca dari src/semantic/{light,dark}.json, BUKAN
// ditulis manual di sini. Path token menjadi nama CSS variable
// (bg.canvas -> --mjl-bg-canvas, color.text.linkHover -> --mjl-color-text-link-hover)
// dan referensi DTCG {a.b.c} menjadi var(--mjl-a-b-c).
type TokenNode = { $value?: unknown; [key: string]: unknown };

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const varName = (path: string[]) => `--mjl-${path.map(kebab).join("-")}`;

function flattenTokens(node: TokenNode, path: string[] = [], out = new Map<string, string>()) {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith("$") || typeof child !== "object" || child === null) continue;
    const childNode = child as TokenNode;
    if ("$value" in childNode) out.set(varName([...path, key]), String(childNode.$value));
    else flattenTokens(childNode, [...path, key], out);
  }
  return out;
}

// Semua CSS variable global yang sudah ditulis di blok :root di atas — target
// referensi yang sah selain token semantik itu sendiri.
const globalVars = new Set([...css.matchAll(/^\s*(--mjl-[a-z0-9-]+):/gm)].map((m) => m[1]));

function semanticBlock(selector: string, title: string, tokens: Map<string, string>) {
  let block = `/* ==========================================================================\n   ${title}\n   ========================================================================== */\n${selector} {\n`;
  let group = "";
  for (const [name, raw] of tokens) {
    const value = raw.replace(/\{([^}]+)\}/g, (_, ref: string) => {
      const target = varName(ref.split("."));
      if (!globalVars.has(target) && !tokens.has(target)) {
        throw new Error(`[${title}] ${name} mereferensikan {${ref}} yang tidak ada`);
      }
      return `var(${target})`;
    });
    // Baris kosong antar-kelompok (bg, text, action-primary, color-surface, ...) agar mudah dibaca.
    const depth = /^--mjl-(color|action)-/.test(name) ? 5 : 4;
    const nextGroup = name.split("-").slice(0, depth).join("-");
    if (nextGroup !== group) {
      block += group ? "\n" : "";
      group = nextGroup;
    }
    block += `  ${name}: ${value};\n`;
  }
  return block + "}\n";
}

const lightTokens = flattenTokens(lightSemantic as TokenNode);
const darkTokens = flattenTokens(darkSemantic as TokenNode);

// Mode gelap harus mendefinisikan ulang SEMUA token semantik: custom property
// yang berisi var() dihitung di elemen tempat ia dideklarasikan lalu diwarisi
// sebagai nilai jadi, jadi token yang terlewat akan tetap bernilai mode terang.
const missingInDark = [...lightTokens.keys()].filter((k) => !darkTokens.has(k));
const extraInDark = [...darkTokens.keys()].filter((k) => !lightTokens.has(k));
if (missingInDark.length || extraInDark.length) {
  throw new Error(
    `light.json dan dark.json harus punya token yang sama.\n` +
      (missingInDark.length ? `  Hilang di dark: ${missingInDark.join(", ")}\n` : "") +
      (extraInDark.length ? `  Hanya ada di dark: ${extraInDark.join(", ")}\n` : ""),
  );
}

css += `}\n\n`;
css += semanticBlock(":root", "Semantic Functional Tokens - Light Mode", lightTokens);
const darkCss = semanticBlock(
  '[data-theme="dark"],\n[data-mode="dark"],\n.dark',
  "Semantic Functional Tokens - Dark Mode",
  darkTokens,
);
css += `\n${darkCss}`;

writeFileSync(resolve(distDir, "tokens.css"), css);
writeFileSync(
  resolve(distDir, "tokens-dark.css"),
  `/* @majalengka/tokens - hanya blok mode gelap. Butuh tokens.css (token global) dimuat lebih dulu. */\n${darkCss}`,
);

// 3. Generate TypeScript Export
const tsContent = `/**
 * @majalengka/tokens TypeScript exports
 */

export const colors = ${JSON.stringify(colorData.color, null, 2)} as const;
export const typography = ${JSON.stringify(typographyData.typography, null, 2)} as const;
export const spacing = ${JSON.stringify(spacingData.spacing, null, 2)} as const;
export const elevation = ${JSON.stringify(elevationData.elevation, null, 2)} as const;

export const brand = {
  primary: ${JSON.stringify(colorData.color.primary["700"].$value)},
  mango: ${JSON.stringify(colorData.color.status.mango.fg.$value)},
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

export function presetMajalengka(options = {}) {
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

  const spacingGrid = ${JSON.stringify(
    Object.fromEntries([
      ...Object.entries(spacingData.spacing.grid).map(([k, v]) => [`mjl-${k}`, v.$value]),
      ["mjl-touch", spacingData.spacing.touchTarget.min.$value],
      ["mjl-touch-lg", spacingData.spacing.touchTarget.large.$value],
    ]),
    null,
    2
  )};

  const fontSizeScale = ${JSON.stringify(
    Object.fromEntries(
      Object.entries(typographyData.typography.scale).map(([k, v]) => [
        `mjl-${k}`,
        [v.fontSize.$value, String(v.lineHeight.$value)]
      ])
    ),
    null,
    2
  )};

  const breakpoints = ${JSON.stringify(
    Object.fromEntries(
      Object.entries(spacingData.spacing.breakpoint).map(([k, v]) => [`mjl-${k}`, v.$value])
    ),
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
      fontSize: fontSizeScale,
      spacing: spacingGrid,
      breakpoints: breakpoints,
      borderRadius: {
        "mjl-none": "${spacingData.spacing.radius.none?.$value || "0px"}",
        "mjl-sm": "${spacingData.spacing.radius.sm.$value}",
        "mjl-md": "${spacingData.spacing.radius.md.$value}",
        "mjl-lg": "${spacingData.spacing.radius.lg.$value}",
        "mjl-full": "${spacingData.spacing.radius.full.$value}"
      },
      boxShadow: {
        "mjl-sm": "${elevationData.elevation.shadow.sm.$value}",
        "mjl-md": "${elevationData.elevation.shadow.md.$value}",
        "mjl-lg": "${elevationData.elevation.shadow.lg.$value}",
        "mjl-xl": "${elevationData.elevation.shadow.xl?.$value || "0 20px 25px -5px rgba(0, 0, 0, 0.1)"}"
      }
    },
    shortcuts: {
      // Container
      "mjl-container": "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",

      // Skip link
      "mjl-skip-link": "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-mjl-primary-700 focus:text-white focus:rounded-mjl-md focus:shadow-mjl-md",

      // Button Shortcuts
      "mjl-btn-base": "inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "mjl-btn-sm": "h-8 px-3 text-xs rounded-mjl-sm gap-1.5",
      "mjl-btn-md": "h-10 px-4 text-sm rounded-mjl-md gap-2",
      "mjl-btn-lg": "h-12 px-6 text-base rounded-mjl-md gap-2.5",
      "mjl-btn-primary": "bg-mjl-primary-700 text-white hover:bg-mjl-primary-800 active:bg-mjl-primary-900 focus-visible:ring-mjl-primary-500",
      "mjl-btn-secondary": "bg-mjl-neutral-200 text-mjl-neutral-900 hover:bg-mjl-neutral-300 active:bg-mjl-neutral-400 focus-visible:ring-mjl-neutral-400",
      "mjl-btn-outline": "border border-mjl-primary-700 text-mjl-primary-700 hover:bg-mjl-primary-50 active:bg-mjl-primary-100 focus-visible:ring-mjl-primary-500",

      // Form Controls
      "mjl-input": "w-full h-10 px-3 py-2 text-sm bg-white dark:bg-mjl-neutral-900 border border-mjl-neutral-300 dark:border-mjl-neutral-700 rounded-mjl-md focus:outline-none focus:ring-2 focus:ring-mjl-primary-500 focus:border-mjl-primary-500 transition-colors",
      "mjl-label": "block text-sm font-medium text-mjl-neutral-700 dark:text-mjl-neutral-200 mb-1.5",

      // Badges
      "mjl-badge": "inline-flex items-center font-medium px-2.5 py-0.5 rounded-mjl-full text-xs gap-1",
      "mjl-badge-success": "bg-mjl-status-success-bg text-mjl-status-success-fg border border-mjl-status-success-border",
      "mjl-badge-warning": "bg-mjl-status-warning-bg text-mjl-status-warning-fg border border-mjl-status-warning-border",
      "mjl-badge-danger": "bg-mjl-status-danger-bg text-mjl-status-danger-fg border border-mjl-status-danger-border",
      "mjl-badge-info": "bg-mjl-status-info-bg text-mjl-status-info-fg border border-mjl-status-info-border",

      // Cards
      "mjl-card-base": "bg-white dark:bg-mjl-neutral-900 border border-mjl-neutral-200 dark:border-mjl-neutral-800 rounded-mjl-lg p-6 shadow-mjl-sm"
    }
  };
}

export default presetMajalengka;
`;

const presetDts = `export interface PresetMajalengkaOptions {}

export interface MajalengkaTheme {
  colors: Record<string, any>;
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, string]>;
  spacing: Record<string, string>;
  breakpoints: Record<string, string>;
  borderRadius: Record<string, string>;
  boxShadow: Record<string, string>;
}

export declare function presetMajalengka(options?: PresetMajalengkaOptions): {
  name: "unocss-preset-majalengka";
  theme: MajalengkaTheme;
  shortcuts: Record<string, string>;
};

export default presetMajalengka;
`;

writeFileSync(resolve(distDir, "preset.js"), presetContent);
writeFileSync(resolve(distDir, "preset.d.ts"), presetDts);

console.log("Tokens and UnoCSS preset compiled successfully to dist/");

