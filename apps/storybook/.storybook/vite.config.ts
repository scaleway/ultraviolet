import svgr from '@svgr/rollup'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json', '.css'],
  },
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
    vanillaExtractPlugin({})
  ],
})
