import { resolve } from 'node:path'
import svgr from '@svgr/rollup'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const { log: logger } = console

// https://vitejs.dev/config/
export default defineConfig(env => {
  logger(env)

  return {
    assetsInclude: ['**/*.md'],
    build: {
      outDir: 'build',
      reportCompressedSize: true,
    },
    optimizeDeps: {
      exclude: ['@ultraviolet/*'],
    },
    plugins: [
      svgr({ memo: true, svgo: false }),
      react({
        jsxRuntime: 'automatic',
      }),
      vanillaExtractPlugin({}),
    ],
    resolve: {
      // alias is needed or Vite will not resolve the packages correctly with storybook
      // Order matters: more specific patterns must come before less specific ones
      alias: [
        // Themes
        {
          find: '@ultraviolet/themes',
          replacement: resolve('packages/themes/src'),
        },

        // Icons - specific icon files (must come before base aliases)
        {
          find: /^@ultraviolet\/icons\/([A-Z][a-zA-Z]+Icon)$/,
          replacement: resolve(
            'packages/icons/src/components/Icon/__generated__/$1.tsx',
          ),
        },
        {
          find: /^@ultraviolet\/icons\/product\/([A-Z][a-zA-Z]+ProductIcon)$/,
          replacement: resolve(
            'packages/icons/src/components/ProductIcon/__generated__/$1.tsx',
          ),
        },
        {
          find: /^@ultraviolet\/icons\/logo\/([A-Z][a-zA-Z]+Logo)$/,
          replacement: resolve(
            'packages/icons/src/components/Logo/__generated__/$1.tsx',
          ),
        },
        {
          find: /^@ultraviolet\/icons\/category\/([A-Z][a-zA-Z]+CategoryIcon)$/,
          replacement: resolve(
            'packages/icons/src/components/CategoryIcon/__generated__/$1.tsx',
          ),
        },
        {
          find: /^@ultraviolet\/icons\/flags\/([A-Z][a-zA-Z]+Flag)$/,
          replacement: resolve(
            'packages/icons/src/components/Flags/__generated__/$1.tsx',
          ),
        },

        // Icons - special files
        {
          find: '@ultraviolet/icons/iconStyles',
          replacement: resolve('packages/icons/src/iconStyles.ts'),
        },

        // Icons - category index files (must come before base alias)
        {
          find: '@ultraviolet/icons/product',
          replacement: resolve(
            'packages/icons/src/components/ProductIcon/index.ts',
          ),
        },
        {
          find: '@ultraviolet/icons/logo',
          replacement: resolve('packages/icons/src/components/Logo/index.ts'),
        },
        {
          find: '@ultraviolet/icons/category',
          replacement: resolve(
            'packages/icons/src/components/CategoryIcon/index.ts',
          ),
        },
        {
          find: '@ultraviolet/icons/flags',
          replacement: resolve('packages/icons/src/components/Flags/index.ts'),
        },

        // Icons - base alias (must come last)
        {
          find: '@ultraviolet/icons',
          replacement: resolve('packages/icons/src'),
        },

        // Illustrations
        {
          find: '@ultraviolet/illustrations/various',
          replacement: resolve('packages/illustrations/src/assets/various'),
        },
        {
          find: '@ultraviolet/illustrations/products',
          replacement: resolve('packages/illustrations/src/assets/products'),
        },
        {
          find: '@ultraviolet/illustrations',
          replacement: resolve('packages/illustrations/src/components'),
        },

        // UI - compositions (must come before base alias)
        {
          find: /^@ultraviolet\/ui\/compositions\/(.*)/,
          replacement: resolve('packages/ui/src/components/compositions/$1'),
        },
        {
          find: '@ultraviolet/ui/compositions',
          replacement: resolve('packages/ui/src/components/compositions'),
        },

        // UI - base alias
        {
          find: '@ultraviolet/ui',
          replacement: resolve('packages/ui/src'),
        },

        // Form - compositions (must come before base alias)
        {
          find: /^@ultraviolet\/form\/compositions\/(.*)/,
          replacement: resolve(
            'packages/form/src/components/compositions/$1.tsx',
          ),
        },
        {
          find: '@ultraviolet/form/compositions',
          replacement: resolve('packages/form/src/components/compositions'),
        },

        // Form - base alias
        {
          find: '@ultraviolet/form',
          replacement: resolve('packages/form/src'),
        },

        // Plus
        {
          find: '@ultraviolet/plus',
          replacement: resolve('packages/plus/src'),
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.tsx', '.json', '.css'],
    },
  }
})
