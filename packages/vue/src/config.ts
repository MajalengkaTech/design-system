import { inject, type App, type Component, type InjectionKey } from 'vue';

export interface MajalengkaOptions {
	/**
	 * Komponen untuk tautan internal, mis. NuxtLink atau RouterLink.
	 * Default 'a' (tautan biasa, cocok untuk situs tanpa router).
	 */
	link?: string | Component;
}

const KEY: InjectionKey<Required<MajalengkaOptions>> = Symbol('majalengka');

/**
 * Plugin opsional. Tanpa plugin, komponen memakai <a href> biasa.
 *
 *   app.use(createMajalengka({ link: RouterLink }))
 *   // Nuxt: nuxtApp.vueApp.use(createMajalengka({ link: resolveComponent('NuxtLink') }))
 */
export function createMajalengka(options: MajalengkaOptions = {}) {
	const config: Required<MajalengkaOptions> = { link: 'a', ...options };
	return {
		install(app: App) {
			app.provide(KEY, config);
		},
	};
}

const isExternal = (target: string) => /^(https?:|mailto:|tel:|#)/.test(target);

/**
 * Tentukan elemen dan atribut untuk sebuah tujuan tautan. URL eksternal,
 * mailto:, tel:, dan #anchor selalu memakai <a href>.
 */
export function useLink() {
	const config = inject(KEY, { link: 'a' });
	return (target: string) =>
		config.link === 'a' || isExternal(target)
			? { is: 'a' as const, attrs: { href: target } }
			: { is: config.link, attrs: { to: target } };
}
