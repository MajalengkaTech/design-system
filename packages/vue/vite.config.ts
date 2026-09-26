/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: 'src/index.ts',
			formats: ['es'],
			fileName: 'index',
		},
		// vue dan @majalengka/js disediakan aplikasi pemakai, jangan dibundel
		rolldownOptions: {
			external: ['vue', '@majalengka/js'],
		},
		sourcemap: true,
		emptyOutDir: true,
	},
	test: {
		environment: 'happy-dom',
		include: ['test/**/*.test.ts'],
	},
});
