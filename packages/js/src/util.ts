let uid = 0;

/** Pastikan elemen punya id, lalu kembalikan id tersebut. */
export function ensureId(el: Element, prefix: string): string {
  if (!el.id) el.id = `mjl-${prefix}-${++uid}`;
  return el.id;
}

/** querySelectorAll yang ikut memeriksa root itu sendiri. */
export function all<T extends Element>(root: ParentNode, selector: string): T[] {
  const found = [...root.querySelectorAll<T>(selector)];
  return root instanceof Element && root.matches(selector) ? [root as T, ...found] : found;
}

export function closest<T extends Element>(target: EventTarget | null, selector: string): T | null {
  return target instanceof Element ? target.closest<T>(selector) : null;
}
