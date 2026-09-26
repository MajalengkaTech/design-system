# @majalengka/css

Komponen Majalengka Design System dalam CSS murni. Tanpa JavaScript dan tanpa build step. Bisa dipasang di HTML, PHP, WordPress, Laravel, atau berdampingan dengan Tailwind.

Ukuran bundel lengkap: **8.5 kB gzip** (54 kB minified).

## Pilih cara pakai

### Situs baru

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@majalengka/css/dist/reset.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@majalengka/css/dist/majalengka.min.css">
```

`reset.css` mengatur elemen global (`body`, `img`, form) dan memberi latar serta warna teks halaman, termasuk mode gelap.

### Situs yang sudah punya tema (WordPress, Laravel, dsb.)

Muat `majalengka.min.css` saja, **tanpa** `reset.css`. Semua aturannya hanya berlaku untuk elemen berkelas `mjl-*`, jadi tampilan tema Anda tidak berubah.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@majalengka/css/dist/majalengka.min.css">
```

Kalau hanya butuh beberapa komponen, muat `core` (token, fokus, tipografi, layout) lalu komponennya:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@majalengka/css/dist/core.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@majalengka/css/dist/components/button.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@majalengka/css/dist/components/form.css">
```

### Tailwind CSS v4

Masukkan ke layer `components` supaya utilitas Tailwind tetap bisa menimpanya:

```css
@import "tailwindcss";
@import "@majalengka/css" layer(components);
```

## Mode gelap

Default-nya terang. Aktifkan di elemen mana pun:

```html
<html data-theme="dark">   <!-- selalu gelap (class="dark" juga bisa) -->
<html data-theme="auto">   <!-- ikut pengaturan sistem -->
```

## Menimpa gaya

Setiap selektor komponen hanya satu kelas (plus pseudo-state), tanpa `!important`. Aturan Anda dengan spesifisitas yang sama akan menang selama dimuat setelahnya:

```css
.mjl-btn { border-radius: 999px; }
```

Untuk mengubah warna di semua komponen sekaligus, timpa token semantiknya:

```css
:root { --mjl-action-primary-bg: #0b5; }
```

Daftar token ada di [`@majalengka/tokens`](../tokens/README.md).

## Aksesibilitas bawaan

- Tombol dan input ukuran default setinggi 44px. Ukuran `sm` (32px) hanya untuk area padat seperti tabel.
- Input memakai teks 16px supaya iOS tidak memperbesar halaman saat kolom disentuh.
- Semua komponen memakai cincin fokus 2px yang tetap terlihat di mode kontras tinggi Windows.
- Animasi dimatikan kalau pengguna memilih "kurangi gerakan" di sistemnya.
- Pasangan warna diuji kontrasnya (WCAG AA) saat build token, di mode terang dan gelap.

## Mengembangkan

```bash
bun run build
```

Build gagal kalau ada:
- properti CSS yang tidak dikenal (misalnya salah ketik),
- `var(--mjl-*)` yang tidak didefinisikan di token,
- file di `src/components/` yang belum didaftarkan di `build.ts`,
- ukuran yang melewati batas (58 kB minified **dan** 9.5 kB gzip).
