import 'expect'

declare module 'expect' {
  type Matchers<R extends void | Promise<void>, T = unknown> = {
    toHaveNoViolations(): R
  } & jest.Matchers<R, T>
}
