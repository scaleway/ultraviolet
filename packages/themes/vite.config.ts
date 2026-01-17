import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig, mergeConfig } from 'vite'
import { defaultConfig } from '../../vite.config'

export default mergeConfig(defineConfig(defaultConfig), {
  plugins: [
    vanillaExtractPlugin({ identifiers: ({ hash }) => `theme_${hash}` }),
  ],
})
