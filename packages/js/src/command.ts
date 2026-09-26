import { closest } from "./util";

/**
 * Polyfill kecil untuk dua fitur HTML standar yang belum ada di browser lama:
 *
 *   <button commandfor="dlg" command="show-modal">  → buka <dialog id="dlg">
 *   <button commandfor="dlg" command="close">       → tutup
 *   <dialog closedby="any">                         → klik di luar dialog menutupnya
 *
 * Di browser yang sudah mendukung, fungsi ini tidak memasang apa pun.
 */
export function setupCommands(): void {
  if (!("command" in HTMLButtonElement.prototype)) {
    document.addEventListener("click", (event) => {
      const button = closest<HTMLButtonElement>(event.target, "button[commandfor]");
      if (!button || button.disabled) return;
      const dialog = document.getElementById(button.getAttribute("commandfor") ?? "");
      if (!(dialog instanceof HTMLDialogElement)) return;

      const command = button.getAttribute("command");
      if (command === "show-modal" && !dialog.open) dialog.showModal();
      else if ((command === "close" || command === "request-close") && dialog.open) dialog.close(button.value);
    });
  }

  if (!("closedBy" in HTMLDialogElement.prototype)) {
    document.addEventListener("click", (event) => {
      const dialog = event.target;
      if (!(dialog instanceof HTMLDialogElement) || !dialog.open || dialog.getAttribute("closedby") !== "any") return;
      // Klik di ::backdrop tercatat dengan target <dialog> itu sendiri, tapi di luar kotaknya
      const r = dialog.getBoundingClientRect();
      const inside = event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom;
      if (!inside) dialog.close();
    });
  }
}
