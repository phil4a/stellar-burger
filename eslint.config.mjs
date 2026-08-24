import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginCypress from 'eslint-plugin-cypress/flat';

export default tseslint.config(
	{
		ignores: ['dist', 'build', 'coverage', 'node_modules', 'cypress/screenshots', 'cypress/videos'],
	},

	// Приложение
	{
		files: ['src/**/*.{ts,tsx}'],
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
			globals: globals.browser,
			parserOptions: { ecmaFeatures: { jsx: true } },
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'warn',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		},
	},

	// Юнит-тесты (Vitest, globals: true)
	{
		files: ['src/**/*.test.js'],
		extends: [js.configs.recommended],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
				global: 'readonly',
				vi: 'readonly',
				describe: 'readonly',
				test: 'readonly',
				it: 'readonly',
				expect: 'readonly',
				beforeAll: 'readonly',
				afterAll: 'readonly',
				beforeEach: 'readonly',
				afterEach: 'readonly',
			},
		},
	},

	// E2E
	{
		files: ['cypress/**/*.{js,ts}'],
		extends: [js.configs.recommended, pluginCypress.configs.recommended],
	},

	// Конфиги, исполняемые в Node
	{
		files: ['vite.config.ts', 'cypress.config.ts', 'eslint.config.mjs'],
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		languageOptions: { globals: globals.node },
		rules: { '@typescript-eslint/no-unused-vars': 'off' },
	},
);
