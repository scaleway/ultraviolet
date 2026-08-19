import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

type BreakpointState<T extends string> = Record<T, boolean>

const getActive = <T extends string>(width: number, breakpoints: Record<T, number>): BreakpointState<T> => {
  const sorted = Object.entries<number>(breakpoints).sort((a, b) => a[1] - b[1])
  const active: Record<string, boolean> = {}

  sorted.forEach(([name, start], index) => {
    const next = sorted[index + 1]?.[1]
    active[name] = width >= start && (next === undefined || width < next)
  })

  return active as BreakpointState<T>
}

/**
 * Returns whether each breakpoint is active for the given element's width.
 *
 * The `breakpoints` argument maps a breakpoint name to the width (in px) at
 * which its range starts, e.g. `{ small: 0, medium: 320, large: 768 }`. A
 * breakpoint is active while the element's width is at least its start value
 * and below the next breakpoint's start value. The last breakpoint has no
 * upper bound. The returned object has the breakpoint names as properties,
 * each set to `true` when that breakpoint is active.
 */
export const useBreakpoints = <T extends string>(
  ref: RefObject<HTMLElement | null>,
  breakpoints: Record<T, number>,
): BreakpointState<T> => {
  const breakpointsRef = useRef(breakpoints)
  const [current, setCurrent] = useState<BreakpointState<T>>(
    () => Object.fromEntries(Object.keys(breakpoints).map(name => [name, false])) as BreakpointState<T>,
  )

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const update = (width: number) => setCurrent(getActive(width, breakpointsRef.current))

    if (typeof ResizeObserver === 'undefined') {
      update(element.getBoundingClientRect().width)
      return
    }

    const observer = new ResizeObserver(([entry]) => update(entry.contentRect.width))
    observer.observe(element)

    return () => observer.disconnect()
  }, [ref])

  return current
}
