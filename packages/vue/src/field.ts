import { computed, inject, useId, type ComputedRef, type InjectionKey } from 'vue';

export interface FieldContext {
	id: ComputedRef<string>;
	describedBy: ComputedRef<string | undefined>;
	invalid: ComputedRef<boolean>;
	required: ComputedRef<boolean>;
}

export const FIELD_KEY: InjectionKey<FieldContext> = Symbol('mjl-field');

interface ControlProps {
	id?: string;
	describedBy?: string;
	hasError?: boolean;
	required?: boolean;
}

/**
 * Atribut aksesibilitas untuk kontrol formulir. Di dalam MjlFormField,
 * id, aria-describedby, aria-invalid, dan required diambil dari field
 * sehingga label, teks bantuan, dan pesan error otomatis tersambung.
 * Prop yang diisi langsung tetap menang.
 */
export function useFieldControl(props: ControlProps) {
	const field = inject(FIELD_KEY, null);
	const ownId = useId();

	return {
		id: computed(() => props.id ?? field?.id.value ?? ownId),
		describedBy: computed(() => props.describedBy ?? field?.describedBy.value),
		invalid: computed(() => props.hasError || field?.invalid.value || false),
		required: computed(() => props.required || field?.required.value || false),
	};
}
