import 'vitest-axe/extend-expect'
import type { AxeCore } from 'axe-core'

declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): void
  }
}
