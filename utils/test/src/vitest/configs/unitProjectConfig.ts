import { configDefaults } from 'vitest/config'
import type { ViteUserConfig } from 'vitest/config'

// Options shared by every jsdom unit project, same shape as
// `browserProjectConfig`.
export const unitProjectConfig = {
  test: {
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
        ssr: {
          enabled: true,
          include: ['@nivo/*'],
        },
      },
    },
    environment: 'jsdom',
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
    outputFile: {
      junit: '.reports/tests-unit.xml',
    },
  },
} satisfies ViteUserConfig
