import { all, closest, ensureId } from "./util";

/**
 * Tabs dengan pola WAI-ARIA: panah kiri/kanan, Home, End, aktivasi otomatis.
 *
 *   <div class="mjl-tabs">
 *     <ul class="mjl-tab-list">
 *       <li><button class="mjl-tab">Persyaratan</button></li> ...
 *     </ul>
 *     <div class="mjl-tab-panel">...</div> ...
 *   </div>
 *
 * Tombol ke-n dipasangkan dengan panel ke-n. Tanpa JS, semua panel tampil.
 */

const TAB = ".mjl-tabs[data-mjl-ready] > .mjl-tab-list .mjl-tab";

function parts(tabs: Element) {
  const list = tabs.querySelector<HTMLElement>(":scope > .mjl-tab-list");
  return {
    list,
    buttons: list ? [...list.querySelectorAll<HTMLElement>(".mjl-tab")] : [],
    panels: [...tabs.querySelectorAll<HTMLElement>(":scope > .mjl-tab-panel")],
  };
}

function select(tabs: Element, index: number, focus: boolean): void {
  const { buttons, panels } = parts(tabs);
  buttons.forEach((button, i) => {
    const active = i === index;
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
    button.classList.toggle("mjl-tab--active", active);
    const panel = panels[i];
    if (panel) {
      panel.hidden = !active;
      panel.classList.toggle("mjl-tab-panel--active", active);
    }
  });
  if (focus) buttons[index]?.focus();
  tabs.dispatchEvent(new CustomEvent("mjl:tabchange", { bubbles: true, detail: { index } }));
}

export function enhanceTabs(root: ParentNode): void {
  for (const tabs of all<HTMLElement>(root, ".mjl-tabs:not([data-mjl-ready])")) {
    const { list, buttons, panels } = parts(tabs);
    if (!list || !buttons.length) continue;

    tabs.setAttribute("data-mjl-ready", "");
    list.setAttribute("role", "tablist");
    list.querySelectorAll(":scope > li").forEach((li) => li.setAttribute("role", "presentation"));
    buttons.forEach((button, i) => {
      button.setAttribute("role", "tab");
      const panel = panels[i];
      if (!panel) return;
      panel.setAttribute("role", "tabpanel");
      panel.tabIndex = 0;
      button.setAttribute("aria-controls", ensureId(panel, "panel"));
      panel.setAttribute("aria-labelledby", ensureId(button, "tab"));
    });

    const start = buttons.findIndex((b) => b.classList.contains("mjl-tab--active") || b.getAttribute("aria-selected") === "true");
    select(tabs, Math.max(0, start), false);
  }
}

export function setupTabs(): void {
  document.addEventListener("click", (event) => {
    const button = closest<HTMLElement>(event.target, TAB);
    if (!button) return;
    const tabs = button.closest(".mjl-tabs")!;
    select(tabs, parts(tabs).buttons.indexOf(button), false);
  });

  document.addEventListener("keydown", (event) => {
    const button = closest<HTMLElement>(event.target, TAB);
    if (!button) return;
    const tabs = button.closest(".mjl-tabs")!;
    const { buttons } = parts(tabs);
    const current = buttons.indexOf(button);
    const last = buttons.length - 1;
    const next = {
      ArrowRight: current === last ? 0 : current + 1,
      ArrowLeft: current === 0 ? last : current - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(tabs, next, true);
  });
}
