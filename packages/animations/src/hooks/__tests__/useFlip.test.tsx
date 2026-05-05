import { renderHook, act } from '@testing-library/react'
import { describe, expect, expectTypeOf, it, vi } from 'vitest'

import { useFlip } from '../useFlip'

const createMockRect = (
  options: Partial<DOMRect> = {},
): ReturnType<Element['getBoundingClientRect']> => ({
  left: 0,
  top: 0,
  right: 100,
  bottom: 100,
  width: 100,
  height: 100,
  x: 0,
  y: 0,
  toJSON: () => ({}),
  ...options,
})

const createContainer = () => {
  const container = document.createElement('div')
  Object.assign(container, { animate: vi.fn() })
  return container
}

const createElement = (flipId: string) => {
  const element = document.createElement('div')
  element.dataset['flipId'] = flipId
  return element
}

describe(useFlip, () => {
  it('should return prepareAnimation and animate functions', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => useFlip(ref))

    expectTypeOf(result.current.prepareAnimation).toBeFunction()
    expectTypeOf(result.current.animate).toBeFunction()
  })

  it('should animate elements that have moved', async () => {
    const container = createContainer()
    const element = createElement('item1')
    container.appendChild(element)

    const mockAnimate = vi.fn(() => ({ finished: vi.fn() }))
    Object.assign(element, { animate: mockAnimate })

    const ref = { current: container }
    const { result } = renderHook(() => useFlip(ref))

    vi.spyOn(element, 'getBoundingClientRect').mockReturnValueOnce(
      createMockRect({ left: 0, top: 0 }),
    )

    act(() => {
      result.current.prepareAnimation()
    })

    vi.spyOn(element, 'getBoundingClientRect').mockReturnValueOnce(
      createMockRect({ left: 50, top: 50 }),
    )

    await act(async () => {
      await result.current.animate()
    })

    expect(mockAnimate).toHaveBeenCalledWith(
      [{ transform: 'translate(-50px, -50px)' }, {}],
      {
        duration: 250,
        easing: 'ease',
      },
    )
  })

  it('should not animate elements that have not moved', async () => {
    const container = createContainer()
    const element = createElement('item1')
    container.appendChild(element)

    const mockAnimate = vi.fn(() => ({
      finished: vi.fn(),
    }))
    Object.assign(element, { animate: mockAnimate })

    const ref = { current: container }
    const { result } = renderHook(() => useFlip(ref))

    vi.spyOn(element, 'getBoundingClientRect').mockReturnValueOnce(
      createMockRect({ left: 0, top: 0 }),
    )

    act(() => {
      result.current.prepareAnimation()
    })

    vi.spyOn(element, 'getBoundingClientRect').mockReturnValueOnce(
      createMockRect({ left: 0, top: 0 }),
    )

    await act(async () => {
      await result.current.animate()
    })

    expect(mockAnimate).not.toHaveBeenCalled()
  })

  it('should cancel existing animation when starting new one', async () => {
    const container = createContainer()
    const element = createElement('item1')
    container.appendChild(element)

    const mockAnimation = {
      finished: Promise.resolve(),
      cancel: vi.fn(),
    }

    Object.assign(element, { animate: vi.fn(() => mockAnimation) })

    const ref = { current: container }
    const { result } = renderHook(() => useFlip(ref))

    act(() => {
      result.current.prepareAnimation()
    })

    vi.spyOn(element, 'getBoundingClientRect').mockReturnValueOnce(
      createMockRect({ left: 0, top: 0 }),
    )

    act(() => {
      result.current.prepareAnimation()
    })

    vi.spyOn(element, 'getBoundingClientRect').mockReturnValueOnce(
      createMockRect({ left: 50, top: 50 }),
    )

    await act(async () => {
      await result.current.animate()
    })

    act(() => {
      result.current.prepareAnimation()
    })

    await act(async () => {
      await result.current.animate()
    })

    expect(mockAnimation.cancel).toHaveBeenCalled()
  })

  it('should handle null ref in prepareAnimation', () => {
    const ref = { current: null }
    const { result } = renderHook(() => useFlip(ref))

    expect(() => {
      act(() => {
        result.current.prepareAnimation()
      })
    }).not.toThrow()
  })

  it('should handle null ref in animate', async () => {
    const ref = { current: null }
    const { result } = renderHook(() => useFlip(ref))

    await expect(result.current.animate()).resolves.toBeUndefined()
  })

  it('should return resolved promise when element does not support animate', async () => {
    const container = createContainer()
    const element = createElement('item1')
    container.appendChild(element)

    Object.assign(container, { animate: undefined })

    const ref = { current: container }
    const { result } = renderHook(() => useFlip(ref))

    act(() => {
      result.current.prepareAnimation()
    })

    await expect(result.current.animate()).resolves.toBeUndefined()
  })
})
