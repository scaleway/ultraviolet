import { defineConfig } from 'oxlint'

/**
 *  Rules downgraded from `error` to `warn` that need to be fixed.
 * Each rule has a comment with the current violation count.
 * When a count reaches 0, restore the rule to `error` (or remove it to inherit from base).
 *
 * @deprecated  This file need to fix and is a temporary files that help us to separate the end config from the rules to fix
 */
export const warnRules = defineConfig({
  rules: {
    'eslint/max-params': 'warn', // eslint errors (33)
    'eslint/no-await-in-loop': 'warn', // eslint errors (12)
    'eslint/no-shadow': 'warn', // eslint errors (7)
    'eslint/prefer-destructuring': 'warn', // eslint errors (31)
    'eslint/prefer-named-capture-group': 'warn', // eslint errors (18)
    'eslint/require-unicode-regexp': ['warn', { requireFlag: 'v' }], // eslint errors (129)

    'import/namespace': 'warn', // import errors (7)
    'import/no-namespace': 'warn', // import errors (76)

    // fix jsx-a11y after a11y audit
    'jsx-a11y/no-noninteractive-element-interactions': 'warn', // jsx-a11y errors (1)
    'jsx-a11y/no-noninteractive-tabindex': 'warn', // jsx-a11y errors (1)
    'jsx-a11y/no-static-element-interactions': 'warn', // jsx-a11y errors (6)
    'jsx-a11y/prefer-tag-over-role': 'warn', // jsx-a11y errors (18)

    'oxc/no-accumulating-spread': 'warn', // oxc errors (26)
    'oxc/no-barrel-file': 'warn', // oxc errors (6)

    'react/exhaustive-effect-dependencies': 'warn', // react errors (30)
    'react/hook-use-state': ['warn', { allowDestructuredState: true }], // react errors (74)
    'react/memo-dependencies': 'warn', // react errors (4)
    'react/no-array-index-key': 'warn', // react errors (6)
    'react/no-deriving-state-in-effects': 'warn', // react errors (7)
    'react/refs': 'warn', // react errors (44)
    'react/set-state-in-effect': 'warn', // react errors (34)

    'typescript/consistent-return': 'warn', // typescript errors (8)
    'typescript/dot-notation': 'warn', // typescript errors (4)
    'typescript/explicit-member-accessibility': 'warn', // typescript errors (10)
    'typescript/no-non-null-assertion': 'warn', // typescript errors (29)
    'typescript/no-unnecessary-condition': 'warn', // typescript errors (307)
    'typescript/no-unnecessary-type-arguments': 'warn', // typescript errors (5)
    'typescript/no-unnecessary-type-assertion': 'warn', // typescript errors (39)
    'typescript/no-unnecessary-type-conversion': 'warn', // typescript errors (15)
    'typescript/no-unsafe-argument': 'warn', // typescript errors (2)
    'typescript/no-unsafe-type-assertion': 'warn', // typescript errors (207)
    'typescript/promise-function-async': 'warn', // typescript errors (7)
    'typescript/require-await': 'warn', // typescript errors (10)
    'typescript/strict-void-return': 'warn', // typescript errors (118)

    'unicorn/import-style': 'warn', // unicorn errors (7)

    'unicorn/no-await-expression-member': 'warn', // unicorn errors (6)
    'unicorn/no-zero-fractions': 'warn', // unicorn errors (60)
    'unicorn/numeric-separators-style': 'warn', // unicorn errors (10)
    'unicorn/prefer-array-some': 'warn', // unicorn errors (2)
    'unicorn/prefer-code-point': 'warn', // unicorn errors (2)
    'unicorn/prefer-dom-node-append': 'warn', // unicorn errors (7)
    'unicorn/prefer-dom-node-remove': 'warn', // unicorn errors (1)
    'unicorn/prefer-export-from': ['warn', { checkUsedVariables: false }], // unicorn errors (79)
    'unicorn/prefer-global-this': 'warn', // unicorn errors (7)
    'unicorn/prefer-import-meta-properties': 'warn', // unicorn errors (2)
    'unicorn/prefer-logical-operator-over-ternary': 'warn', // unicorn errors (2)
    'unicorn/prefer-number-coercion': 'warn', // unicorn errors (21)
    'unicorn/prefer-object-from-entries': 'warn', // unicorn errors (14)
    'unicorn/prefer-query-selector': 'warn', // unicorn errors (8)
    'unicorn/prefer-set-has': 'warn', // unicorn errors (2)
    'unicorn/prefer-string-slice': 'warn', // unicorn errors (1)
    'unicorn/prefer-ternary': 'warn', // unicorn errors (1)
  },
})
