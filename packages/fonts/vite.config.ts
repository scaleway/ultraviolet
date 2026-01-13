import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'src/fonts.css'),
      output: {
        assetFileNames: '[name][extname]',
        dir: path.resolve(__dirname, 'dist'),
      },
    },
  },
})
