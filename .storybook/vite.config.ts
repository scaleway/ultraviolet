import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@svgr/rollup'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.md'],
  build: {
    outDir: 'build',
    reportCompressedSize: true,
  },
  /*resolve: {
    // reduce the default list to avoid vite to make too may checks to resolve file path when file extension is not included
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'],
  },*/
  optimizeDeps: {
    exclude: ['@ultraviolet/*'],
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
  ],
})
