import config, { mergeConfig } from '@scaleway/oxfmt-config'
import { defineConfig } from 'oxfmt'

export default mergeConfig(
  config,
  defineConfig({
    ...config,
    printWidth: 80,
    sortImports: {
      order: 'asc',
      groups: ['builtin', 'internal', 'external', 'parent', 'sibling', 'type'],
      newlinesBetween: true,
    },
  }),
)
