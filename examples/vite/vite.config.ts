import { getThemeInitScript } from '@ultraviolet/themes/v2'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'

const themeInitScriptPlugin = (): Plugin => ({
  name: 'theme-init-script',
  transformIndexHtml: () => [
    {
      tag: 'script',
      attrs: { id: 'theme-init' },
      children: getThemeInitScript({ storageKey: 'vite-theme-preference' }),
      injectTo: 'head-prepend',
    },
  ],
})

export default defineConfig({
  plugins: [themeInitScriptPlugin(), react()],
})
