import 'expect'

declare module 'expect' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Matchers<R extends void | Promise<void>, T = unknown>
    extends jest.Matchers<R, T> {
    toHaveNoViolations(): R
  }
}
