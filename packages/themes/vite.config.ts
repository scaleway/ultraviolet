import { defaultConfig } from '@repo/config/vite/vite.config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig, mergeConfig } from 'vite'

export const config = mergeConfig(defineConfig(defaultConfig), {
  plugins: [
    vanillaExtractPlugin({ identifiers: ({ hash }) => `uv_theme_${hash}` }),
  ],
})

export default config
