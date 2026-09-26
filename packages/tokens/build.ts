import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { PREFIX, primitives, primitiveName, light, dark, raw, type SemanticToken } from "./src/model";
import contrastSpec from "./src/contrast.json";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "dist");
rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

const v = (name: string) => `--${PREFIX}-${name}`;
const fail = (msg: string): never => {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
};

// ---------------------------------------------------------------------------
// 1. Validasi: terang dan gelap wajib punya kunci yang sama
// ---------------------------------------------------------------------------
{
  const l = new Set(light.map((t) => t.path));
  const d = new Set(dark.map((t) => t.path));
  const missing = [...l].filter((p) => !d.has(p)).map((p) => `dark.json kurang: ${p}`);
  const extra = [...d].filter((p) => !l.has(p)).map((p) => `light.json kurang: ${p}`);
  if (missing.length || extra.length) fail(`Kunci semantik tidak sama:\n  ${[...missing, ...extra].join("\n  ")}`);
}

// ---------------------------------------------------------------------------
// 2. Cek kontras WCAG di kedua mode
// ---------------------------------------------------------------------------
function luminance(hex: string): number {
  const m = hex.match(/^#([0-9a-f]{6})$/i);
  if (!m) throw new Error(`bukan hex 6 digit: ${hex}`);
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(m[1].slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const ratio = (a: string, b: string) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

{
  const failures: string[] = [];
  let checked = 0;
  for (const [mode, tokens] of [["terang", light], ["gelap", dark]] as const) {
    const byPath = new Map(tokens.map((t) => [t.path, t.resolved]));
    for (const pair of contrastSpec.pairs) {
      for (const bg of pair.bg) {
        const fgVal = byPath.get(pair.fg);
        const bgVal = byPath.get(bg);
        if (!fgVal || !bgVal) fail(`contrast.json merujuk token yang tidak ada: ${pair.fg} / ${bg}`);
        let r: number;
        try {
          r = ratio(fgVal!, bgVal!);
        } catch (e) {
          fail(`contrast.json: ${pair.fg} di ${bg} (${mode}) harus warna solid — ${(e as Error).message}`);
        }
        checked++;
        if (r! < pair.min) {
          failures.push(`[${mode}] ${pair.fg} ${fgVal} di ${bg} ${bgVal}: ${r!.toFixed(2)}:1 (min ${pair.min})`);
        }
      }
    }
  }
  if (failures.length) fail(`Kontras gagal (${failures.length}/${checked}):\n  ${failures.join("\n  ")}`);
  console.log(`✅ Kontras: ${checked} pasangan lolos di mode terang dan gelap`);
}

// ---------------------------------------------------------------------------
// 3. tokens.css
// ---------------------------------------------------------------------------

const themeBody = (tokens: SemanticToken[], indent: string) =>
  tokens.map((t) => `${indent}${v(t.name)}: ${t.css};`).join("\n");

const primitiveDecls = primitives
  .map((t) => {
    const name = primitiveName(t.path);
    return name ? `  ${v(name)}: ${t.value};` : null;
  })
  .filter(Boolean)
  .join("\n");

const header = `/**
 * @majalengka/tokens — dibuat otomatis dari src/*.json. Jangan disunting manual.
 *
 * Mode gelap:
 *   <html data-theme="dark">   atau class="dark"  → selalu gelap
 *   <html data-theme="auto">                      → ikut pengaturan sistem
 *   <div data-theme="light">   atau class="light" → paksa terang di dalam area gelap
 */
`;

const darkBlocks = `[data-theme="dark"],
.dark {
  color-scheme: dark;
${themeBody(dark, "  ")}
}

@media (prefers-color-scheme: dark) {
  [data-theme="auto"] {
    color-scheme: dark;
${themeBody(dark, "    ")}
  }
}
`;

const css = `${header}
:root {
${primitiveDecls}
}

:root,
[data-theme="light"],
.light {
${themeBody(light, "  ")}
}

${darkBlocks}`;

writeFileSync(resolve(distDir, "tokens.css"), css);
writeFileSync(resolve(distDir, "tokens-dark.css"), `${header}\n${darkBlocks}`);

// ---------------------------------------------------------------------------
// 4. tokens.json — nilai final per mode, untuk alat apa pun (Figma, PHP, dsb.)
// ---------------------------------------------------------------------------
const flat = (tokens: SemanticToken[]) => Object.fromEntries(tokens.map((t) => [t.name, t.resolved]));
const primitiveFlat = Object.fromEntries(
  primitives.flatMap((t) => {
    const name = primitiveName(t.path);
    return name ? [[name, t.value]] : [];
  }),
);
const jsonOut = { prefix: `--${PREFIX}-`, primitives: primitiveFlat, light: flat(light), dark: flat(dark) };
writeFileSync(resolve(distDir, "tokens.json"), JSON.stringify(jsonOut, null, 2) + "\n");

// ---------------------------------------------------------------------------
// 5. tailwind.css — Tailwind v4. `inline` supaya utilitas memakai var() dan
//    ikut mode gelap. Wajib dimuat bersama tokens.css.
// ---------------------------------------------------------------------------
{
  const lines: string[] = [];
  for (const t of primitives) {
    const name = primitiveName(t.path);
    if (!name) {
      const bp = t.path.match(/^spacing\.breakpoint\.(.+)$/);
      if (bp) lines.push(`  --breakpoint-mjl-${bp[1]}: ${t.value};`);
      continue;
    }
    const map: [RegExp, string][] = [
      [/^color-(.+)$/, "--color-mjl-$1"],
      [/^font-(.+)$/, "--font-mjl-$1"],
      [/^text-(.+)-size$/, "--text-mjl-$1"],
      [/^text-(.+)-line-height$/, "--text-mjl-$1--line-height"],
      [/^space-(.+)$/, "--spacing-mjl-$1"],
      [/^touch-min$/, "--spacing-mjl-touch"],
      [/^touch-large$/, "--spacing-mjl-touch-lg"],
      [/^radius-(.+)$/, "--radius-mjl-$1"],
      [/^shadow-(.+)$/, "--shadow-mjl-$1"],
      [/^ease-(.+)$/, "--ease-mjl-$1"],
    ];
    const hit = map.find(([re]) => re.test(name));
    if (hit) lines.push(`  ${name.replace(hit[0], hit[1])}: var(${v(name)});`);
  }
  lines.push("", "  /* Semantik — ikut mode gelap */");
  for (const t of light) lines.push(`  --color-mjl-${t.name}: var(${v(t.name)});`);

  writeFileSync(
    resolve(distDir, "tailwind.css"),
    `/**
 * @majalengka/tokens — tema Tailwind CSS v4. Dibuat otomatis.
 *
 *   @import "tailwindcss";
 *   @import "@majalengka/tokens/css";
 *   @import "@majalengka/tokens/tailwind";
 *
 * Contoh: bg-mjl-action-primary-bg text-mjl-text-default p-mjl-4 rounded-mjl-md
 */
@theme inline {
${lines.join("\n")}
}
`,
  );
}

// ---------------------------------------------------------------------------
// 6. index.js / index.d.ts
// ---------------------------------------------------------------------------
{
  const ts = `/**
 * @majalengka/tokens — dibuat otomatis dari src/*.json.
 */

export const colors = ${JSON.stringify(raw.color, null, 2)} as const;
export const typography = ${JSON.stringify(raw.typography, null, 2)} as const;
export const spacing = ${JSON.stringify(raw.spacing, null, 2)} as const;
export const elevation = ${JSON.stringify(raw.elevation, null, 2)} as const;

/** Nilai final token semantik per mode, kunci = nama variabel tanpa "--mjl-". */
export const semantic = ${JSON.stringify({ light: flat(light), dark: flat(dark) }, null, 2)} as const;

export const brand = {
  primary: ${JSON.stringify(raw.color.primary["700"].$value)},
  mango: ${JSON.stringify(raw.color.mango["500"].$value)},
  name: "Majalengka Design System",
} as const;
`;
  // index.js dijalankan sebagai JS biasa, jadi "as const" dibuang di sana.
  writeFileSync(resolve(distDir, "index.js"), ts.replaceAll(" as const", ""));
  writeFileSync(resolve(distDir, "index.d.ts"), ts);
}

// ---------------------------------------------------------------------------
// 7. preset.js — dibundel dari src/unocss-preset.ts (satu sumber logika)
// ---------------------------------------------------------------------------
{
  const result = await Bun.build({
    entrypoints: [resolve(__dirname, "src/unocss-preset.ts")],
    outdir: distDir,
    naming: "preset.js",
    target: "node",
    format: "esm",
    define: { __MJL_TOKENS_CSS__: JSON.stringify(css) },
  });
  if (!result.success) fail(`Bundling preset gagal:\n${result.logs.join("\n")}`);

  writeFileSync(
    resolve(distDir, "preset.d.ts"),
    `export interface PresetMajalengkaOptions {
  /** Suntikkan variabel CSS token (termasuk mode gelap). Default: true. */
  preflight?: boolean;
}

export declare function presetMajalengka(options?: PresetMajalengkaOptions): {
  name: "unocss-preset-majalengka";
  theme: Record<string, any>;
  preflights: { getCSS: () => string }[];
  shortcuts: Record<string, string>;
};

export default presetMajalengka;
`,
  );
}

console.log(`✅ Token: ${primitives.length} primitive, ${light.length} semantik × 2 mode`);
console.log("✅ dist/: tokens.css, tokens-dark.css, tokens.json, tailwind.css, index.js, preset.js");
