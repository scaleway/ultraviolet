import 'expect'

declare module 'expect' {
  interface Matchers<R extends void | Promise<void>, T = unknown>
    extends jest.Matchers<R, T> {
    toHaveNoViolations(): R
  }
}
