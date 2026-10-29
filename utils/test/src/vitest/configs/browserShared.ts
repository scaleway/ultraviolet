import { playwright } from '@vitest/browser-playwright'
import { configDefaults } from 'vitest/config'

// Options shared by every real-browser project (`browser`, `visual`), so that
// screenshot references stay comparable between them.
export const browserProjectShared = {
  optimizeDeps: {
    exclude: [
      '@vanilla-extract/recipes',
      '@vanilla-extract/sprinkles',
      // Virtual modules of the browser tester: the optimizer would freeze
      // them outside the runner and break `vitest/browser` imports.
      '@vitest/browser/client',
      '@vitest/browser/context',
      '@vitest/browser/locators',
      '@vitest/browser/utils',
      'vitest/browser',
    ],
    include: ['@vanilla-extract/css', '@vanilla-extract/css/fileScope', '@vitest/coverage-istanbul'],
  },
  provider: playwright({
    contextOptions: {
      locale: 'en-US',
      timezoneId: 'UTC',
      reducedMotion: 'reduce',
    },
  }),
  exclude: [...configDefaults.exclude, '**/node_modules/**', '**/{dist,build}/**', '**/__stories__/**', '**.stories.*'],
}
