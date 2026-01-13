import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useIsOverflowing } from '../useIsOverflowing'

describe('useIsOverflowing', () => {
  it('should be false with no overflow', async () => {
    const { result } = renderHook(() =>
      useIsOverflowing({ current: document.createElement('div') }),
    )
    await waitFor(() => {
      expect(result.current).toBeFalsy()
    })
  })

  it('should be false with no overflow and callback at false too', async () => {
    const callback = vi.fn()
    const { result } = renderHook(() =>
      useIsOverflowing({ current: document.createElement('div') }, callback),
    )
    await waitFor(() => {
      expect(result.current).toBeFalsy()
    })

    expect(callback).toHaveBeenCalledOnce()
  })

  it('should be true with overflow', async () => {
    const element = document.createElement('div')

    const { result } = renderHook(() =>
      useIsOverflowing({
        current: {
          ...element,
          clientWidth: 100,
          scrollWidth: 200,
        },
      }),
    )

    await waitFor(() => {
      expect(result.current).toBeTruthy()
    })
  })

  it('should be true with overflow and callback at true too', async () => {
    const callback = vi.fn()
    const element = document.createElement('div')

    const { result } = renderHook(() =>
      useIsOverflowing(
        {
          current: {
            ...element,
            clientWidth: 100,
            scrollWidth: 200,
          },
        },
        callback,
      ),
    )

    await waitFor(() => {
      expect(result.current).toBeTruthy()
    })

    expect(callback).toHaveBeenCalledWith(true)
    expect(callback).toHaveBeenCalledTimes(2) // 1 for initial render, 1 for overflow
  })

  it('should cleanup event listener', () => {
    const { unmount } = renderHook(() =>
      useIsOverflowing({ current: document.createElement('div') }),
    )

    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    )
    removeEventListenerSpy.mockRestore()
  })

  it('should handle undefined ref', async () => {
    const { result } = renderHook(() =>
      useIsOverflowing({ current: undefined }),
    )

    await waitFor(() => {
      expect(result.current).toBeFalsy()
    })
  })
})
