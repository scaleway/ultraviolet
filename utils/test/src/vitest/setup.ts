import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, expect, vi } from 'vitest'

const MockResize = vi.fn(function mock() {
  return {
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }
})

export const setup = () => {
  expect.extend(matchers)

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
