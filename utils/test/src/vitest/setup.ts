import * as domMatchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { resetIntersectionMocking, setupIntersectionMocking } from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, expect, vi } from 'vitest'
import * as axeMatchers from 'vitest-axe/matchers'

const MockResize = vi.fn<() => void>(function mock() {
  return {
    disconnect: vi.fn<() => void>(),
    observe: vi.fn<() => void>(),
    unobserve: vi.fn<() => void>(),
  }
})

const MockMatchMedia = vi.fn(function mock(query: string): MediaQueryList {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }
})

export const setup = () => {
  process.env['TZ'] = 'UTC'
  expect.extend(domMatchers)
  expect.extend(axeMatchers)

  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
    vi.spyOn(globalThis.Math, 'random').mockReturnValue(0.415_591_366_944_480_4)

    window.ResizeObserver = vi.fn().mockImplementation(MockResize)
    window.matchMedia = vi.fn().mockImplementation(MockMatchMedia)

    if (!globalThis.navigator.clipboard) {
      // @ts-expect-error mock clipboard API
      globalThis.navigator.clipboard = {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn().mockResolvedValue(''),
      }
    }
  })

  //
  afterEach(() => {
    resetIntersectionMocking()
    vi.spyOn(globalThis.Math, 'random').mockRestore()

    cleanup()
  })

  vi.stubGlobal('ResizeObserver', MockResize)
}
