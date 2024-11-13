import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'src/fonts.css'),
      output: {
        dir: path.resolve(__dirname, 'dist'),
        assetFileNames: '[name][extname]',
      },
    },
  },
})
