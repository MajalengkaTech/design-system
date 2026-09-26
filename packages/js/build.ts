import { rmSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { $ } from "bun";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, "dist");
rmSync(dist, { recursive: true, force: true });

const fail = (msg: string): never => {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
};

const builds = [
  { entry: "src/index.ts", out: "majalengka.js", format: "esm" as const },
  { entry: "src/auto.ts", out: "majalengka.iife.js", format: "iife" as const },
];

for (const b of builds) {
  const result = await Bun.build({
    entrypoints: [resolve(__dirname, b.entry)],
    outdir: dist,
    naming: b.out,
    format: b.format,
    target: "browser",
    minify: true,
  });
  if (!result.success) fail(`${b.out}:\n${result.logs.join("\n")}`);
}

// Tipe untuk pengguna TypeScript; sekaligus type-check seluruh src/
const tsc = await $`bunx tsc -p ${resolve(__dirname, "tsconfig.json")}`.nothrow().quiet();
if (tsc.exitCode !== 0) fail(`Type-check gagal:\n${tsc.stdout}${tsc.stderr}`);

// Anggaran: versi <script> lengkap wajib di bawah 3 kB gzip
const BUDGET_GZIP = 3 * 1024;
const kb = (n: number) => `${(n / 1024).toFixed(2)} kB`;
let over = false;
console.log("\n  File                   minified      gzip");
for (const b of builds) {
  const code = readFileSync(resolve(dist, b.out));
  const gz = gzipSync(code).length;
  const bad = gz > BUDGET_GZIP;
  over ||= bad;
  console.log(`  ${bad ? "❌" : "✅"} ${b.out.padEnd(20)} ${kb(code.length).padStart(9)} ${kb(gz).padStart(9)}  (batas gzip ${kb(BUDGET_GZIP)})`);
}
console.log("");
if (over) fail("Melebihi anggaran ukuran.");
