import react from '@vitejs/plugin-react'
import { readPackage } from 'read-pkg'
import preserveDirectives from 'rollup-preserve-directives'
import type { UserConfig } from 'vite'

const pkg = await readPackage()

const externalPkgs = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.optionalDependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
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

export const defaultConfig: UserConfig = {
  build: {
    cssCodeSplit: false,
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
      experimental: {
        // lazyBarrel: true,
        // strictExecutionOrder: true,
      },
      external,
      makeAbsoluteExternalsRelative: true,
      optimization: {
        inlineConst: {
          mode: 'smart',
        },
        pifeForModuleWrappers: false,
      },
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        keepNames: true,
        legalComments: 'none',
        minify: false,
        minifyInternalExports: false,
        strictExecutionOrder: false,
        topLevelVar: false,
      },
      platform: 'browser',
      preserveEntrySignatures: 'exports-only',
      tsconfig: true,
      treeshake: true,
    },

    ssr: true,
    target: 'es2015',
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    preserveDirectives(),
  ],
}
