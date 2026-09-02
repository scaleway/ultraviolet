/**
 * Check if the code is running in a test environment (jsdom, happy-dom, ...).
 * This is useful to skip animations or delays that would make tests flaky.
 *
 * The detection relies on the `navigator.userAgent` set by test DOMs, so it
 * survives library bundling (unlike `process.env.NODE_ENV` which is inlined at
 * build time).
 */
export const isTestEnvironment =
  typeof navigator !== 'undefined' &&
  /\b(jsdom|happy-dom)\b/i.test(navigator.userAgent)
