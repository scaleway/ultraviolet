import { describe, expect, it } from 'vitest'
import { cn } from './generateClassname'

describe('generateClassname', () => {
  it('should combine multiple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should handle undefined values', () => {
    expect(cn('foo', undefined, 'bar')).toBe('foo bar')
  })

  it('should handle empty strings', () => {
    expect(cn('foo', '', 'bar')).toBe('foo bar')
  })

  it('should handle multiple falsy values', () => {
    expect(cn('foo', undefined, '', 'bar')).toBe('foo bar')
  })

  it('should return empty string for no arguments', () => {
    expect(cn()).toBe('')
  })

  it('should return empty string for undefined, null, empty string', () => {
    expect(cn('', null, undefined)).toBe('')
  })

  it('should handle mixed truthy and falsy values', () => {
    expect(cn('foo', undefined, 'bar', '', 'baz')).toBe('foo bar baz')
  })
})
