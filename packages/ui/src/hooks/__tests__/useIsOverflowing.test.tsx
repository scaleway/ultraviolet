import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useIsOverflowing } from '../useIsOverflowing'

class MockResizeObserver {
  static disconnect = vi.fn()

  callback: ResizeObserverCallback

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
  }

  observe() {
    this.callback([], this as unknown as ResizeObserver)
  }

  unobserve() {}

  disconnect() {
    MockResizeObserver.disconnect()
  }
}

describe(useIsOverflowing, () => {
  beforeEach(() => {
    MockResizeObserver.disconnect.mockClear()
    vi.stubGlobal('ResizeObserver', MockResizeObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should be false with no overflow', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useIsOverflowing({ callback }))
    const [setElement, isOverflowing] = result.current

    act(() => {
      setElement(document.createElement('div'))
    })

    expect(isOverflowing).toBe(false)
    expect(callback).toHaveBeenCalledWith(false)
  })

  it('should be true with overflow', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useIsOverflowing({ callback }))
    const [setElement] = result.current

    const element = document.createElement('div')
    Object.defineProperty(element, 'clientWidth', { value: 100 })
    Object.defineProperty(element, 'scrollWidth', { value: 200 })

    act(() => {
      setElement(element)
    })

    expect(result.current[1]).toBe(true)
    expect(callback).toHaveBeenCalledWith(true)
  })

  it('should recompute when the element changes', () => {
    const { result } = renderHook(() => useIsOverflowing())
    const [setElement] = result.current

    const overflowElement = document.createElement('div')
    Object.defineProperty(overflowElement, 'clientWidth', { value: 100 })
    Object.defineProperty(overflowElement, 'scrollWidth', { value: 200 })

    act(() => {
      setElement(overflowElement)
    })
    expect(result.current[1]).toBe(true)

    act(() => {
      setElement(document.createElement('div'))
    })
    expect(result.current[1]).toBe(false)
  })

  it('should cleanup the ResizeObserver', () => {
    const { result, unmount } = renderHook(() => useIsOverflowing())
    const [setElement] = result.current

    act(() => {
      setElement(document.createElement('div'))
    })
    unmount()

    expect(MockResizeObserver.disconnect).toHaveBeenCalled()
  })

  it('should not create the observer when disabled', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useIsOverflowing({ callback, enabled: false }))
    const [setElement, isOverflowing] = result.current

    act(() => {
      setElement(document.createElement('div'))
    })

    expect(isOverflowing).toBe(false)
    expect(callback).not.toHaveBeenCalled()
  })

  it('should handle no element', () => {
    const { result } = renderHook(() => useIsOverflowing())

    expect(result.current[1]).toBe(false)
  })

  it('should not throw error if ResizeObserver is not defined', () => {
    vi.unstubAllGlobals()
    const { result } = renderHook(() => useIsOverflowing())
    const [setElement, isOverflowing] = result.current

    act(() => {
      setElement(document.createElement('div'))
    })
    expect(isOverflowing).toBe(false)
  })
})
