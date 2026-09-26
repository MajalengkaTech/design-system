import { toast, type ToastHandle, type ToastOptions } from '@majalengka/js';

export type { ToastHandle, ToastOptions };

/**
 * Toast dari kode Vue. Memakai implementasi @majalengka/js yang sama
 * (live region, jeda saat hover/fokus, danger tidak hilang sendiri).
 *
 *   const { toast } = useToast()
 *   toast({ title: 'Draf tersimpan', variant: 'success' })
 */
export function useToast() {
	return { toast };
}
