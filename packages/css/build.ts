import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "dist");
mkdirSync(distDir, { recursive: true });

const filesToBundle = [
  resolve(__dirname, "../tokens/dist/tokens.css"),
  resolve(__dirname, "src/reset.css"),
  resolve(__dirname, "src/typography.css"),
  resolve(__dirname, "src/layout.css"),
  resolve(__dirname, "src/components/skip-link.css"),
  resolve(__dirname, "src/components/trust-banner.css"),
  resolve(__dirname, "src/components/banner.css"),
  resolve(__dirname, "src/components/icon.css"),
  resolve(__dirname, "src/components/button.css"),
  resolve(__dirname, "src/components/button-group.css"),
  resolve(__dirname, "src/components/badge.css"),
  resolve(__dirname, "src/components/chip.css"),
  resolve(__dirname, "src/components/avatar.css"),
  resolve(__dirname, "src/components/user.css"),
  resolve(__dirname, "src/components/form.css"),
  resolve(__dirname, "src/components/slider.css"),
  resolve(__dirname, "src/components/pin-input.css"),
  resolve(__dirname, "src/components/switch.css"),
  resolve(__dirname, "src/components/tabs.css"),
  resolve(__dirname, "src/components/stepper.css"),
  resolve(__dirname, "src/components/table.css"),
  resolve(__dirname, "src/components/alert.css"),
  resolve(__dirname, "src/components/toast.css"),
  resolve(__dirname, "src/components/drawer.css"),
  resolve(__dirname, "src/components/card.css"),
  resolve(__dirname, "src/components/stat-card.css"),
  resolve(__dirname, "src/components/timeline.css"),
  resolve(__dirname, "src/components/skeleton.css"),
  resolve(__dirname, "src/components/progress.css"),
  resolve(__dirname, "src/components/kbd.css"),
  resolve(__dirname, "src/components/tooltip.css"),
  resolve(__dirname, "src/components/misc.css"),
  resolve(__dirname, "src/components/icon-button.css"),
  resolve(__dirname, "src/components/fieldset.css"),
  resolve(__dirname, "src/components/form-summary.css"),
  resolve(__dirname, "src/components/header.css"),
  resolve(__dirname, "src/components/nav-menu.css"),
  resolve(__dirname, "src/components/footer.css"),
  resolve(__dirname, "src/components/error-page.css"),
  resolve(__dirname, "src/components/description-list.css"),
  resolve(__dirname, "src/components/file-list.css"),
  resolve(__dirname, "src/components/page-header.css"),
];

let fullCss = `/*!
 * @majalengka/css v0.1.0
 * Pure standalone CSS distribution for Majalengka Design System
 * (c) 2026 Komunitas Majalengka.tech
 * Released under MIT License
 */\n\n`;

for (const file of filesToBundle) {
  try {
    const content = readFileSync(file, "utf-8");
    fullCss += `/* --- File: ${file.split(/[\\/]/).pop()} --- */\n` + content + "\n\n";
  } catch (err) {
    console.error(`Warning: Failed to read ${file}`, err);
  }
}

// Write full unminified CSS
writeFileSync(resolve(distDir, "majalengka.css"), fullCss);

// Simple effective CSS minifier (strip comments, whitespace)
const minifiedCss = fullCss
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s*([\{\}:;,>+~])\s*/g, "$1")
  .replace(/;}/g, "}")
  .trim();

import { gzipSync } from "node:zlib";

writeFileSync(resolve(distDir, "majalengka.min.css"), `/*! @majalengka/css v0.1.0 | MIT */\n` + minifiedCss);

const rawKb = (Buffer.byteLength(fullCss) / 1024).toFixed(2);
const minKb = (Buffer.byteLength(minifiedCss) / 1024).toFixed(2);
const gzippedBuffer = gzipSync(Buffer.from(minifiedCss));
const gzipKb = (Buffer.byteLength(gzippedBuffer) / 1024).toFixed(2);

// Performance budget: Minified < 35 kB ATAU Gzipped < 12 kB
const passedBudget = Number(minKb) < 35 || Number(gzipKb) < 12;

console.log(`\n================ CSS BUILD & BUDGET ================`);
console.log(`- dist/majalengka.css      : ${rawKb} kB`);
console.log(`- dist/majalengka.min.css  : ${minKb} kB (target < 35 kB)`);
console.log(`- dist/majalengka (gzipped): ${gzipKb} kB (target < 12 kB)`);
console.log(`- Performance Budget       : ${passedBudget ? "✅ PASSED" : "❌ FAILED"}`);
console.log(`====================================================\n`);
