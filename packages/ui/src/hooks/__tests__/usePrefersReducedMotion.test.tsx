import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { usePrefersReducedMotion } from '../usePrefersReducedMotion'

describe(usePrefersReducedMotion, () => {
  it('should return true when prefers-reduced-motion is enabled', () => {
    vi.spyOn(window.matchMedia.prototype, 'matches', 'get').mockReturnValue(
      false,
    )

    const { result } = renderHook(() => usePrefersReducedMotion())

    expect(result.current).toBe(true)
  })

  it('should return false when prefers-reduced-motion is disabled', () => {
    vi.spyOn(window.matchMedia.prototype, 'matches', 'get').mockReturnValue(
      true,
    )

    const { result } = renderHook(() => usePrefersReducedMotion())

    expect(result.current).toBe(false)
  })

  it('should update when prefers-reduced-motion setting changes', () => {
    let eventListener: ((event: MediaQueryListEvent) => void) | null = null

    vi.spyOn(
      window.matchMedia.prototype,
      'addEventListener',
    ).mockImplementation((_event, listener) => {
      eventListener = listener as (event: MediaQueryListEvent) => void
    })

    vi.spyOn(window.matchMedia.prototype, 'matches', 'get')
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)

    const { result } = renderHook(() => usePrefersReducedMotion())

    expect(result.current).toBe(true)

    act(() => {
      eventListener?.({
        matches: true,
      } as MediaQueryListEvent)
    })

    expect(result.current).toBe(false)
  })

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(
      window.matchMedia.prototype,
      'removeEventListener',
    )

    const { unmount } = renderHook(() => usePrefersReducedMotion())

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    )

    removeEventListenerSpy.mockRestore()
  })

  it('should return true on the server (no window)', () => {
    const originalWindow = global.window

    Object.defineProperty(global, 'window', {
      value: undefined,
      writable: true,
    })

    const { result } = renderHook(() => usePrefersReducedMotion())

    expect(result.current).toBe(true)

    Object.defineProperty(global, 'window', {
      value: originalWindow,
      writable: true,
    })
  })
})
