import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { transform } from "lightningcss";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "dist");
mkdirSync(distDir, { recursive: true });

const pkg = JSON.parse(readFileSync(resolve(__dirname, "package.json"), "utf-8")) as { version: string };

// Urutan menentukan cascade: token & reset dulu, lalu komponen.
const baseFiles = [
  resolve(__dirname, "../tokens/dist/tokens.css"),
  resolve(__dirname, "src/reset.css"),
  resolve(__dirname, "src/typography.css"),
  resolve(__dirname, "src/layout.css"),
];

const componentOrder = [
  "skip-link",
  "trust-banner",
  "banner",
  "icon",
  "button",
  "button-group",
  "badge",
  "chip",
  "avatar",
  "user",
  "form",
  "slider",
  "pin-input",
  "switch",
  "tabs",
  "stepper",
  "table",
  "alert",
  "toast",
  "drawer",
  "card",
  "stat-card",
  "timeline",
  "skeleton",
  "progress",
  "kbd",
  "tooltip",
  "misc",
  "icon-button",
  "fieldset",
  "form-summary",
  "header",
  "nav-menu",
  "footer",
  "error-page",
  "description-list",
  "file-list",
  "page-header",
];

// File komponen baru yang lupa didaftarkan di atas akan diam-diam hilang dari
// bundle — gagalkan build supaya ketahuan.
const componentsDir = resolve(__dirname, "src/components");
const onDisk = readdirSync(componentsDir).filter((f) => f.endsWith(".css")).map((f) => basename(f, ".css"));
const unlisted = onDisk.filter((name) => !componentOrder.includes(name));
const missing = componentOrder.filter((name) => !onDisk.includes(name));
if (unlisted.length || missing.length) {
  console.error(
    `Daftar komponen di build.ts tidak sinkron dengan src/components/.\n` +
      (unlisted.length ? `  Belum didaftarkan: ${unlisted.join(", ")}\n` : "") +
      (missing.length ? `  Terdaftar tapi file tidak ada: ${missing.join(", ")}\n` : ""),
  );
  process.exit(1);
}

const filesToBundle = [...baseFiles, ...componentOrder.map((name) => resolve(componentsDir, `${name}.css`))];

const year = new Date().getFullYear();
const banner = `/*!
 * @majalengka/css v${pkg.version}
 * Pure standalone CSS distribution for Majalengka Design System
 * (c) 2026${year > 2026 ? `-${year}` : ""} Komunitas Majalengka.tech
 * Released under MIT License
 */\n\n`;

let fullCss = banner;
for (const file of filesToBundle) {
  // Sengaja tidak di-try/catch: file yang tidak terbaca (mis. tokens belum
  // di-build) harus menggagalkan build, bukan menghasilkan CSS yang bolong.
  const content = readFileSync(file, "utf-8");
  fullCss += `/* --- File: ${basename(file)} --- */\n` + content + "\n\n";
}

writeFileSync(resolve(distDir, "majalengka.css"), fullCss);

// Minify dengan parser CSS sungguhan (Lightning CSS), bukan regex — aman untuk
// calc(), string, dan selector kompleks. Target browser sengaja tidak diset
// agar sintaks ditulis apa adanya (tanpa transpile/prefix tambahan).
const { code, warnings } = transform({
  filename: "majalengka.css",
  code: Buffer.from(fullCss),
  minify: true,
});
for (const w of warnings) console.warn(`lightningcss: ${w.message} (${w.loc.line}:${w.loc.column})`);

// Lightning CSS mempertahankan komentar /*! ... */ (banner lisensi) di awal.
const minifiedCss = code.toString();
writeFileSync(resolve(distDir, "majalengka.min.css"), minifiedCss);

const kb = (bytes: number) => bytes / 1024;
const rawKb = kb(Buffer.byteLength(fullCss));
const minKb = kb(Buffer.byteLength(minifiedCss));
const gzipKb = kb(gzipSync(Buffer.from(minifiedCss), { level: 9 }).byteLength);

// Anggaran performa (lihat docs: 1.dokumentasi/6.komputasi/2.anggaran-performa.md).
// KEDUA batas wajib dipenuhi. Gzip adalah ukuran yang benar-benar lewat
// jaringan; batas minified menjaga biaya parse di HP murah.
const BUDGET = { minKb: 64, gzipKb: 12 };
const minOk = minKb < BUDGET.minKb;
const gzipOk = gzipKb < BUDGET.gzipKb;
const mark = (ok: boolean) => (ok ? "✅" : "❌");

console.log(`\n================ CSS BUILD & BUDGET ================`);
console.log(`- dist/majalengka.css      : ${rawKb.toFixed(2)} kB`);
console.log(`- dist/majalengka.min.css  : ${minKb.toFixed(2)} kB ${mark(minOk)} (batas < ${BUDGET.minKb} kB)`);
console.log(`- dist/majalengka (gzipped): ${gzipKb.toFixed(2)} kB ${mark(gzipOk)} (batas < ${BUDGET.gzipKb} kB)`);
console.log(`- Performance Budget       : ${minOk && gzipOk ? "✅ PASSED" : "❌ FAILED"}`);
console.log(`====================================================\n`);

if (!minOk || !gzipOk) process.exit(1);
