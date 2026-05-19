import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { usePrefersReducedMotion } from '../usePrefersReducedMotion'

describe(usePrefersReducedMotion, () => {
  it('should return true when prefers-reduced-motion is enabled', () => {
    // oxlint-disable-next-line vitest/prefer-spy-on
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => usePrefersReducedMotion())

    expect(result.current).toBe(true)
  })

  it('should return false when prefers-reduced-motion is disabled', () => {
    // oxlint-disable-next-line vitest/prefer-spy-on
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => usePrefersReducedMotion())

    expect(result.current).toBe(false)
  })

  it('should cleanup event listener on unmount', () => {
    const mockRemoveListener = vi.fn()

    // oxlint-disable-next-line vitest/prefer-spy-on
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: mockRemoveListener,
    })

    const { unmount } = renderHook(() => usePrefersReducedMotion())

    unmount()

    expect(mockRemoveListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
