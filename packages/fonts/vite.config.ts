import { defaultConfig } from '@repo/config/vite/vite.config'
import { defineConfig, mergeConfig } from 'vite'

export const config = mergeConfig(defineConfig(defaultConfig), {
  base: './',
  build: {
    cssCodeSplit: true,
    rolldownOptions: {
      input: {
        'fonts-cdn': 'src/fonts-cdn.css',
        'fonts-bundled': 'src/fonts-bundled.css',
      },
      output: {
        assetFileNames: '[name][extname]',
      },
    },
  },
})

export default config
