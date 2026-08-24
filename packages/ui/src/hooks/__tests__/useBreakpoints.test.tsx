import { renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { useBreakpoints } from '../useBreakpoint'

const renderWithWidth = (width: number, breakpoints: Record<string, number>) => {
  const element = document.createElement('div')
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({ width } as unknown as DOMRect)

  const { result } = renderHook(() => {
    const ref = useRef(element)
    return useBreakpoints(ref, breakpoints)
  })
  return result
}

describe(useBreakpoints, () => {
  it('should activate the first range when the width is within it', async () => {
    const result = renderWithWidth(300, { small: 0, medium: 320 })
    expect(result.current).toEqual({ small: true, medium: false })
  })

  it('should activate the next range when the width reaches its start', async () => {
    const result = renderWithWidth(500, { small: 0, medium: 320 })
    expect(result.current).toEqual({ small: false, medium: true })
  })

  it('should keep the last breakpoint active when wider than the previous ones', async () => {
    const result = renderWithWidth(900, { small: 0, medium: 320 })
    expect(result.current).toEqual({ small: false, medium: true })
  })

  it('should work with a single breakpoint', async () => {
    const result = renderWithWidth(500, { small: 320 })
    expect(result.current).toEqual({ small: true })
  })

  it('should handle undefined ref', async () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement | null>(null)
      return useBreakpoints(ref, { small: 320 })
    })
    expect(result.current).toEqual({ small: false })
  })
})
