import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'

import type { TestUserConfig, ViteUserConfig, Plugin } from 'vitest/config'

/**
 * @deprecated https://github.com/vitest-dev/vitest/issues/9935
 */
export const coveragePluginIssue = function fixIstanbulBabelInterop(): Plugin {
  return {
    name: 'fix-istanbul-babel-interop',
    transform(code, id) {
      if (!id.includes('coverage-istanbul/dist/provider')) {
        return null
      }
      // Replace the default import with a namespace import so Vite's SSR
      // transform doesn't wrap it in .default (which loses CJS exports)
      return code.replace(
        "import require$$0$3 from '@babel/core';",
        () => "import * as require$$0$3 from '@babel/core';",
      )
    },
  }
}

const defaultConfig = defineConfig({
  plugins: [coveragePluginIssue()],
  test: {
    experimental: {
      fsModuleCache: true,
    },
    alias: {
      '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/.vitest/fileMock.js',
      '\\.svg$': '<rootDir>/.vitest/svg.ts',
    },
    allowOnly: false,
    clearMocks: true,

    pool: 'forks',
    coverage: {
      exclude: [
        ...(configDefaults.coverage.exclude ?? []),
        '.reports/**',
        '**/.eslintrc.*',
        '**/*.d.ts',
        'build',
        'dist',
        'node_modules',
        '**/{webpack,vite,vitest,babel}.config.*',
        '**.snap',
        '**/__stories__/**',
        '**.svg',
      ],
      provider: 'istanbul',
      reporter: ['text', 'json', 'cobertura', 'html', 'json-summary'],
    },
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
    exclude: [
      ...configDefaults.exclude,
      '**/node_modules/**',
      '**/{dist,build}/**',
      '**/__stories__/**',
      '**.stories.*',
      '**/coverages/**',
      '**/__stories__/**',
      '**/.{idea,git,cache,output,temp,reports,jest}/**',
    ],
    globals: true,
    logHeapUsage: true,
    mockReset: true,
    outputFile: {
      junit: '.reports/tests.xml',
    },
    reporters: ['default', 'junit'],
    restoreMocks: true,
    server: {
      deps: {
        inline: true,
      },
    },
    setupFiles: ['vitest-localstorage-mock', 'vitest-canvas-mock'],
    testTimeout: 25_000,
  },
})

export const createVitestConfig = (
  options: TestUserConfig & ViteUserConfig = {},
) => mergeConfig(defaultConfig, options)

export default createVitestConfig()
