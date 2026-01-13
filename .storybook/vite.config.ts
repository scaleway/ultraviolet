import { resolve } from 'node:path'
import svgr from '@svgr/rollup'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.md'],
  build: {
    outDir: 'build',
    reportCompressedSize: true,
  },
  optimizeDeps: {
    exclude: ['@ultraviolet/*'],
  },
  plugins: [
    svgr({ memo: true, svgo: false }),
    react({
      jsxRuntime: 'automatic',
    }),
    vanillaExtractPlugin({}),
  ],
  resolve: {
    // alias is needed or Vite will not resolve the packages correctly with storybook
    alias: {
      '@ultraviolet/ui/compositions': resolve(
        'packages/ui/src/components/compositions',
      ),
      '@ultraviolet/ui': resolve('packages/ui/src'),
      '@ultraviolet/themes': resolve('packages/themes/src'),
      '@ultraviolet/plus': resolve('packages/plus/src'),
      '@ultraviolet/illustrations/various': resolve(
        'packages/illustrations/src/assets/various',
      ),
      '@ultraviolet/illustrations/products': resolve(
        'packages/illustrations/src/assets/products',
      ),
      '@ultraviolet/illustrations': resolve(
        'packages/illustrations/src/components',
      ),
      '@ultraviolet/form': resolve('packages/form/src'),
      '@ultraviolet/fonts': resolve('packages/fonts/src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json', '.css'],
  },
})
