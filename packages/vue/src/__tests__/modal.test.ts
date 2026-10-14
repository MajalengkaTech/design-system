import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import MjlModal from '../components/MjlModal.vue';

const dialogOf = (wrapper: ReturnType<typeof mount>) => wrapper.find('dialog').element as HTMLDialogElement;

describe('MjlModal', () => {
	it('langsung terbuka bila di-mount dengan modelValue=true', () => {
		const wrapper = mount(MjlModal, { props: { modelValue: true, title: 'Halo' }, attachTo: document.body });
		expect(dialogOf(wrapper).open).toBe(true);
		wrapper.unmount();
	});

	it('membuka dan menutup mengikuti modelValue', async () => {
		const wrapper = mount(MjlModal, { props: { modelValue: false }, attachTo: document.body });
		expect(dialogOf(wrapper).open).toBe(false);
		await wrapper.setProps({ modelValue: true });
		expect(dialogOf(wrapper).open).toBe(true);
		await wrapper.setProps({ modelValue: false });
		expect(dialogOf(wrapper).open).toBe(false);
		wrapper.unmount();
	});

	it('mengirim update:modelValue tepat sekali saat ditutup (Esc memicu cancel lalu close)', async () => {
		const wrapper = mount(MjlModal, { props: { modelValue: true }, attachTo: document.body });
		const dialog = dialogOf(wrapper);
		// Urutan browser saat Esc: event `cancel`, lalu dialog ditutup dan `close` dikirim.
		dialog.dispatchEvent(new Event('cancel'));
		dialog.close();
		await new Promise((resolve) => setTimeout(resolve));
		await nextTick();
		expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
		wrapper.unmount();
	});

	it('tidak mengirim event saat ditutup oleh parent', async () => {
		const wrapper = mount(MjlModal, { props: { modelValue: true }, attachTo: document.body });
		await wrapper.setProps({ modelValue: false });
		dialogOf(wrapper).dispatchEvent(new Event('close'));
		expect(wrapper.emitted('update:modelValue')).toBeUndefined();
		wrapper.unmount();
	});
});
