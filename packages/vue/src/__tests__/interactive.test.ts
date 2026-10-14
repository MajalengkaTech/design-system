import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import MjlTabs from '../components/MjlTabs.vue';
import MjlPinInput from '../components/MjlPinInput.vue';
import MjlProgress from '../components/MjlProgress.vue';
import MjlSwitch from '../components/MjlSwitch.vue';
import MjlChip from '../components/MjlChip.vue';
import MjlAvatar from '../components/MjlAvatar.vue';

describe('MjlTabs', () => {
	const items = [
		{ value: 'syarat', label: 'Persyaratan' },
		{ value: 'biaya', label: 'Biaya', disabled: true },
		{ value: 'alur', label: 'Alur' },
	];

	it('menghubungkan tab dan panel lewat ARIA, hanya tab aktif yang bisa di-Tab', () => {
		const wrapper = mount(MjlTabs, { props: { items } });
		const tabs = wrapper.findAll('[role="tab"]');
		const panels = wrapper.findAll('[role="tabpanel"]');
		expect(tabs[0].attributes('aria-selected')).toBe('true');
		expect(tabs[0].attributes('tabindex')).toBe('0');
		expect(tabs[2].attributes('tabindex')).toBe('-1');
		expect(tabs[0].attributes('aria-controls')).toBe(panels[0].attributes('id'));
		expect(panels[0].attributes('aria-labelledby')).toBe(tabs[0].attributes('id'));
		expect(panels[2].attributes('hidden')).toBeDefined();
	});

	it('panah kanan melompati tab nonaktif, End/Home ke ujung', async () => {
		const wrapper = mount(MjlTabs, {
			props: { items, modelValue: 'syarat', 'onUpdate:modelValue': (v?: string) => wrapper.setProps({ modelValue: v }) },
		});
		const list = wrapper.find('[role="tablist"]');
		await list.trigger('keydown', { key: 'ArrowRight' });
		expect(wrapper.props('modelValue')).toBe('alur');
		await list.trigger('keydown', { key: 'Home' });
		expect(wrapper.props('modelValue')).toBe('syarat');
		await list.trigger('keydown', { key: 'ArrowLeft' });
		expect(wrapper.props('modelValue')).toBe('alur');
	});
});

describe('MjlPinInput', () => {
	const mountPin = (props = {}) => {
		const wrapper = mount(MjlPinInput, {
			props: { length: 4, modelValue: '', 'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v }), ...props },
			attachTo: document.body,
		});
		return wrapper;
	};

	it('mengisi semua kotak dari paste, membuang non-angka, lalu emit complete', async () => {
		const wrapper = mountPin();
		const event = new Event('paste', { cancelable: true }) as ClipboardEvent;
		Object.defineProperty(event, 'clipboardData', { value: { getData: () => '12-34' } });
		wrapper.find('input').element.dispatchEvent(event);
		await nextTick();
		expect(wrapper.props('modelValue')).toBe('1234');
		expect(wrapper.emitted('complete')).toEqual([['1234']]);
		wrapper.unmount();
	});

	it('menolak huruf saat numeric dan menghapus mundur dengan Backspace', async () => {
		const wrapper = mountPin({ modelValue: '12' });
		const boxes = wrapper.findAll('input');
		await boxes[2].setValue('a');
		expect(wrapper.props('modelValue')).toBe('12');
		await boxes[2].trigger('keydown', { key: 'Backspace' });
		expect(wrapper.props('modelValue')).toBe('1');
		wrapper.unmount();
	});

	it('memberi label pada setiap kotak', () => {
		const wrapper = mountPin();
		expect(wrapper.findAll('input')[1].attributes('aria-label')).toBe('Karakter 2 dari 4');
	});
});

describe('Komponen status', () => {
	it('MjlProgress mengekspos nilai, dan tanpa value dianggap indeterminate', () => {
		const known = mount(MjlProgress, { props: { label: 'Unggah', value: 30, max: 60 } });
		const bar = known.find('[role="progressbar"]');
		expect(bar.attributes('aria-valuenow')).toBe('30');
		expect(bar.attributes('aria-valuetext')).toBe('50%');
		const unknown = mount(MjlProgress, { props: { label: 'Memuat' } });
		expect(unknown.find('[role="progressbar"]').attributes('aria-valuenow')).toBeUndefined();
		expect(unknown.classes()).toContain('mjl-progress--indeterminate');
	});

	it('MjlSwitch memakai role="switch" dan v-model', async () => {
		const wrapper = mount(MjlSwitch, {
			props: { label: 'Notifikasi', modelValue: false, 'onUpdate:modelValue': (v: boolean) => wrapper.setProps({ modelValue: v }) },
		});
		const input = wrapper.find('input');
		expect(input.attributes('role')).toBe('switch');
		await input.setValue(true);
		expect(wrapper.props('modelValue')).toBe(true);
	});

	it('MjlChip menyembunyikan angka visual dan membacakan label', () => {
		const wrapper = mount(MjlChip, { props: { count: 120, label: '120 pesan baru' } });
		expect(wrapper.find('.mjl-chip').text()).toBe('99+');
		expect(wrapper.find('.mjl-chip').attributes('aria-hidden')).toBe('true');
		expect(wrapper.find('.sr-only').text()).toBe('120 pesan baru');
		expect(mount(MjlChip, { props: { count: 0, label: 'x' } }).find('.mjl-chip').exists()).toBe(false);
	});

	it('MjlAvatar jatuh ke inisial saat gambar gagal dimuat', async () => {
		const wrapper = mount(MjlAvatar, { props: { name: 'Siti Nurhaliza Rahma', src: '/x.png' } });
		expect(wrapper.attributes('aria-label')).toBe('Siti Nurhaliza Rahma');
		await wrapper.find('img').trigger('error');
		expect(wrapper.find('.mjl-avatar__fallback').text()).toBe('SN');
	});
});
