import config from '@scaleway/oxfmt-config'
import { defineConfig } from 'oxfmt'

export default defineConfig({
  ...config,
  printWidth: 80,
  sortImports: {
    order: 'asc',
    groups: ['builtin', 'internal', 'external', 'parent', 'sibling', 'type'],
    newlinesBetween: true,
  },
  ignorePatterns: [
    'CHANGELOG.md',
    '.changeset',
    '**/_generated',
    '**/*.gen.*',
    '**/.next',
    '**/next-env.d.ts',
    '**/.output',
    '**/dist',
    '**/build',
    '**/out',
    '**/.turbo',
    '**/storybook-static',
    '**/.cache',
    '**/public/build',
    '**/.vite',
    '**/coverage',
    '**/.nyc_output',
    '**/*.auto.*',
    '**/graphql-types.*',
    '**/schema.d.ts',
    '**/schema.graphql.d.ts',
    '**/*.d.ts.map',
  ],
})
