import { base, react, vitest, ignorePatterns } from '@scaleway/oxlint-config'
import { defineConfig } from 'oxlint'
import { warnRules } from './oxlint-fix.config.ts'

export default defineConfig({
  extends: [base, react, vitest, warnRules],
  jsPlugins: ['./.oxlint/rules/storybook-a11y-partial.cjs'],
  options: {
    reportUnusedDisableDirectives: 'error',
    typeAware: true,
  },
  ignorePatterns: [
    ...ignorePatterns,
    '**/app.config.d.ts',
    '**/package.config.d.ts',
    'examples/**',
    'e2e/**',
    'next.config.js',
    '*.d.ts',
    'svgo.config.mjs',
    '.oxlint/rules/*',
  ],
  overrides: [
    {
      files: [
        '**/__stories__/**/*.{ts,tsx}',
        '**/__tests__/**/*.{ts,tsx}',
        '**/*.test.{ts,tsx}',
        '**/utils/*.{ts,tsx}',
        '.storybook/**/*.{ts,tsx}',
        'examples/**',
        'utils/stories/**/*.{ts,tsx}',
        'utils/scripts/*.ts',
        '**/icons/process-css.ts',
        'vite.config.ts',
      ],
      rules: {
        'eslint/no-alert': 'off',
        'eslint/no-console': 'off',
        'eslint/prefer-arrow-callback': 'off',

        'import/no-anonymous-default-export': 'off',
        'import/no-named-export': 'off',
        'import/no-namespace': 'off',
        'import/no-nodejs-modules': 'off',
        'import/no-unassigned-import': 'off',

        'react/jsx-pascal-case': 'off',
        'react/no-multi-comp': 'off',
        'react/no-array-index-key': 'off',
        'react/only-export-components': 'off',
        'react/no-unstable-nested-components': 'off',
        'typescript/strict-void-return': 'off',
        'typescript/no-useless-default-assignment': 'off',
        'typescript/no-unsafe-assignment': 'warn', // typescript errors (2233)
        'typescript/no-unsafe-call': 'warn', // typescript errors (332)
        'typescript/no-unsafe-member-access': 'warn', // typescript errors (2353)
        'typescript/no-unsafe-return': 'warn', // typescript errors (41)

        'unicorn/consistent-function-scoping': 'off',
        '@ultraviolet/a11y-partial': 'warn', // @ultraviolet errors (53)
      },
    },
    {
      files: [
        '**/__tests__/**/*.{ts,tsx}',
        '**/__mocks__/**/*.{ts,tsx}',
        '**/*.test.{ts,tsx}',
        'test-utils.tsx',
        'setup.ts',
        '*.config.ts',
        '.vitest/**',
        'vitest.setup.ts',
        '**/setup.ts',
        '**/vitest.setup.ts',
        '**/vitest/setup.ts',
      ],
      plugins: ['import', 'oxc', 'vitest'],
      rules: {
        'eslint/func-names': 'off',
        'eslint/max-statements': ['error', { max: 100 }],
        'import/export': 'off',
        'import/max-dependencies': 'off',
        'import/no-anonymous-default-export': 'off',
        'import/no-named-export': 'off',
        'import/no-namespace': 'off',
        'import/no-unassigned-import': 'off',

        'jsx_a11y/label-has-associated-control': 'off',

        'no-console': 'off',
        'node/no-process-env': 'off',

        'typescript/consistent-type-imports': 'error',
        'typescript/no-unsafe-assignment': 'warn', // typescript errors (2233)
        'typescript/no-unsafe-member-access': 'off',
        'typescript/promise-function-async': 'warn', // typescript errors (1)
        'typescript/strict-void-return': 'off',

        'unicorn/no-new-array': 'off',
        'unicorn/prefer-logical-operator-over-ternary': 'off',
        'unicorn/prefer-set-has': 'off',
        'unicorn/consistent-function-scoping': 'off',

        'vitest/no-conditional-expect': 'warn', // vitest errors (11)
        'vitest/no-conditional-in-test': 'warn', // vitest errors (36)
        'vitest/no-importing-vitest-globals': 'off',
        'vitest/padding-around-test-blocks': 'warn', // vitest errors (129)
        'vitest/prefer-called-times': 'off',
        'vitest/prefer-import-in-mock': 'off',
        'vitest/prefer-lowercase-title': 'error',
        'vitest/prefer-to-be-falsy': 'off',
        'vitest/prefer-to-be-truthy': 'off',
        'vitest/require-test-timeout': 'off',
        'vitest/require-mock-type-parameters': 'off',
        'vitest/prefer-expect-assertions': 'off',
        'vitest/no-hooks': 'off',
        'vitest/expect-expect': 'off',
        'vitest/valid-title': 'off',
        'vitest/prefer-snapshot-hint': 'off',
        'vitest/require-hook': 'warn', // vitest errors (5)
        'vitest/prefer-called-with': 'off',
        'vitest/max-expects': ['error', { max: 10 }],
        'vitest/no-mocks-import': 'error',
      },
    },
    {
      files: ['e2e/**/*.{ts,tsx}'],
      rules: {
        'eslint/max-statements': ['error', { max: 30 }],
        'react/no-multi-comp': 'off',
        'node/no-process-env': 'off',
      },
    },
  ],
  plugins: ['import', 'node', 'oxc', 'react', 'typescript', 'unicorn', 'jsx-a11y'],
  rules: {
    'eslint/max-statements': ['error', { max: 30 }], // base sets max: 50
    'eslint/no-negated-condition': 'off', // eslint errors (6)
    'eslint/sort-imports': [
      'off',
      {
        ignoreDeclarationSort: true,
        memberSyntaxSortOrder: ['single', 'multiple', 'all', 'none'],
      },
    ], // eslint errors (1008)

    'import/max-dependencies': 'off', // import errors (36)
    'import/no-unassigned-import': 'off', // import errors (1)

    'jsx-a11y/control-has-associated-label': [
      'error',
      {
        depth: 5,
        ignoreElements: [
          // default values
          'audio',
          'canvas',
          'embed',
          'input',
          'textarea',
          'video',
          'tr',

          // custom
          'td',
        ],
      },
    ],
    'jsx-a11y/no-autofocus': 'off',

    'react/display-name': 'off', // react errors (4)
    'react/forbid-component-props': 'off', // react errors (229)
    'react/jsx-max-depth': ['error', { max: 10 }], // base sets max: 8
    'react/jsx-props-no-spreading': 'off', // react errors (215)
    'react/no-clone-element': 'off', // react errors (2)
    'react/no-react-children': 'off', // react errors (10)
    'react/only-export-components': 'off', // react errors (22)

    'typescript/dot-notation': 'off', // typescript errors (4)
    'typescript/no-confusing-void-expression': 'off', // typescript errors (390)
    'typescript/no-unsafe-argument': 'off', // typescript errors (2)
    'typescript/no-useless-default-assignment': 'off', // typescript errors (2)
    'typescript/prefer-nullish-coalescing': ['off', { ignoreBooleanCoercion: true }], // typescript errors (39)
    'typescript/promise-function-async': 'off', // typescript errors (7)
    'typescript/strict-boolean-expressions': 'off', // typescript errors (416)
    'typescript/strict-void-return': 'off', // typescript errors (118)

    'unicorn/no-invalid-remove-event-listener': 'off', // unicorn errors (5)
    'unicorn/no-new-array': 'off', // unicorn errors (3)
    'unicorn/no-zero-fractions': 'off', // unicorn errors (60)
    'unicorn/number-literal-case': 'off', // unicorn errors (2)
    'unicorn/numeric-separators-style': 'off', // unicorn errors (10)
    'unicorn/prefer-array-some': 'off', // unicorn errors (2)
    'unicorn/prefer-code-point': 'off', // unicorn errors (2)
    'unicorn/prefer-dom-node-append': 'off', // unicorn errors (7)
    'unicorn/prefer-dom-node-remove': 'off', // unicorn errors (1)
    'unicorn/prefer-global-this': 'off', // unicorn errors (7)
    'unicorn/prefer-import-meta-properties': 'off', // unicorn errors (2)
    'unicorn/prefer-logical-operator-over-ternary': 'off', // unicorn errors (2)
    'unicorn/prefer-query-selector': 'off', // unicorn errors (8)
    'unicorn/prefer-set-has': 'off', // unicorn errors (2)
    'unicorn/prefer-string-slice': 'off', // unicorn errors (1)
    'unicorn/prefer-ternary': 'off', // unicorn errors (1)
  },
})
