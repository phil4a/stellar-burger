/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		strictPort: true,
		open: true,
	},
	preview: {
		port: 3000,
		strictPort: true,
	},
	build: {
		outDir: 'dist',
		sourcemap: false,
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/setupTests.ts',
		include: ['src/**/*.test.{js,ts,tsx}'],
	},
});
