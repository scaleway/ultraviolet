import react from '@vitejs/plugin-react'
import browserslist from 'browserslist'
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist'
import { readPackage } from 'read-pkg'
import preserveDirectives from 'rollup-preserve-directives'
import { defineConfig } from 'vite'
import type { ViteUserConfig } from 'vitest/config'

const pkg = await readPackage()

const externalPkgs = [
  '@emotion',
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.optionalDependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

const external = (id: string) => {
  if (id.endsWith('.css') || id.endsWith('.png')) {
    return false
  }

  const match = (dependency: string) => new RegExp(`^${dependency}`).test(id)
  const isExternal = externalPkgs.some(match)
  // alias of bundledDependencies package.json field array
  const isBundled = pkg.bundleDependencies?.some(match)

  return isExternal && !isBundled
}

const targets = resolveToEsbuildTarget(
  browserslist('defaults', {
    ignoreUnknownVersions: false,
  }),
  {
    printUnknownTargets: false,
  },
)

export const defaultConfig: ViteUserConfig = {
  build: {
    outDir: 'dist',
    target: [...targets],
    minify: false,
    ssr: true,
    emptyOutDir: true,
    lib: {
      name: pkg.name,
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format, filename) => {
        if (format === 'es') {
          return `${filename}.js`
        }

        return `${filename}.${format}`
      },
    },
    rollupOptions: {
      preserveSymlinks: true,
      external,
      output: {
        interop: 'compat',
        preserveModules: true,
        preserveModulesRoot: './src',
      },
    },
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    preserveDirectives(),
  ],
  test: {
    name: 'browser-jsdom',
    globals: true,
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
    environment: 'jsdom',
    testTimeout: 10000,
    alias: {
      '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/.vitest/fileMock.js',
      '\\.svg$': '<rootDir>/.vitest/svg.ts',
    },
    setupFiles: ['vitest-localstorage-mock', 'vitest-canvas-mock'],
    server: {
      deps: {
        inline: true,
      },
    },
    deps: {
      optimizer: {
        web: {
          enabled: true,
          include: ['react-select', '@nivo/*'],
        },
      },
    },
    allowOnly: false,
    css: true,
    logHeapUsage: true,
    reporters: ['default', 'junit'],
    outputFile: {
      junit: '.reports/tests.xml',
    },
    exclude: [
      '**/node_modules/**',
      '**/{dist,build}/**',
      '**/__stories__/**',
      '**.stories.*',
      '**/coverages/**',
      '**/__stories__/**',
      '**/.{idea,git,cache,output,temp,reports,jest}/**',
    ],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'cobertura', 'html', 'json-summary'],
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
    },
  },
}

export default defineConfig(defaultConfig)
