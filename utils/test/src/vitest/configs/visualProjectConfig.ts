import type { ViteUserConfig } from 'vitest/config'
import { browserProjectShared } from './browserShared.ts'

/*
 * Visual regression project: real chromium only, screenshot references are
 * committed under `__screenshots__/` next to each `visual.test.tsx` file
 * (`<name>-chromium-<platform>.png`, so every OS keeps its own reference).
 * The first run without a reference writes it and fails on purpose: review
 * the PNG, then run again. `CI=true` never writes references, it only
 * compares — mismatch/actual/diff images land in the ignored `.vitest/`
 * directory. Update references with `vitest --run --project visual --update`.
 */
export const visualProjectConfig = {
  optimizeDeps: browserProjectShared.optimizeDeps,
  test: {
    tags: [
      {
        name: 'visual',
        description: 'Screenshot tests compared against committed references.',
      },
    ],
    globals: true,
    browser: {
      headless: true,
      enabled: true,
      provider: browserProjectShared.provider,
      instances: [
        {
          browser: 'chromium',
        },
      ],
    },
    include: ['src/**/__tests__/visual.test.tsx'],
    exclude: browserProjectShared.exclude,
    testTimeout: 30_000,
    outputFile: {
      junit: '.reports/tests-visual.xml',
    },
  },
} satisfies ViteUserConfig
