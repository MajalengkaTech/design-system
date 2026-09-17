---
name: majalengka-design-system
description: Use Majalengka Design System components, tokens, and CSS classes correctly when building web UI for instansi, komunitas, or UMKM digital projects in the Majalengka.tech ecosystem. Covers installation (pure CSS/CDN, Vue 3, UnoCSS, Tailwind), the full component catalog, design tokens, and accessibility rules. Load this before writing markup or components that use the `mjl-*` CSS classes or the `@majalengka/*` npm packages.
---

# Majalengka Design System

Open-source design system for the Majalengka.tech web ecosystem — used by government agencies, community projects, local media, and digital SMEs. **Not an official Pemkab Majalengka product**; agencies that use it do so voluntarily, like any other adopter.

## Core principles (non-negotiable)

1. **Accessible from the start** — every component must meet WCAG 2.1 AA. Minimum 16px body text, 44×44px touch targets, status is never color-only (always icon + text).
2. **Framework-agnostic** — all visual decisions live as design tokens, never hardcoded in components. No raw hex/px values in component code; use `--mjl-*` CSS variables.
3. **Credible & trustworthy, not "official"** — never claim government affiliation by default. The `TrustBanner` component requires an explicit `owner` prop; it has no default text.

## Installation paths

Pick the one matching the target stack — don't assume Vue if the project is plain PHP/HTML.

| Stack | Package | Entry point |
|---|---|---|
| Plain HTML/PHP/WordPress/Laravel Blade (no build step) | `@majalengka/css` | `<link>` to `dist/majalengka.min.css` via CDN, then use `mjl-*` classes directly |
| Vue 3 / Nuxt | `@majalengka/vue` + `@majalengka/css` | `import { MjlButton, ... } from '@majalengka/vue'` |
| UnoCSS | `@majalengka/tokens/preset` | `presetMajalengka()` in `uno.config.ts` |
| Tailwind CSS | `@majalengka/tokens` | `import { colors, spacing } from '@majalengka/tokens'`, wire into `theme.extend` |
| React / Next.js | `@majalengka/css` | Pure CSS only — no `@majalengka/react` package yet, use `mjl-*` classes with `className` |

Full walkthrough: [/dokumentasi/memulai/instalasi](/dokumentasi/memulai/instalasi).

## Component catalog

Vue components (`@majalengka/vue`) and their matching CSS classes (`@majalengka/css`, usable without JS):

**Dasar**: `MjlButton`/`.mjl-btn`, `MjlIconButton`/`.mjl-icon-btn`, `MjlLink`/`.mjl-link`, `MjlText`/`.mjl-text-*`, `MjlIcon`/`.mjl-icon`, `MjlBadge`/`.mjl-badge`, `MjlDivider`/`.mjl-divider`, `MjlSpinner`/`.mjl-spinner`

**Formulir**: `MjlFormField`/`.mjl-form-field`, `MjlInput`/`.mjl-input`, `MjlTextarea`/`.mjl-textarea`, `MjlSelect`/`.mjl-select`, `MjlCheckbox`/`.mjl-checkbox`, `MjlRadio`/`.mjl-radio`, `MjlFileUpload`/`.mjl-file-upload`, `MjlFieldset`/`.mjl-fieldset`, `MjlFormSummary`/`.mjl-form-summary`

**Navigasi**: `MjlTrustBanner`/`.mjl-trust-banner`, `MjlHeader`/`.mjl-header`, `MjlNavMenu`/`.mjl-nav-menu`, `MjlSkipLink`/`.mjl-skip-link`, `MjlBreadcrumb`/`.mjl-breadcrumb`, `MjlPagination`/`.mjl-pagination`, `MjlStepper`/`.mjl-stepper`, `MjlFooter`/`.mjl-footer`

**Umpan balik**: `MjlAlert`/`.mjl-alert`, `MjlModal`/`.mjl-modal` (native `<dialog>`), `MjlConfirmDialog` (composes Modal + Button — action label required, never generic "Yes/No"), `MjlEmptyState`/`.mjl-empty-state`, `MjlErrorPage`/`.mjl-error-page`

**Tampilan data**: `MjlTable`/`.mjl-table`, `MjlCard`/`.mjl-card`, `MjlDescriptionList`/`.mjl-description-list`, `MjlAccordion`/`.mjl-accordion` (native `<details>`/`<summary>`), `MjlFileList`/`.mjl-file-list`

**Tata letak**: `MjlContainer`/`.mjl-container` (max 1280px), `MjlStack`/`.mjl-stack` (vertical), `MjlCluster`/`.mjl-cluster` (horizontal wrap), `MjlGrid`/`.mjl-grid` (12-col), `MjlPageHeader`/`.mjl-page-header`

Full specs with props/slots: [/komponen](/komponen).

## Design tokens

Source of truth: `@majalengka/tokens` (W3C DTCG format). Never hardcode colors/spacing — reference the CSS custom properties (already imported via `@majalengka/css`):

- Primary blue (Biru Majalengka): `--mjl-color-primary-50` through `-950`, base `700 = #0014A8`
- Neutral gray: `--mjl-color-neutral-50` through `-950`
- Status: `--mjl-color-status-{success,warning,danger,info}-{bg,border,fg}`, plus `--mjl-color-status-mango` (accent, ~5% of page max)
- Spacing (4px grid): `--mjl-space-{0,1,2,3,4,5,6,8,10,12,16,20,24,32}`
- Radius: `--mjl-radius-{sm,md,lg,full}`
- Touch targets: `--mjl-touch-min` (44px), `--mjl-touch-large` (52px)
- Dark mode: same variable names auto-adjust under `.dark`, `[data-theme="dark"]`, or `[data-mode="dark"]` — don't write separate dark-mode CSS, just use the variables

## Common mistakes to avoid

- Writing raw hex colors or px spacing instead of `--mjl-*` tokens.
- Using `TrustBanner` without an explicit `owner` — it has no default text on purpose.
- Building a modal from scratch instead of using `MjlModal` (native `<dialog>`, gets focus-trap and Esc-to-close for free).
- Generic "Ya/Tidak" buttons on `MjlConfirmDialog` — the label must name the actual action.
- Assuming a React package exists — it doesn't yet; use the pure CSS classes in React/Next.js.
