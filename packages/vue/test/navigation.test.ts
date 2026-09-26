import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import { createMajalengka, MjlBreadcrumb, MjlButton, MjlPagination, MjlStepper, MjlTabs } from '../src';
import { expectNoA11yViolations } from './helpers';

// Pengganti RouterLink/NuxtLink untuk uji
const FakeRouterLink = defineComponent({
	props: { to: String },
	setup: (props, { slots }) => () => h('a', { 'href': props.to, 'data-router': '' }, slots.default?.()),
});

describe('MjlButton', () => {
	it('default <button type="button"> tanpa aria-disabled', () => {
		const w = mount(MjlButton, { slots: { default: 'Kirim' } });
		expect(w.element.tagName).toBe('BUTTON');
		expect(w.attributes('type')).toBe('button');
		expect(w.attributes('aria-disabled')).toBeUndefined();
	});

	it('tautan nonaktif tidak punya href sama sekali', () => {
		const w = mount(MjlButton, { props: { href: '/layanan', disabled: true }, slots: { default: 'Ajukan' } });
		expect(w.element.tagName).toBe('A');
		expect(w.attributes('href')).toBeUndefined();
		expect(w.attributes('aria-disabled')).toBe('true');
	});

	it('loading: aria-busy dan tidak bisa diklik', () => {
		const w = mount(MjlButton, { props: { loading: true }, slots: { default: 'Kirim' } });
		expect(w.attributes('aria-busy')).toBe('true');
		expect(w.attributes('disabled')).toBeDefined();
	});

	it('dengan plugin router: tautan internal memakai komponen router, eksternal tetap <a>', () => {
		const global = { plugins: [createMajalengka({ link: FakeRouterLink })] };
		const internal = mount(MjlButton, { props: { to: '/layanan' }, slots: { default: 'Layanan' }, global });
		expect(internal.attributes('data-router')).toBeDefined();
		expect(internal.attributes('href')).toBe('/layanan');
		const external = mount(MjlButton, { props: { href: 'https://majalengkakab.go.id' }, slots: { default: 'Situs resmi' }, global });
		expect(external.attributes('data-router')).toBeUndefined();
	});
});

describe('MjlTabs', () => {
	const items = [
		{ key: 'syarat', label: 'Syarat' },
		{ key: 'biaya', label: 'Biaya', disabled: true },
		{ key: 'alur', label: 'Alur' },
	];
	const mountTabs = () => mount(MjlTabs, {
		props: { items, label: 'Informasi layanan' },
		slots: { syarat: 'Isi syarat', biaya: 'Isi biaya', alur: 'Isi alur' },
		attachTo: document.body,
	});

	it('ARIA lengkap dan hanya panel aktif yang tampil', async () => {
		const w = mountTabs();
		const tabs = w.findAll('[role="tab"]');
		const panels = w.findAll('[role="tabpanel"]');
		expect(tabs.map(t => t.attributes('aria-selected'))).toEqual(['true', 'false', 'false']);
		expect(panels.map(p => p.attributes('hidden') !== undefined)).toEqual([false, true, true]);
		expect(tabs[0]!.attributes('aria-controls')).toBe(panels[0]!.attributes('id'));
		expect(panels[0]!.attributes('aria-labelledby')).toBe(tabs[0]!.attributes('id'));
		await expectNoA11yViolations(w.element);
		w.unmount();
	});

	it('panah kanan melewati tab disabled, Home/End, dan berputar di ujung', async () => {
		const w = mountTabs();
		const tabs = () => w.findAll('[role="tab"]');
		const selected = () => tabs().findIndex(t => t.attributes('aria-selected') === 'true');
		await tabs()[0]!.trigger('keydown', { key: 'ArrowRight' });
		await nextTick();
		expect(selected()).toBe(2);
		expect(document.activeElement).toBe(tabs()[2]!.element);
		await tabs()[2]!.trigger('keydown', { key: 'ArrowRight' });
		expect(selected()).toBe(0);
		await tabs()[0]!.trigger('keydown', { key: 'End' });
		expect(selected()).toBe(2);
		await tabs()[2]!.trigger('keydown', { key: 'Home' });
		expect(selected()).toBe(0);
		w.unmount();
	});

	it('menandai diri agar tidak dikelola @majalengka/js', () => {
		expect(mountTabs().attributes('data-mjl-manual')).toBeDefined();
	});
});

describe('MjlPagination', () => {
	const pages = (w: ReturnType<typeof mount>) => w.findAll('li').slice(1, -1).map(li => li.text());

	it('memotong halaman panjang dengan elipsis', () => {
		const w = mount(MjlPagination, { props: { modelValue: 10, pageCount: 20 } });
		expect(pages(w)).toEqual(['1', '…', '9', '10', '11', '…', '20']);
		expect(w.get('[aria-current="page"]').text()).toBe('10');
	});

	it('jumlah tombol tetap di awal, tengah, dan akhir', () => {
		const at = (modelValue: number) => pages(mount(MjlPagination, { props: { modelValue, pageCount: 20 } }));
		expect(at(1)).toEqual(['1', '2', '3', '4', '5', '…', '20']);
		expect(at(3)).toEqual(['1', '2', '3', '4', '5', '…', '20']);
		expect(at(20)).toEqual(['1', '…', '16', '17', '18', '19', '20']);
		expect(new Set([1, 3, 10, 18, 20].map(n => at(n).length))).toEqual(new Set([7]));
	});

	it('tombol sebelumnya nonaktif di halaman 1, dan setiap halaman berlabel', () => {
		const w = mount(MjlPagination, { props: { modelValue: 1, pageCount: 3 } });
		const buttons = w.findAll('button');
		expect(buttons[0]!.attributes('disabled')).toBeDefined();
		expect(buttons[1]!.attributes('aria-label')).toBe('Halaman 1');
	});

	it('klik halaman mengubah v-model', async () => {
		const w = mount(MjlPagination, { props: { modelValue: 1, pageCount: 5 } });
		await w.findAll('button')[3]!.trigger('click');
		expect(w.emitted('update:modelValue')?.[0]).toEqual([3]);
	});
});

describe('MjlStepper & MjlBreadcrumb', () => {
	it('stepper memakai <ol> dan membacakan langkah yang selesai', async () => {
		const w = mount(MjlStepper, {
			props: { steps: [{ id: 1, title: 'Isi data' }, { id: 2, title: 'Unggah berkas' }, { id: 3, title: 'Kirim' }], currentStepIndex: 1 },
			attachTo: document.body,
		});
		expect(w.find('ol.mjl-stepper').exists()).toBe(true);
		expect(w.findAll('li')[0]!.text()).toContain('(selesai)');
		expect(w.findAll('li')[1]!.attributes('aria-current')).toBe('step');
		await expectNoA11yViolations(w.element);
		w.unmount();
	});

	it('breadcrumb: item terakhir aria-current, label bisa diganti', () => {
		const w = mount(MjlBreadcrumb, {
			props: { items: [{ label: 'Beranda', href: '/' }, { label: 'Layanan' }], label: 'Breadcrumb' },
		});
		expect(w.get('nav').attributes('aria-label')).toBe('Breadcrumb');
		expect(w.get('[aria-current="page"]').text()).toBe('Layanan');
	});
});
