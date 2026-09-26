/**
 * Generate template sebagai situs statis di bawah /templates/disdik/ lalu
 * salin ke docs/public, supaya bisa dilihat langsung dari situs docs
 * (halaman /template/portal-dinas-pendidikan) dan ikut ter-deploy.
 *
 *   bun run export:docs
 */
import { cpSync, existsSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { $ } from 'bun'

const root = resolve(import.meta.dir, '..')
const target = resolve(root, '../../docs/public/templates/disdik')
const BASE = '/templates/disdik/'

await $`bunx nuxt generate`.cwd(root).env({ ...process.env, NUXT_APP_BASE_URL: BASE })

const output = resolve(root, '.output/public')
if (!existsSync(resolve(output, 'index.html'))) {
  console.error('❌ Hasil generate tidak ditemukan di .output/public')
  process.exit(1)
}

rmSync(target, { recursive: true, force: true })
cpSync(output, target, { recursive: true })
console.log(`✅ Template disalin ke docs/public/templates/disdik (base ${BASE})`)
