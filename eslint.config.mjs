import babelParser from '@babel/eslint-parser'
import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import scwEmotion from '@scaleway/eslint-config-react/emotion'
import scwJavascript from '@scaleway/eslint-config-react/javascript'
import scwTypescript from '@scaleway/eslint-config-react/typescript'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const compat = new FlatCompat({
  baseDirectory: dirname,
})

export default [
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/storybook-static',
      '**/.next/',
      '**/public/',
      '**/out/',
      '**/examples/',
      '**/.vitest/',
      '**/coverage/',
      '.storybook',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  ...[...scwJavascript, ...scwEmotion].map(config => ({
    ...config,
    files: ['**/*.js', '**/*.mjs'],
    rules: {
      ...config.rules,
      'import/no-unresolved': 'off',
    },
  })),
  {
    files: ['**/*.js', '**/*.mjs'],

    languageOptions: {
      parser: babelParser,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  },

  ...[...scwTypescript, ...scwEmotion].map(config => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      ...config.rules,
      'react/jsx-props-no-spreading': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'off',
    },
  })),

  {
    files: [
      '**/__stories__/**/*.{ts,tsx}',
      '**/__tests__/**/*.{ts,tsx}',
      '**/vite.config.*',
      'utils/test/**/*.{ts,tsx}',
      '**/vitest.setup.ts',
    ],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  },

  {
    files: ['**/scripts/**'],
    rules: {
      'no-await-in-loop': 'off',
      'no-console': 'off',
    },
  },

  ...scwTypescript.map(config => ({
    ...config,

    files: [
      '**/__stories__/**/*.{ts,tsx}',
      '**/__tests__/**/*.{ts,tsx}',
      '**/vite.config.*',
      'utils/test/**/*.{ts,tsx}',
      '**/vitest.setup.ts',
    ],

    rules: {
      ...config.rules,
      'no-console': 'off',
      'no-alert': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unstable-nested-components': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      'react/jsx-key': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-relative-packages': 'off',
      'eslint-plugin-import/no-relative-packages': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  })),
  ...fixupConfigRules(
    compat.extends('plugin:testing-library/react').map(config => ({
      ...config,
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    })),
  ),
  {
    files: ['**/*.d.ts', '**/vite.config.ts'],

    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },

  {
    files: ['packages/form/**'],
    rules: {
      'react/jsx-props-no-spreading': 'off',
    },
  },
]
