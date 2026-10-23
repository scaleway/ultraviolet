import { describe, expect, it } from 'vitest'

describe('browser test environment', () => {
  it('should run in the UTC timezone', () => {
    expect(new Intl.DateTimeFormat().resolvedOptions().timeZone).toBe('UTC')
    expect(new Date().getTimezoneOffset()).toBe(0)
  })

  it('should run with the en-US locale', () => {
    expect(navigator.language).toBe('en-US')
  })
})
