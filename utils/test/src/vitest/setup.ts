import * as domMatchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, expect, vi } from 'vitest'
import * as axeMatchers from 'vitest-axe/matchers'

const MockResize = vi.fn<() => void>(function mock() {
  return {
    disconnect: vi.fn<() => void>(),
    observe: vi.fn<() => void>(),
    unobserve: vi.fn<() => void>(),
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
  })

  //
  afterEach(() => {
    resetIntersectionMocking()
    vi.spyOn(globalThis.Math, 'random').mockRestore()

    cleanup()
  })

  vi.stubGlobal('ResizeObserver', MockResize)
}
