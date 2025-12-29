// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import babelParser from '@babel/eslint-parser'
import scwJavascript from '@scaleway/eslint-config-react/javascript'
import scwTypescript from '@scaleway/eslint-config-react/typescript'
import oxlint from 'eslint-plugin-oxlint'
import storybook from 'eslint-plugin-storybook'
import testingLibrary from 'eslint-plugin-testing-library'
import globals from 'globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const disableRules = {
  // ---- biome rules ----
  'import/order': 'off',
  "sort-imports": "off",
  'import/no-unresolved': 'off',
  '@stylistic/no-extra-semi': 'off',
  '@stylistic/brace-style': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',

  // to check
  'react/no-unused-prop-types': 'off',
  'react/jsx-props-no-spreading': 'warn',
  '@typescript-eslint/no-unnecessary-condition': 'off',
  'no-restricted-syntax': 'off'
}

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
      'apps/storybook/.storybook',
      'eslint.config.mjs',
      'next-env.d.ts'
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        tsconfigRootDir: dirname,
        project: [
          'tsconfig.json',
          'packages/*/tsconfig.json',
          'tools/*/tsconfig.json'
        ],
      },
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.json', '.ts', '.tsx', '.d.ts'],
          moduleDirectory: ['node_modules', 'src'],
        },
      },
    },
  },
  ...scwJavascript.map(config => ({
    ...config,
    languageOptions: {
      parser: babelParser,
    },
    files: ['**/*.js', '**/*.mjs'],
    rules: {
      ...config.rules,
      ...disableRules,
    },
  })),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  },
  ...scwTypescript.map(config => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...config.rules,
      ...disableRules,
      'react/jsx-props-no-spreading': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'off'
    },
  })),
  {
    files: [
      '**/__stories__/**/*.{ts,tsx}',
      '**/__tests__/**/*.{ts,tsx}',
      '**/vite.config.*',
      '**/vitest.config.*',
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
      '**/vitest.config.*',
      'utils/test/**/*.{ts,tsx}',
      '**/vitest.setup.ts',
      '.storybook/**',
      'apps/storybook/.storybook/**',
    ],

    rules: {
      ...config.rules,
      ...disableRules,
      'no-console': 'off',
      'no-alert': 'off',
      'prefer-arrow-callback': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unstable-nested-components': 'off',
      'react/jsx-key': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-relative-packages': 'off',

      '@typescript-eslint/no-unnecessary-condition': 'off',
      'typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  })),
  {
    files: ['**/*.d.ts', '**/vite.config.ts', '**/vitest.config.*',
],

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
  {
    files: [
      '!**/e2e/**',
      '**/__tests__/**/*.ts?(x)',
      '**/(*.)+(spec|test).ts?(x)',
    ],
    ...testingLibrary.configs['flat/react'],
  },
  ...oxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
  {
    ...storybook.configs['flat/recommended'][0],
    rules: {
      ...storybook.configs['flat/recommended'][0].rules,
      'storybook/default-exports': 'off',
    },
  },
]
