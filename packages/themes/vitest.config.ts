import { defineConfig } from 'vitest/config'

// Standalone config instead of `@utils/test/config`: `@utils/test` depends on
// this package, so importing it here would create a workspace dependency cycle.
export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
    },
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        // Executes the inline <script> elements appended during the tests, the
        // way a browser runs classic scripts in <head>.
        runScripts: 'dangerously',
      },
    },
    name: 'unit',
    outputFile: {
      junit: '.reports/tests-unit.xml',
    },
    reporters: ['default', 'junit'],
  },
})
