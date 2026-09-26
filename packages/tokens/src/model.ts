/**
 * Model token: meratakan JSON DTCG, menamai variabel CSS, dan meresolusi
 * referensi `{path}`. Dipakai oleh build.ts dan unocss-preset.ts supaya
 * aturan penamaan hanya ada di satu tempat.
 */

import colorData from "./global/color.json";
import typographyData from "./global/typography.json";
import spacingData from "./global/spacing.json";
import elevationData from "./global/elevation.json";
import lightData from "./semantic/light.json";
import darkData from "./semantic/dark.json";

export const PREFIX = "mjl";

export interface Token {
  path: string;
  value: string;
  type?: string;
  description?: string;
}

export interface SemanticToken extends Token {
  /** Nama variabel tanpa `--mjl-`, mis. `action-primary-bg`. */
  name: string;
  /** Nilai untuk CSS: literal, atau `var(--mjl-...)` bila berupa referensi. */
  css: string;
  /** Nilai akhir setelah semua referensi diikuti. */
  resolved: string;
}

type Node = { [key: string]: unknown };

function flatten(node: Node, prefix: string[] = [], inheritedType?: string, out: Token[] = []): Token[] {
  const groupType = (node.$type as string | undefined) ?? inheritedType;
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith("$") || !child || typeof child !== "object") continue;
    const c = child as Node;
    const path = [...prefix, key];
    if ("$value" in c) {
      out.push({
        path: path.join("."),
        value: String(c.$value),
        type: (c.$type as string | undefined) ?? groupType,
        description: c.$description as string | undefined,
      });
    } else {
      flatten(c, path, groupType, out);
    }
  }
  return out;
}

// Breakpoint sengaja tidak dijadikan variabel: var() tidak berlaku di media query.
const PRIMITIVE_NAMES: [RegExp, (m: RegExpMatchArray) => string | null][] = [
  [/^color\.(.+)$/, (m) => `color-${m[1]}`],
  [/^typography\.fontFamily\.(.+)$/, (m) => `font-${m[1]}`],
  [/^typography\.scale\.([^.]+)\.fontSize$/, (m) => `text-${m[1]}-size`],
  [/^typography\.scale\.([^.]+)\.lineHeight$/, (m) => `text-${m[1]}-line-height`],
  [/^spacing\.grid\.(.+)$/, (m) => `space-${m[1]}`],
  [/^spacing\.radius\.(.+)$/, (m) => `radius-${m[1]}`],
  [/^spacing\.touchTarget\.(.+)$/, (m) => `touch-${m[1]}`],
  [/^spacing\.breakpoint\./, () => null],
  [/^elevation\.shadow\.(.+)$/, (m) => `shadow-${m[1]}`],
  [/^elevation\.layer\.(.+)$/, (m) => `layer-${m[1]}`],
  [/^elevation\.motion\.duration\.(.+)$/, (m) => `duration-${m[1]}`],
  [/^elevation\.motion\.easing\.(.+)$/, (m) => `ease-${m[1]}`],
];

export function primitiveName(path: string): string | null {
  for (const [re, name] of PRIMITIVE_NAMES) {
    const m = path.match(re);
    if (m) return name(m)?.replaceAll(".", "-") ?? null;
  }
  throw new Error(`Token primitive tanpa aturan penamaan: ${path}`);
}

export const primitives: Token[] = [
  ...flatten(colorData),
  ...flatten(typographyData),
  ...flatten(spacingData),
  ...flatten(elevationData),
];

const primitiveByPath = new Map(primitives.map((t) => [t.path, t]));

const REF = /^\{([^}]+)\}$/;

function buildMode(data: Node, mode: string): SemanticToken[] {
  const tokens = flatten(data);
  const byPath = new Map(tokens.map((t) => [t.path, t]));

  const resolve = (value: string, trail: string[]): string => {
    const ref = value.match(REF)?.[1];
    if (!ref) return value;
    if (trail.includes(ref)) throw new Error(`[${mode}] Referensi melingkar: ${[...trail, ref].join(" → ")}`);
    const target = byPath.get(ref) ?? primitiveByPath.get(ref);
    if (!target) throw new Error(`[${mode}] Referensi tidak ditemukan: {${ref}} (dari ${trail[0]})`);
    return resolve(target.value, [...trail, ref]);
  };

  const cssOf = (value: string): string => {
    const ref = value.match(REF)?.[1];
    if (!ref) return value;
    if (byPath.has(ref)) return `var(--${PREFIX}-${ref.replaceAll(".", "-")})`;
    const name = primitiveName(ref);
    if (!name) throw new Error(`[${mode}] {${ref}} tidak punya variabel CSS`);
    return `var(--${PREFIX}-${name})`;
  };

  return tokens.map((t) => ({
    ...t,
    name: t.path.replaceAll(".", "-"),
    css: cssOf(t.value),
    resolved: resolve(t.value, [t.path]),
  }));
}

export const light = buildMode(lightData, "light");
export const dark = buildMode(darkData, "dark");

export const raw = {
  color: colorData.color,
  typography: typographyData.typography,
  spacing: spacingData.spacing,
  elevation: elevationData.elevation,
};
