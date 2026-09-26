import { onMounted, ref, watch, type Ref } from 'vue';

/**
 * Menyambungkan v-model ke <dialog> bawaan browser. Browser mengurus fokus,
 * Esc, dan pengembalian fokus ke tombol pembuka; composable ini hanya
 * menjaga v-model tetap sinkron.
 */
export function useDialog(open: Ref<boolean>, options: { dismissible: () => boolean }) {
	const dialog = ref<HTMLDialogElement>();

	function sync(value: boolean) {
		const el = dialog.value;
		if (!el) return;
		if (value && !el.open) el.showModal();
		else if (!value && el.open) el.close();
	}

	// Tanpa onMounted, modal yang sudah true saat pertama dirender tidak pernah terbuka
	onMounted(() => sync(open.value));
	watch(open, sync);

	return {
		dialog,
		/** Dipanggil dari event close <dialog> (Esc, form method=dialog, dialog.close()). */
		onClose() {
			if (open.value) open.value = false;
		},
		/** Esc hanya menutup kalau dismissible. */
		onCancel(event: Event) {
			if (!options.dismissible()) event.preventDefault();
		},
		/** Klik di ::backdrop tercatat dengan target <dialog> itu sendiri, di luar kotaknya. */
		onClick(event: MouseEvent) {
			const el = dialog.value;
			if (!el || event.target !== el || !options.dismissible()) return;
			const r = el.getBoundingClientRect();
			const inside = event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom;
			if (!inside) open.value = false;
		},
	};
}
