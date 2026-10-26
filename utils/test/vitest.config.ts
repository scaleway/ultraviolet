import { playwright } from '@vitest/browser-playwright'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import type { TestUserConfig, ViteUserConfig } from 'vitest/config'

// Options shared by every jsdom unit project (and by `createVitestConfig`,
// used by packages without browser tests).
const unitTestOptions = {
  tags: [
    {
      name: 'a11y',
      description: 'Tests written for accessility.',
    },
  ],
  alias: {
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.vitest/fileMock.js',
    '\\.svg$': '<rootDir>/.vitest/svg.ts',
  },
  allowOnly: false,
  clearMocks: true,
  pool: 'forks',
  css: {
    modules: {
      classNameStrategy: 'non-scoped',
    },
  },
  deps: {
    optimizer: {
      web: {
        enabled: true,
        include: ['@nivo/*'],
      },
    },
  },
  environment: 'jsdom',
  // Node resolves its locale at process start: vitest injects `env` when
  // spawning the worker processes, so pinning it here keeps dates and Intl
  // output deterministic in every package, without per-script env prefixes.
  env: {
    LC_ALL: 'en_US.UTF-8',
    TZ: 'UTC',
  },
  exclude: [
    ...configDefaults.exclude,
    // Accessibility tests only run in the browser project, see below
    '**/__tests__/a11y.test.tsx',
    '**/node_modules/**',
    '**/{dist,build}/**',
    '**/__stories__/**',
    '**.stories.*',
    '**/coverages/**',
    '**/.{idea,git,cache,output,temp,reports,jest}/**',
  ],
  globals: true,
  logHeapUsage: true,
  mockReset: true,
  restoreMocks: true,
  server: {
    deps: {
      inline: true,
    },
  },
  testTimeout: 25_000,
} satisfies TestUserConfig

// Wrapper packages that internally import @vanilla-extract/css must be
// excluded from the browser dep optimizer: their pre-bundled copies embed a
// second css instance whose fileScope is never set by the transform-mode
// plugin. @vanilla-extract/css itself must stay optimized (CJS interop for
// picocolors), and shares its fileScope chunk with the plugin injection.
const browserProjectConfig = {
  optimizeDeps: {
    exclude: ['@vanilla-extract/recipes', '@vanilla-extract/sprinkles'],
    // The fileScope imports are injected by the plugin at transform time, so
    // the scanner cannot discover them upfront: bundle them at server start
    // instead of mid-run, which reloads the page and fails cold test runs.
    include: ['@vanilla-extract/css', '@vanilla-extract/css/fileScope'],
  },
  test: {
    tags: [
      {
        name: 'a11y',
        description: 'Tests written for accessility.',
      },
    ],
    globals: true,
    // Accessibility tests runs in a real browser so axe can check rules
    // that need a layout engine, e.g. color-contrast.
    browser: {
      enabled: true,
      provider: playwright({
        contextOptions: {
          locale: 'en-US',
          timezoneId: 'UTC',
        },
      }),
      instances: [
        {
          browser: 'chromium',
        },
        {
          browser: 'firefox',
        },
        {
          browser: 'webkit',
        },
      ],
    },
    include: ['src/**/__tests__/a11y.test.tsx', 'src/**/__tests__/browser-environment.test.tsx'],
    exclude: [
      ...configDefaults.exclude,
      '**/node_modules/**',
      '**/{dist,build}/**',
      '**/__stories__/**',
      '**.stories.*',
    ],
    testTimeout: 30_000,
  },
} satisfies ViteUserConfig

// Root-only options: they apply to the whole test run, not to a single project.
const globalTestOptions = {
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
  outputFile: {
    junit: '.reports/tests.xml',
  },
  reporters: ['default', 'junit'],
} satisfies TestUserConfig

export const createVitestConfig = (options: TestUserConfig & ViteUserConfig = {}) =>
  mergeConfig(
    // `defineConfig` returns an intersection of all its overloads, which vite's `mergeConfig` rejects
    defineConfig({
      test: {
        ...globalTestOptions,
        ...unitTestOptions,
      },
    }) as ViteUserConfig,
    options,
  )

export const createVitestProjectsConfig = (
  options: ViteUserConfig & {
    unit?: TestUserConfig
    browser?: TestUserConfig
  } = {},
) => {
  const { unit, browser, ...viteOptions } = options

  return defineConfig({
    test: {
      ...globalTestOptions,
      projects: [
        mergeConfig({ test: unitTestOptions }, { ...viteOptions, test: unit }),
        mergeConfig(browserProjectConfig, { ...viteOptions, test: browser }),
      ],
    },
  })
}

export default createVitestConfig()
