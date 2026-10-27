import 'vitest-axe/extend-expect'
import '@testing-library/jest-dom/vitest'

declare module 'vitest' {
  interface Assertion<T = any> {
    toBeVisuallyHidden(): void
    toHaveNoViolations(): void
  }
}
