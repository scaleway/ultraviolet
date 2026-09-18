import { base, react, vitest, ignorePatterns } from '@scaleway/oxlint-config'
import { defineConfig } from 'oxlint'

export default defineConfig({
  extends: [base, react, vitest],
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

        'jsx-a11y/no-static-element-interactions': 'warn', // jsx-a11y errors (6)

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
    'eslint/class-methods-use-this': 'warn', // eslint errors (4)
    'eslint/curly': 'warn', // eslint errors (15)
    'eslint/init-declarations': 'warn', // eslint errors (15)
    'eslint/max-lines': 'warn', // eslint errors (38)
    'eslint/max-nested-callbacks': 'warn', // base sets error (max: 4); keep warn
    'eslint/max-params': 'warn', // eslint errors (33)
    'eslint/max-statements': ['error', { max: 30 }],
    'eslint/no-await-in-loop': 'warn', // eslint errors (12)
    'eslint/no-empty-function': 'warn', // eslint errors (408)
    'eslint/no-implicit-coercion': 'warn', // eslint errors (113)
    'eslint/no-negated-condition': 'off',
    'eslint/no-param-reassign': 'error',
    'eslint/no-shadow': 'warn', // eslint errors (7)
    'eslint/no-unused-vars': 'warn', // eslint errors (15)
    'eslint/object-shorthand': 'warn', // eslint errors (15)
    'eslint/prefer-destructuring': 'warn', // eslint errors (31)
    'eslint/prefer-named-capture-group': 'warn', // eslint errors (18)
    'eslint/require-unicode-regexp': 'warn', // eslint errors (34)
    'eslint/sort-imports': [
      'off',
      {
        ignoreDeclarationSort: true,
        memberSyntaxSortOrder: ['single', 'multiple', 'all', 'none'],
      },
    ],

    'import/first': 'warn', // import errors (1)
    'import/max-dependencies': 'off',
    'import/namespace': 'warn', // import errors (7)
    'import/newline-after-import': 'warn', // import errors (1)
    'import/no-namespace': 'warn', // import errors (76)
    'import/no-unassigned-import': 'off',

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
    'jsx-a11y/no-autofocus': 'warn', // jsx-a11y errors (1)
    'jsx-a11y/no-noninteractive-element-interactions': 'warn', // jsx-a11y errors (1)
    'jsx-a11y/no-noninteractive-tabindex': 'warn', // jsx-a11y errors (1)
    'jsx-a11y/no-static-element-interactions': 'warn', // jsx-a11y errors (6)
    'jsx-a11y/prefer-tag-over-role': 'warn', // jsx-a11y errors (18)

    'node/callback-return': 'warn', // node errors (2)

    'oxc/branches-sharing-code': 'warn', // oxc errors (6)
    'oxc/no-accumulating-spread': 'warn', // oxc errors (26)
    'oxc/no-barrel-file': 'warn', // oxc errors (6)
    'oxc/no-map-spread': 'warn', // oxc errors (1)

    'react/display-name': 'off',
    'react/exhaustive-effect-dependencies': 'warn', // react errors (30)
    'react/forbid-component-props': 'off',
    'react/function-component-definition': 'warn', // react errors (964)
    'react/hook-use-state': 'warn', // react errors (74)
    'react/hooks': 'warn', // react errors (2)
    'react/immutability': 'warn', // react errors (5)
    'react/jsx-curly-brace-presence': 'warn', // react errors (5)
    'react/jsx-max-depth': ['error', { max: 10 }],
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/memo-dependencies': 'warn', // react errors (4)
    'react/no-array-index-key': 'warn', // react errors (6)
    'react/no-clone-element': 'off',
    'react/no-deriving-state-in-effects': 'warn', // react errors (7)
    'react/no-object-type-as-default-prop': 'warn', // react errors (1)
    'react/no-react-children': 'off',
    'react/only-export-components': 'off',
    'react/preserve-manual-memoization': 'warn', // react errors (3)
    'react/refs': 'warn', // react errors (44)
    'react/set-state-in-effect': 'warn', // react errors (34)
    'react/static-components': 'warn', // react errors (2)

    'typescript/consistent-indexed-object-style': 'warn', // typescript errors (3)
    'typescript/consistent-return': 'warn', // typescript errors (8)
    'typescript/consistent-type-definitions': 'warn', // typescript errors (310)
    'typescript/consistent-type-imports': 'error',
    'typescript/dot-notation': 'off',
    'typescript/explicit-member-accessibility': 'warn', // typescript errors (10)
    'typescript/no-confusing-void-expression': 'off',
    'typescript/no-deprecated': 'warn', // typescript errors (594)
    'typescript/no-invalid-void-type': 'warn', // typescript errors (1)
    'typescript/no-misused-promises': 'warn', // typescript errors (1)
    'typescript/no-misused-spread': 'warn', // typescript errors (7)
    'typescript/no-non-null-assertion': 'warn', // typescript errors (29)
    'typescript/no-redundant-type-constituents': 'warn', // typescript errors (68)
    'typescript/no-unnecessary-boolean-literal-compare': 'warn', // typescript errors (1)
    'typescript/no-unnecessary-condition': 'warn', // typescript errors (307)
    'typescript/no-unnecessary-type-arguments': 'warn', // typescript errors (5)
    'typescript/no-unnecessary-type-assertion': 'warn', // typescript errors (39)
    'typescript/no-unnecessary-type-conversion': 'warn', // typescript errors (15)
    'typescript/no-unnecessary-type-parameters': 'warn', // typescript errors (32)
    'typescript/no-unsafe-argument': 'off',
    'typescript/no-unsafe-assignment': 'warn', // typescript errors (2233)
    'typescript/no-unsafe-call': 'warn', // typescript errors (332)
    'typescript/no-unsafe-member-access': 'warn', // typescript errors (2353)
    'typescript/no-unsafe-return': 'warn', // typescript errors (41)
    'typescript/no-unsafe-type-assertion': 'warn', // typescript errors (207)
    'typescript/no-useless-default-assignment': 'off',
    'typescript/parameter-properties': 'warn', // typescript errors (1)
    'typescript/prefer-nullish-coalescing': ['off', { ignoreBooleanCoercion: true }],
    'typescript/prefer-optional-chain': 'warn', // typescript errors (1)
    'typescript/prefer-reduce-type-parameter': 'warn', // typescript errors (2)
    'typescript/prefer-regexp-exec': 'warn', // typescript errors (1)
    'typescript/promise-function-async': 'off',
    'typescript/require-await': 'warn', // typescript errors (10)
    'typescript/strict-boolean-expressions': 'off',
    'typescript/strict-void-return': 'off',
    'typescript/unbound-method': 'warn', // typescript errors (2)
    'typescript/unified-signatures': 'warn', // typescript errors (1)

    'unicorn/empty-brace-spaces': 'off',
    'unicorn/import-style': 'warn', // unicorn errors (7)
    'unicorn/no-array-reverse': 'warn', // unicorn errors (2)
    'unicorn/no-array-sort': 'warn', // unicorn errors (6)
    'unicorn/no-await-expression-member': 'warn', // unicorn errors (6)
    'unicorn/no-invalid-remove-event-listener': 'off',
    'unicorn/no-new-array': 'off',
    'unicorn/no-zero-fractions': 'off',
    'unicorn/number-literal-case': 'off',
    'unicorn/numeric-separators-style': 'off',
    'unicorn/prefer-array-some': 'off',
    'unicorn/prefer-code-point': 'off',
    'unicorn/prefer-dom-node-append': 'off',
    'unicorn/prefer-dom-node-remove': 'off',
    'unicorn/prefer-export-from': 'warn', // unicorn errors (89)
    'unicorn/prefer-global-this': 'off',
    'unicorn/prefer-import-meta-properties': 'off',
    'unicorn/prefer-logical-operator-over-ternary': 'off',
    'unicorn/prefer-number-coercion': 'warn', // unicorn errors (21)
    'unicorn/prefer-number-properties': 'warn', // unicorn errors (3)
    'unicorn/prefer-object-from-entries': 'warn', // unicorn errors (14)
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prefer-set-has': 'off',
    'unicorn/prefer-spread': 'warn', // unicorn errors (2)
    'unicorn/prefer-string-replace-all': 'warn', // unicorn errors (35)
    'unicorn/prefer-string-slice': 'off',
    'unicorn/prefer-ternary': 'off',
    'unicorn/prefer-top-level-await': 'warn', // unicorn errors (1)

    'vitest/no-conditional-expect': 'warn', // vitest errors (11)
    'vitest/no-conditional-in-test': 'warn', // vitest errors (36)
    'vitest/padding-around-test-blocks': 'warn', // vitest errors (129)
  },
})
