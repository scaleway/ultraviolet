import { getThemeInitScript } from '@ultraviolet/themes/v2'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'

// Inlines the theme init script as the first element of `<head>`, before any
// stylesheet, so the theme class is applied before the first paint. The script
// runs as a classic script: no `type="module"`, hence synchronous during HTML
// parsing, in both dev and build.
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
