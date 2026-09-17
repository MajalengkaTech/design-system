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
  resolve(__dirname, "src/components/gov-banner.css"),
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
];

let fullCss = `/*!
 * @majalengka/css v0.1.0
 * Pure standalone CSS distribution for Majalengka Design System
 * (c) 2026 Pemerintah Kabupaten Majalengka / Majalengka.tech
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

writeFileSync(resolve(distDir, "majalengka.min.css"), `/*! @majalengka/css v0.1.0 | MIT */\n` + minifiedCss);

console.log(`CSS build completed:`);
console.log(`- dist/majalengka.css (${(Buffer.byteLength(fullCss) / 1024).toFixed(2)} kB)`);
console.log(`- dist/majalengka.min.css (${(Buffer.byteLength(minifiedCss) / 1024).toFixed(2)} kB)`);
