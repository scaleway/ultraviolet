import 'vitest-axe/extend-expect'

declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): void
  }
}
