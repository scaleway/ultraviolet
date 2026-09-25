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
    'eslint/curly': ['warn', 'all'], // eslint errors (16)
    'eslint/max-lines': ['warn', { max: 500 }], // eslint errors (8)
    'eslint/max-nested-callbacks': ['warn', { max: 4 }], // base sets error (max: 4); keep warn
    'eslint/max-params': 'warn', // eslint errors (33)
    'eslint/no-await-in-loop': 'warn', // eslint errors (12)
    'eslint/no-empty-function': 'warn', // eslint errors (408)
    'eslint/no-implicit-coercion': 'warn', // eslint errors (113)
    'eslint/object-shorthand': 'warn', // eslint errors (15)
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
    'react/immutability': 'warn', // react errors (5)
    'react/memo-dependencies': 'warn', // react errors (4)
    'react/no-array-index-key': 'warn', // react errors (6)
    'react/no-deriving-state-in-effects': 'warn', // react errors (7)
    'react/refs': 'warn', // react errors (44)
    'react/set-state-in-effect': 'warn', // react errors (34)

    'typescript/consistent-return': 'warn', // typescript errors (8)
    'typescript/explicit-member-accessibility': 'warn', // typescript errors (10)
    'typescript/no-deprecated': 'warn', // typescript errors (594)
    'typescript/no-misused-spread': 'warn', // typescript errors (7)
    'typescript/no-non-null-assertion': 'warn', // typescript errors (29)
    'typescript/no-redundant-type-constituents': 'warn', // typescript errors (68)
    'typescript/no-unnecessary-condition': 'warn', // typescript errors (307)
    'typescript/no-unnecessary-type-arguments': 'warn', // typescript errors (5)
    'typescript/no-unnecessary-type-assertion': 'warn', // typescript errors (39)
    'typescript/no-unnecessary-type-conversion': 'warn', // typescript errors (15)
    'typescript/no-unnecessary-type-parameters': 'warn', // typescript errors (32)
    'typescript/no-unsafe-assignment': 'warn', // typescript errors (2233)
    'typescript/no-unsafe-call': 'warn', // typescript errors (332)
    'typescript/no-unsafe-member-access': 'warn', // typescript errors (2353)
    'typescript/no-unsafe-return': 'warn', // typescript errors (41)
    'typescript/no-unsafe-type-assertion': 'warn', // typescript errors (207)
    'typescript/require-await': 'warn', // typescript errors (10)
    'typescript/unbound-method': 'warn', // typescript errors (2)

    'unicorn/import-style': 'warn', // unicorn errors (7)

    'unicorn/no-array-sort': 'warn', // unicorn errors (6)
    'unicorn/no-await-expression-member': 'warn', // unicorn errors (6)
    'unicorn/prefer-export-from': ['warn', { checkUsedVariables: false }], // unicorn errors (79)
    'unicorn/prefer-number-coercion': 'warn', // unicorn errors (21)
    'unicorn/prefer-number-properties': 'warn', // unicorn errors (3)
    'unicorn/prefer-object-from-entries': 'warn', // unicorn errors (14)
    'unicorn/prefer-string-replace-all': 'warn', // unicorn errors (35)
    // 'unicorn/prefer-top-level-await': 'warn', // unicorn errors (1)

    'vitest/no-conditional-expect': 'warn', // vitest errors (11)
    'vitest/no-conditional-in-test': 'warn', // vitest errors (36)
    'vitest/padding-around-test-blocks': 'warn', // vitest errors (129)
  },
})
