import react from '@vitejs/plugin-react'
import browserslist from 'browserslist'
import { readPackage } from 'read-pkg'
import preserveDirectives from 'rollup-preserve-directives'
import { defineConfig } from 'vite'
import type { ViteUserConfig } from 'vitest/config'

const pkg = await readPackage()

const externalPkgs = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.optionalDependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

const external = (id: string) => {
  if (id.endsWith('.css') || id.endsWith('.png')) {
    return false
  }

  const match = (dependency: string) => new RegExp(`^${dependency}`).test(id)
  const isExternal = externalPkgs.some(dep => match(dep))
  // alias of bundledDependencies package.json field array
  const isBundled = pkg.bundleDependencies?.some(match)

  return isExternal && !isBundled
}

/**
const targetsBrowserlist = browserslist(
  '> 0.5%, last 2 versions, Firefox ESR, not dead, last 3 years',
  {
    ignoreUnknownVersions: false,
  },
)
**/

export const defaultConfig: ViteUserConfig = {
  build: {
    emitAssets: true,
    emptyOutDir: true,
    lib: {
      entry: 'src/index.ts',
      fileName: (format, filename) => {
        if (format === 'es') {
          return `${filename}.js`
        }

        return `${filename}.${format}`
      },
      formats: ['es'],
      name: pkg.name,
    },
    license: true,
    minify: false,
    outDir: 'dist',
    rolldownOptions: {
      external,
      makeAbsoluteExternalsRelative: true,
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      treeshake: true,
      // preserveEntrySignatures: "exports-only",
    },
    ssr: true,
    // target: targetsBrowserlist,
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    preserveDirectives(),
  ],
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
    css: true,
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
    name: 'browser-jsdom',
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
    testTimeout: 10000,
  },
}

export default defineConfig(defaultConfig)
