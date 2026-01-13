import type { TestUserConfig, ViteUserConfig } from 'vitest/config'
import { defineConfig, mergeConfig } from 'vitest/config'

export const createVitestConfig = (
  options: TestUserConfig & ViteUserConfig = {},
) =>
  mergeConfig(
    defineConfig({
      test: {
        alias: {
          '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/.vitest/fileMock.js',
          '\\.svg$': '<rootDir>/.vitest/svg.ts',
        },
        allowOnly: false,
        clearMocks: true,
        coverage: {
          exclude: [
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
        environment: 'happy-dom',
        exclude: [
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
        name: 'happy-dom',
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
        testTimeout: 10_000,
        ...options,
      },
    }),
    options,
  )

export default createVitestConfig()
