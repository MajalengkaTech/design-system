import axe from 'axe-core';
import { expect } from 'vitest';

/**
 * Jalankan axe-core pada komponen yang sudah di-mount.
 * color-contrast dimatikan: happy-dom tidak menghitung layout/warna,
 * dan kontras sudah dijaga lewat uji token (packages/tokens).
 */
export async function expectNoA11yViolations(element: Element) {
	const result = await axe.run(element, {
		rules: {
			'color-contrast': { enabled: false },
			region: { enabled: false },
		},
	});
	const summary = result.violations.map(v => `${v.id}: ${v.help} (${v.nodes.map(n => n.html).join(' | ')})`);
	expect(summary).toEqual([]);
}
