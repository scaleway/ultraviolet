import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

import { useClipboard } from './useClipboard'

describe('hooks - useClipboard', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn() },
      writable: true,
      configurable: true,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should copy text to clipboard successfully', async () => {
    const writeTextSpy = vi.fn().mockResolvedValue(undefined)
    navigator.clipboard.writeText = writeTextSpy

    const { result } = renderHook(() => useClipboard('test text'))

    await act(async () => {
      await result.current[1]()
    })
    expect(result.current[0]).toBe(true)

    expect(writeTextSpy).toHaveBeenCalledWith('test text')
  })

  it('should handle clipboard error', async () => {
    const error = new Error('Clipboard error')
    const writeTextSpy = vi.fn().mockRejectedValue(error)
    navigator.clipboard.writeText = writeTextSpy

    const { result } = renderHook(() => useClipboard('test text'))
    await act(async () => {
      await result.current[1]()
    })

    expect(result.current[0]).toBe(false)
    expect(writeTextSpy).toHaveBeenCalledWith('test text')
  })

  it('should call onError callback when clipboard fails', async () => {
    const error = new Error('Clipboard error')
    const writeTextSpy = vi.fn().mockRejectedValue(error)
    navigator.clipboard.writeText = writeTextSpy
    const onErrorSpy = vi.fn()

    const { result } = renderHook(() =>
      useClipboard('test text', { onError: onErrorSpy }),
    )

    await act(async () => {
      await result.current[1]()
    })

    expect(onErrorSpy).toHaveBeenCalledWith(error)
    expect(result.current[0]).toBe(false)
  })

  it('should reset isCopied status after successDuration', async () => {
    const writeTextSpy = vi.fn().mockResolvedValue(undefined)
    navigator.clipboard.writeText = writeTextSpy

    const { result } = renderHook(() =>
      useClipboard('test text', { successDuration: 1000 }),
    )

    await act(async () => {
      await result.current[1]()
    })

    expect(result.current[0]).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1001)
    })

    expect(result.current[0]).toBe(false)
  })

  it('should not reset isCopied status without successDuration', async () => {
    const writeTextSpy = vi.fn().mockResolvedValue(undefined)
    navigator.clipboard.writeText = writeTextSpy

    const { result } = renderHook(() => useClipboard('test text'))

    await act(async () => {
      await result.current[1]()
    })

    expect(result.current[0]).toBe(true)

    vi.advanceTimersByTime(5000)

    expect(result.current[0]).toBe(true)
  })

  it('should clear timeout when component unmounts', async () => {
    const writeTextSpy = vi.fn().mockResolvedValue(undefined)
    navigator.clipboard.writeText = writeTextSpy

    const { unmount, result } = renderHook(() =>
      useClipboard('test text', { successDuration: 1000 }),
    )

    await act(async () => {
      await result.current[1]()
    })
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout')

    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})
