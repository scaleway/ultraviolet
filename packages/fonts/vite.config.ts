import path from 'node:path'
import { defineConfig, mergeConfig } from 'vite'

export const config = mergeConfig(
  {},
  defineConfig({
    build: {
      rolldownOptions: {
        input: path.resolve(__dirname, 'src/fonts.css'),
        output: {
          assetFileNames: '[name][extname]',
          dir: path.resolve(__dirname, 'dist'),
        },
      },
    },
  }),
)

export default config
