import { renderHook } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { usePrefersReducedMotion } from '../usePrefersReducedMotion'

describe(usePrefersReducedMotion, () => {
  beforeAll(() => {
    if (!window.matchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        value: vi.fn(),
        writable: true,
      })
    }
  })
  it('should return true when prefers-reduced-motion is enabled', () => {
    // oxlint-disable-next-line vitest/prefer-spy-on -- jsdom doesn't implement matchMedia
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList)

    const { result } = renderHook(() => usePrefersReducedMotion())

    expect(result.current).toBe(true)
  })

  it('should return false when prefers-reduced-motion is disabled', () => {
    // oxlint-disable-next-line vitest/prefer-spy-on -- jsdom doesn't implement matchMedia
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList)

    const { result } = renderHook(() => usePrefersReducedMotion())

    expect(result.current).toBe(false)
  })

  it('should cleanup event listener on unmount', () => {
    const mockRemoveListener = vi.fn()

    // oxlint-disable-next-line vitest/prefer-spy-on -- jsdom doesn't implement matchMedia
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: mockRemoveListener,
    } as unknown as MediaQueryList)

    const { unmount } = renderHook(() => usePrefersReducedMotion())

    unmount()

    expect(mockRemoveListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
