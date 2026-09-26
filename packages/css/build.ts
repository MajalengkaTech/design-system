import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { transform, browserslistToTargets } from "lightningcss";
import knownCss from "known-css-properties";

import pkg from "./package.json";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = (p: string) => resolve(__dirname, "src", p);
const distDir = resolve(__dirname, "dist");
// Jangan hapus seluruh dist/: dev server docs membaca majalengka.css dan akan
// gagal (ENOENT) kalau file itu hilang sesaat selama build. Cukup timpa.
rmSync(resolve(distDir, "components"), { recursive: true, force: true });
mkdirSync(resolve(distDir, "components"), { recursive: true });

const fail = (msg: string): never => {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
};

// Browser minimum: Android/iOS lama masih banyak dipakai warga.
const targets = browserslistToTargets(["chrome >= 90", "safari >= 14", "firefox >= 90", "samsung >= 15"]);

// Lightning CSS tidak memodelkan semua properti, jadi yang tidak dikenalnya
// dicek ulang ke daftar lengkap (dipakai juga oleh stylelint).
const KNOWN_PROPERTIES = new Set(knownCss.all);

// Urutan komponen menentukan urutan cascade di bundel lengkap
const COMPONENTS = [
  "skip-link", "trust-banner", "banner", "icon", "button", "button-group", "icon-button",
  "badge", "chip", "avatar", "user", "form", "fieldset", "form-summary", "slider", "pin-input",
  "switch", "tabs", "stepper", "table", "alert", "toast", "drawer", "card", "stat-card",
  "timeline", "skeleton", "progress", "kbd", "tooltip", "misc", "header", "nav-menu", "footer",
  "error-page", "description-list", "file-list", "page-header",
];

{
  const onDisk = readdirSync(src("components")).map((f) => basename(f, ".css")).sort();
  const listed = [...COMPONENTS].sort();
  const missing = onDisk.filter((c) => !listed.includes(c));
  const extra = listed.filter((c) => !onDisk.includes(c));
  if (missing.length || extra.length) {
    fail(`Daftar COMPONENTS tidak cocok dengan src/components.\n  Belum didaftarkan: ${missing.join(", ") || "-"}\n  Tidak ada filenya: ${extra.join(", ") || "-"}`);
  }
}

const read = (p: string) => readFileSync(p, "utf8");
const tokensCss = read(resolve(__dirname, "../tokens/dist/tokens.css"));
const definedVars = new Set([...tokensCss.matchAll(/(--mjl-[a-z0-9-]+)\s*:/g)].map((m) => m[1]));

const banner = (name: string) => `/*! @majalengka/css v${pkg.version} ${name} | MIT */\n`;

function compile(name: string, code: string) {
  const unknown: string[] = [];
  let result;
  try {
    result = transform({
      filename: name,
      code: Buffer.from(code),
      minify: true,
      targets,
      visitor: {
        Declaration: {
          custom(d) {
            if (!d.name.startsWith("--") && !KNOWN_PROPERTIES.has(d.name)) unknown.push(d.name);
          },
        },
      },
    });
  } catch (e) {
    const err = e as { message: string; loc?: { line: number; column: number } };
    fail(`${name}: CSS tidak valid — ${err.message}${err.loc ? ` (baris ${err.loc.line})` : ""}`);
  }
  if (unknown.length) fail(`${name}: properti CSS tidak dikenal: ${[...new Set(unknown)].join(", ")}`);

  {
    const local = new Set([...code.matchAll(/(--[a-z0-9_-]+)\s*:/gi)].map((m) => m[1]));
    const undefinedVars = [...new Set([...code.matchAll(/var\((--mjl-[a-z0-9-]+)/g)].map((m) => m[1]))].filter(
      (v) => !definedVars.has(v) && !local.has(v),
    );
    if (undefinedVars.length) fail(`${name}: variabel tidak didefinisikan di tokens.css: ${undefinedVars.join(", ")}`);
  }
  return String(result!.code);
}

const stats: [string, number, number][] = [];
function emit(file: string, label: string, readable: string | null, minified: string) {
  const min = banner(label) + minified;
  if (readable !== null) writeFileSync(resolve(distDir, `${file}.css`), banner(label) + readable);
  writeFileSync(resolve(distDir, `${file}.min.css`), min);
  stats.push([`${file}.min.css`, Buffer.byteLength(min), gzipSync(min).length]);
}

const section = (file: string) => `/* --- ${file} --- */\n${read(src(file))}\n`;

const coreSource = tokensCss + section("base.css") + section("typography.css") + section("layout.css");
const componentSources = COMPONENTS.map((c) => ({ name: c, code: read(src(`components/${c}.css`)) }));
const fullSource = coreSource + componentSources.map((c) => `/* --- ${c.name}.css --- */\n${c.code}\n`).join("");

// Komponen satuan dikompilasi lebih dulu supaya pesan error menyebut file yang tepat.
// Pemakaian: muat core.css, lalu komponen yang dibutuhkan saja.
for (const c of componentSources) {
  writeFileSync(resolve(distDir, "components", `${c.name}.css`), banner(c.name) + compile(`components/${c.name}.css`, c.code));
}

// Bundel lengkap (tanpa reset global: aman untuk situs yang sudah punya tema)
emit("majalengka", "lengkap", fullSource, compile("majalengka.css", fullSource));
// Inti: token + base + tipografi + layout, untuk dipadukan dengan komponen satuan
emit("core", "inti", coreSource, compile("core.css", coreSource));
// Reset global opsional untuk situs baru
emit("reset", "reset", read(src("reset.css")), compile("reset.css", read(src("reset.css"))));


// ---------------------------------------------------------------------------
// Anggaran ukuran: keduanya wajib lolos (bukan salah satu)
// ---------------------------------------------------------------------------
const BUDGET = {
  // Angka nyata saat ditetapkan (Fase 2): 54.0 / 8.5 kB dan 13.3 / 2.5 kB
  "majalengka.min.css": { min: 58 * 1024, gzip: 9.5 * 1024 },
  "core.min.css": { min: 14.5 * 1024, gzip: 3 * 1024 },
};

const kb = (n: number) => `${(n / 1024).toFixed(1)} kB`;
console.log("\n  File                 minified    gzip");
let over = false;
for (const [file, min, gz] of stats) {
  const b = BUDGET[file as keyof typeof BUDGET];
  const bad = b && (min > b.min || gz > b.gzip);
  over ||= !!bad;
  const limit = b ? `  (batas ${kb(b.min)} / ${kb(b.gzip)})` : "";
  console.log(`  ${bad ? "❌" : "✅"} ${file.padEnd(19)} ${kb(min).padStart(8)} ${kb(gz).padStart(8)}${limit}`);
}
console.log(`  + ${COMPONENTS.length} file di dist/components/\n`);
if (over) fail("Melebihi anggaran ukuran.");
