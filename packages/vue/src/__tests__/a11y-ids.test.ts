import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import MjlModal from '../components/MjlModal.vue';
import MjlTrustBanner from '../components/MjlTrustBanner.vue';
import MjlDrawer from '../components/MjlDrawer.vue';

// Dua instance di satu halaman tidak boleh berbagi id, kalau tidak
// aria-labelledby / aria-controls akan menunjuk elemen yang salah.
describe('ID unik per instance', () => {
	it('MjlModal: setiap judul punya id sendiri dan dirujuk dialognya', () => {
		const wrapper = mount(defineComponent({
			render: () => [
				h(MjlModal, { modelValue: false, title: 'Satu' }),
				h(MjlModal, { modelValue: false, title: 'Dua' }),
			],
		}));
		const dialogs = wrapper.findAll('dialog');
		const titles = wrapper.findAll('.mjl-modal__title');
		expect(titles[0].attributes('id')).toBeTruthy();
		expect(titles[0].attributes('id')).not.toBe(titles[1].attributes('id'));
		dialogs.forEach((dialog, i) => {
			expect(dialog.attributes('aria-labelledby')).toBe(titles[i].attributes('id'));
		});
	});

	it('MjlTrustBanner: aria-controls menunjuk panel milik instance itu sendiri', () => {
		const slots = { default: () => 'Detail' };
		const wrapper = mount(defineComponent({
			render: () => [
				h(MjlTrustBanner, { owner: 'A' }, slots),
				h(MjlTrustBanner, { owner: 'B' }, slots),
			],
		}));
		const toggles = wrapper.findAll('.mjl-trust-banner__toggle');
		const panels = wrapper.findAll('.mjl-trust-banner__details');
		expect(panels[0].attributes('id')).not.toBe(panels[1].attributes('id'));
		toggles.forEach((toggle, i) => {
			expect(toggle.attributes('aria-controls')).toBe(panels[i].attributes('id'));
		});
	});

	it('MjlDrawer: judul dirujuk dialognya', () => {
		const wrapper = mount(MjlDrawer, { props: { modelValue: false, title: 'Detail' } });
		const id = wrapper.find('.mjl-drawer__title').attributes('id');
		expect(id).toBeTruthy();
		expect(wrapper.find('dialog').attributes('aria-labelledby')).toBe(id);
	});
});
