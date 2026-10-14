import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: 'src/index.ts',
			formats: ['es'],
			fileName: 'index',
		},
		// Satu file ESM; komponen yang tak dipakai tetap terbuang oleh bundler
		// pemakai karena paket ditandai "sideEffects": false.
		rolldownOptions: {
			external: ['vue', /^@majalengka\//],
		},
		sourcemap: true,
		emptyOutDir: true,
	},
	test: {
		environment: 'happy-dom',
		include: ['src/**/*.test.ts'],
	},
});
