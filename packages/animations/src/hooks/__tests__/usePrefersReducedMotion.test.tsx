import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { usePrefersReducedMotion } from '../usePrefersReducedMotion'

describe(usePrefersReducedMotion, () => {
  it('should return true when prefers-reduced-motion is enabled', () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { result } = renderHook(() => usePrefersReducedMotion())

    expect(result.current).toBe(true)
  })

  it('should return false when prefers-reduced-motion is disabled', () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { result } = renderHook(() => usePrefersReducedMotion())

    expect(result.current).toBe(false)
  })

  it('should cleanup event listener on unmount', () => {
    const mockRemoveListener = vi.fn()

    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: mockRemoveListener,
    }))

    const { unmount } = renderHook(() => usePrefersReducedMotion())

    unmount()

    expect(mockRemoveListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    )
  })
})
