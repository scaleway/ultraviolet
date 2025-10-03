import { resolve } from 'path'
import svgr from '@svgr/rollup'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json', '.css'],
    // alias is needed or Vite will not resolve the packages correctly with storybook
    alias: {
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
  },
  assetsInclude: ['**/*.md'],
  build: {
    outDir: 'build',
    reportCompressedSize: true,
  },
  optimizeDeps: {
    exclude: ['@ultraviolet/*'],
    include: [
      '@vanilla-extract/css-utils',
      '@vanilla-extract/css',
      '@vanilla-extract/css/fileScope',
      '@vanilla-extract/dynamic',
      '@vanilla-extract/recipes',
      '@vanilla-extract/recipes/createRuntimeFn',
      '@vanilla-extract/sprinkles',
      '@vanilla-extract/sprinkles/createRuntimeSprinkles',
    ]
  },
  plugins: [
    svgr({ memo: true, svgo: false }),
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    vanillaExtractPlugin({})
  ],
})
