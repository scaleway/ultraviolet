import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'src/fonts.css'),
      output: {
        dir: resolve(__dirname, 'dist'),
        assetFileNames: '[name][extname]',
      },
    },
  },
})
