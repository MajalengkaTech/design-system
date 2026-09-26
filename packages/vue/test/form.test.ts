import { mount } from '@vue/test-utils';
import { defineComponent, h, ref } from 'vue';
import { describe, expect, it } from 'vitest';
import { MjlCheckbox, MjlFileUpload, MjlFormField, MjlInput, MjlSelect, MjlTextarea } from '../src';
import { expectNoA11yViolations } from './helpers';

describe('MjlFormField', () => {
	it('menyambungkan label, teks bantuan, error, dan required ke input tanpa wiring manual', async () => {
		const w = mount(MjlFormField, {
			props: { label: 'NIK', required: true, helpText: '16 digit sesuai KTP', errorText: 'NIK harus 16 digit' },
			slots: { default: () => h(MjlInput) },
			attachTo: document.body,
		});
		const input = w.get('input');
		const label = w.get('label');
		expect(label.attributes('for')).toBe(input.attributes('id'));
		expect(input.attributes('required')).toBeDefined();
		expect(input.attributes('aria-invalid')).toBe('true');
		const ids = input.attributes('aria-describedby')!.split(' ');
		expect(ids.map(id => document.getElementById(id)?.textContent?.trim())).toEqual(['16 digit sesuai KTP', 'NIK harus 16 digit']);
		await expectNoA11yViolations(w.element);
		w.unmount();
	});

	it('dua field di satu halaman mendapat id berbeda', () => {
		const w = mount(defineComponent({
			render: () => [
				h(MjlFormField, { label: 'Nama' }, () => h(MjlInput)),
				h(MjlFormField, { label: 'Alamat' }, () => h(MjlTextarea)),
			],
		}));
		const [a, b] = [w.get('input').attributes('id'), w.get('textarea').attributes('id')];
		expect(a).toBeTruthy();
		expect(a).not.toBe(b);
	});

	it('select di dalam field juga tersambung', () => {
		const w = mount(MjlFormField, {
			props: { label: 'Kecamatan', errorText: 'Pilih kecamatan' },
			slots: { default: () => h(MjlSelect, { options: [{ value: 'a', label: 'Argapura' }] }) },
		});
		expect(w.get('select').attributes('aria-invalid')).toBe('true');
		expect(w.get('label').attributes('for')).toBe(w.get('select').attributes('id'));
	});

	it('prop yang diisi langsung tetap menang atas konteks field', () => {
		const w = mount(MjlFormField, {
			props: { label: 'Email' },
			slots: { default: () => h(MjlInput, { id: 'email-khusus' }) },
		});
		expect(w.get('input').attributes('id')).toBe('email-khusus');
	});
});

describe('Kontrol formulir', () => {
	it('MjlInput mendukung v-model', async () => {
		const value = ref('');
		const w = mount(MjlInput, { props: { 'modelValue': value.value, 'onUpdate:modelValue': (v: string | number) => (value.value = String(v)) } });
		await w.get('input').setValue('3210012345678901');
		expect(value.value).toBe('3210012345678901');
	});

	it('MjlCheckbox: label membungkus input dan bisa diakses', async () => {
		const w = mount(MjlCheckbox, { slots: { default: 'Saya menyetujui syarat layanan' }, attachTo: document.body });
		expect(w.get('label').attributes('for')).toBe(w.get('input').attributes('id'));
		await expectNoA11yViolations(w.element);
		w.unmount();
	});

	it('MjlFileUpload: input punya nama yang bisa dibacakan', async () => {
		const w = mount(MjlFileUpload, { props: { label: 'Unggah scan KTP', hint: 'PDF atau JPG, maks. 2 MB' }, attachTo: document.body });
		expect(w.get('label').attributes('for')).toBe(w.get('input').attributes('id'));
		await expectNoA11yViolations(w.element);
		w.unmount();
	});
});

describe('MjlFormSummary', () => {
	it('fokus pindah ke ringkasan saat error muncul, judulnya heading', async () => {
		const { MjlFormSummary } = await import('../src');
		const w = mount(MjlFormSummary, { props: { errors: [] }, attachTo: document.body });
		await w.setProps({ errors: [{ message: 'NIK harus 16 digit', href: '#nik' }] });
		await new Promise(r => setTimeout(r));
		expect(document.activeElement).toBe(w.get('.mjl-form-summary').element);
		expect(w.get('h2').text()).toBe('Periksa kembali isian berikut');
		await expectNoA11yViolations(w.element);
		w.unmount();
	});
});
