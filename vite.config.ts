import react from '@vitejs/plugin-react'
import browserslist from 'browserslist'
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist'
import { readPackage } from 'read-pkg'
import { type UserConfig, defineConfig } from 'vite'

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
  const isBundled = pkg.bundleDependencies?.some(match) // alias of bundledDependencies package.json field array

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

export const defaultConfig: UserConfig = {
  build: {
    outDir: 'dist',
    target: [...targets],
    minify: false,
    lib: {
      name: pkg.name,
      entry: 'src/index.ts',
      formats: ['es'],
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
  ],
}

export default defineConfig(defaultConfig)
