import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, ref } from 'vue';
import { beforeAll, describe, expect, it } from 'vitest';
import { MjlAlert, MjlDrawer, MjlModal, MjlTrustBanner } from '../src';

// happy-dom belum mengimplementasikan modal <dialog>; cukup buka/tutup untuk uji sinkronisasi v-model
beforeAll(() => {
	const proto = HTMLDialogElement.prototype as HTMLDialogElement & { __stub?: boolean };
	if (proto.__stub) return;
	proto.__stub = true;
	proto.showModal = function (this: HTMLDialogElement) {
		this.setAttribute('open', '');
	};
	proto.close = function (this: HTMLDialogElement) {
		if (!this.hasAttribute('open')) return;
		this.removeAttribute('open');
		this.dispatchEvent(new Event('close'));
	};
	Object.defineProperty(proto, 'open', {
		configurable: true,
		get(this: HTMLDialogElement) {
			return this.hasAttribute('open');
		},
	});
});

describe('MjlModal', () => {
	it('langsung terbuka kalau v-model sudah true saat mount (bug lama)', () => {
		const w = mount(MjlModal, { props: { modelValue: true, title: 'Konfirmasi' }, attachTo: document.body });
		expect((w.element as HTMLDialogElement).open).toBe(true);
		w.unmount();
	});

	it('dua modal di satu halaman: id judul berbeda dan tersambung', () => {
		const w = mount(defineComponent({
			render: () => [
				h(MjlModal, { modelValue: false, title: 'A' }),
				h(MjlModal, { modelValue: false, title: 'B' }),
			],
		}));
		const dialogs = w.findAll('dialog');
		const ids = dialogs.map(d => d.attributes('aria-labelledby'));
		expect(ids[0]).not.toBe(ids[1]);
		expect(dialogs[0]!.get(`#${CSS.escape(ids[0]!)}`).text()).toBe('A');
	});

	it('tombol tutup dan event close menyinkronkan v-model', async () => {
		const open = ref(true);
		const w = mount(defineComponent({
			render: () => h(MjlModal, { 'modelValue': open.value, 'onUpdate:modelValue': (v: boolean) => (open.value = v), 'title': 'X' }),
		}), { attachTo: document.body });
		await w.get('.mjl-modal__close').trigger('click');
		await nextTick();
		expect(open.value).toBe(false);
		expect((w.get('dialog').element as HTMLDialogElement).open).toBe(false);
		w.unmount();
	});

	it('dismissible=false: tidak ada tombol tutup dan Esc dicegah', async () => {
		const w = mount(MjlModal, { props: { modelValue: true, title: 'Wajib dijawab', dismissible: false } });
		expect(w.find('.mjl-modal__close').exists()).toBe(false);
		const cancel = new Event('cancel', { cancelable: true });
		w.element.dispatchEvent(cancel);
		expect(cancel.defaultPrevented).toBe(true);
	});
});

describe('MjlDrawer', () => {
	it('arah dan judul tersambung', () => {
		const w = mount(MjlDrawer, { props: { modelValue: false, title: 'Detail berkas', side: 'left' } });
		expect(w.classes()).toContain('mjl-drawer--left');
		expect(w.get(`#${CSS.escape(w.attributes('aria-labelledby')!)}`).text()).toBe('Detail berkas');
	});
});

describe('MjlAlert', () => {
	it('tanpa live: tidak ada role (alert statis tidak perlu diumumkan)', () => {
		expect(mount(MjlAlert, { slots: { default: 'Info' } }).attributes('role')).toBeUndefined();
	});

	it('live: danger → alert, lainnya → status', () => {
		expect(mount(MjlAlert, { props: { live: true, variant: 'danger' } }).attributes('role')).toBe('alert');
		expect(mount(MjlAlert, { props: { live: true, variant: 'success' } }).attributes('role')).toBe('status');
	});

	it('dismissible: tombol tutup berlabel memancarkan dismiss', async () => {
		const w = mount(MjlAlert, { props: { dismissible: true } });
		const close = w.get('.mjl-alert__close');
		expect(close.attributes('aria-label')).toBe('Tutup pesan');
		await close.trigger('click');
		expect(w.emitted('dismiss')).toHaveLength(1);
	});
});

describe('MjlTrustBanner', () => {
	it('toggle mengatur aria-expanded dan id detail unik', async () => {
		const w = mount(defineComponent({
			render: () => [
				h(MjlTrustBanner, { owner: 'Dinas A' }, () => 'Detail A'),
				h(MjlTrustBanner, { owner: 'Dinas B' }, () => 'Detail B'),
			],
		}));
		const toggles = w.findAll('button');
		expect(toggles[0]!.attributes('aria-controls')).not.toBe(toggles[1]!.attributes('aria-controls'));
		expect(toggles[0]!.attributes('aria-expanded')).toBe('false');
		await toggles[0]!.trigger('click');
		expect(toggles[0]!.attributes('aria-expanded')).toBe('true');
	});
});
