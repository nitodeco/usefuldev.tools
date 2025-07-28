import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import 'eslint-plugin-only-warn';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const nextConfig = compat.extends('next/core-web-vitals', 'next/typescript');

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  stylistic.configs.recommended,
  eslintConfigPrettier,
  ...nextConfig,
  {
    ignores: ['dist/*', 'node_modules/*', '**/components/ui/*'],
  },
  {
    files: ['**/src/**/*.{js,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@stylistic': stylistic,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json'],
          rootDir: import.meta.dirname,
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-object-type': ['warn', { allowInterfaces: 'with-single-extends' }],
      '@typescript-eslint/consistent-type-assertions': ['warn', { assertionStyle: 'never' }],

      '@stylistic/spaced-comment': [
        'warn',
        'always',
        {
          line: {
            markers: ['/', '!', 'eslint', '=', 'eslint-disable', 'eslint-disable-line', 'eslint-disable-next-line'],
            exceptions: ['-', '+', '*', '='],
          },
          block: {
            markers: ['!', '*', 'eslint', 'eslint-disable', 'eslint-enable'],
            exceptions: ['*'],
            balanced: true,
          },
        },
      ],

      '@stylistic/padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      ],
    },
  },
  {
    files: ['**/.eslint.config.{js,ts,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 5,
      sourceType: 'commonjs',
    },
  },
];
