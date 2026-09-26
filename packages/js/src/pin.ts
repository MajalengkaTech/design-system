import { all, closest } from "./util";

/**
 * Kotak OTP/PIN: satu karakter per kotak, pindah otomatis, Backspace mundur,
 * panah kiri/kanan, dan menempel kode utuh sekaligus.
 *
 *   <div class="mjl-pin-input" data-mjl-pin>
 *     <input class="mjl-pin-input__box"> × n
 *   </div>
 */

const boxes = (input: Element) => [...input.closest("[data-mjl-pin]")!.querySelectorAll<HTMLInputElement>("input")];
const BOX = "[data-mjl-pin] input";

export function enhancePins(root: ParentNode): void {
  for (const group of all(root, "[data-mjl-pin]:not([data-mjl-ready])")) {
    group.setAttribute("data-mjl-ready", "");
    const inputs = [...group.querySelectorAll<HTMLInputElement>("input")];
    inputs.forEach((input, i) => {
      input.inputMode ||= "numeric";
      if (i === 0) input.autocomplete ||= "one-time-code";
      if (!input.hasAttribute("aria-label") && !input.hasAttribute("aria-labelledby")) {
        input.setAttribute("aria-label", `Digit ${i + 1} dari ${inputs.length}`);
      }
    });
  }
}

export function setupPins(): void {
  document.addEventListener("input", (event) => {
    const input = closest<HTMLInputElement>(event.target, BOX);
    if (!input) return;
    input.value = input.value.slice(-1);
    if (input.value) {
      const list = boxes(input);
      list[list.indexOf(input) + 1]?.focus();
    }
  });

  document.addEventListener("keydown", (event) => {
    const input = closest<HTMLInputElement>(event.target, BOX);
    if (!input) return;
    const list = boxes(input);
    const i = list.indexOf(input);
    let to: HTMLInputElement | undefined;
    if (event.key === "Backspace" && !input.value) to = list[i - 1];
    else if (event.key === "ArrowLeft") to = list[i - 1];
    else if (event.key === "ArrowRight") to = list[i + 1];
    if (!to) return;
    event.preventDefault();
    if (event.key === "Backspace") to.value = "";
    to.focus();
  });

  document.addEventListener("paste", (event) => {
    const input = closest<HTMLInputElement>(event.target, BOX);
    const text = event.clipboardData?.getData("text").replace(/\s/g, "");
    if (!input || !text) return;
    event.preventDefault();
    const list = boxes(input);
    const start = list.indexOf(input);
    [...text].slice(0, list.length - start).forEach((char, k) => (list[start + k].value = char));
    list[Math.min(start + text.length, list.length) - 1].focus();
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}
