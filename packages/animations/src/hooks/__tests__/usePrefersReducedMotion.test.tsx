import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { usePrefersReducedMotion } from '../usePrefersReducedMotion'

describe(usePrefersReducedMotion, () => {
  it('should return true when prefers-reduced-motion is enabled', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => usePrefersReducedMotion())

    expect(result.current).toBe(true)
  })

  it('should return false when prefers-reduced-motion is disabled', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => usePrefersReducedMotion())

    expect(result.current).toBe(false)
  })

  it('should cleanup event listener on unmount', () => {
    const mockRemoveListener = vi.fn()

    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: mockRemoveListener,
    })

    const { unmount } = renderHook(() => usePrefersReducedMotion())

    unmount()

    expect(mockRemoveListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
