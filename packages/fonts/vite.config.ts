import { defaultConfig } from '@repo/config/vite/vite.config'
import { defineConfig, mergeConfig } from 'vite'

export const config = mergeConfig(defineConfig(defaultConfig), {
  base: './',
  build: {
    assetsInlineLimit: 0,
    cssCodeSplit: true,
    cssMinify: true,
    lib: false,
    rolldownOptions: {
      input: {
        'fonts-cdn': 'src/fonts-cdn.css',
        'fonts-bundled': 'src/fonts-bundled.css',
      },
      output: {
        assetFileNames: '[name][extname]',
      },
    },
    ssr: false,
  },
})

export default config
