import * as matchers from '@testing-library/jest-dom/matchers'
// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup } from '@testing-library/react'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, expect, vi } from 'vitest'

const MockResize = vi.fn(function () {
  return {
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }
})

export const setup = () => {
  process.env.TZ = 'UTC'
  expect.extend(matchers)

  // oxlint-disable-next-line no-hooks
  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
    vi.spyOn(globalThis.Math, 'random').mockReturnValue(0.4155913669444804)

    window.ResizeObserver = vi.fn().mockImplementation(MockResize)
  })

  // oxlint-disable-next-line no-hooks
  afterEach(() => {
    resetIntersectionMocking()
    vi.spyOn(globalThis.Math, 'random').mockRestore()

    cleanup()
  })

  vi.stubGlobal('ResizeObserver', MockResize)
}
