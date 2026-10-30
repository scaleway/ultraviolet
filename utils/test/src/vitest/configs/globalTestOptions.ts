import { configDefaults } from 'vitest/config'
import type { TestUserConfig } from 'vitest/config'

// Root-only options: they apply to the whole test run, not to a single project.
export const globalTestOptions = {
  // Non-hidden (`.vitest/` would be skipped by CI's upload-artifact globber)
  // and already gitignored; projects inherit this location for the
  // screenshot references, actuals and diffs they write on failure.
  attachmentsDir: 'test-results/attachments',
  coverage: {
    exclude: [
      ...(configDefaults.coverage.exclude ?? []),
      '.reports/**',
      '**/.eslintrc.*',
      '**/*.d.ts',
      'build',
      'dist',
      'node_modules',
      '**/{webpack,vite,vitest}.config.*',
      '**.snap',
      '**/__stories__/**',
      '**.svg',
    ],
    provider: 'istanbul',
    reporter: ['text', 'json', 'cobertura', 'html', 'json-summary'],
  },
  reporters: ['default', 'junit'],
} satisfies TestUserConfig
