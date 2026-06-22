import * as domMatchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { resetIntersectionMocking, setupIntersectionMocking } from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, expect, vi } from 'vitest'
import * as axeMatchers from 'vitest-axe/matchers'

const MockResize = vi.fn(function mock() {
  return {
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
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

// Mock InputEvent.getTargetRanges() for ProseMirror beforeinput plugin
// jsdom doesn't implement this method, but @handlewithcare/react-prosemirror@3.2.1 requires it
const MockGetTargetRanges = vi.fn(function mockGetTargetRanges(): StaticRange[] {
  return []
})

export const setup = () => {
  process.env['TZ'] = 'UTC'
  expect.extend(domMatchers)
  expect.extend(axeMatchers)

  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
    vi.spyOn(globalThis.Math, 'random').mockReturnValue(0.415_591_366_944_480_4)

    // oxlint-disable-next-line vitest/prefer-spy-on
    window.ResizeObserver = vi.fn().mockImplementation(MockResize)
    // oxlint-disable-next-line vitest/prefer-spy-on
    window.matchMedia = vi.fn().mockImplementation(MockMatchMedia)

    if (!globalThis.navigator.clipboard) {
      // @ts-expect-error mock clipboard API
      globalThis.navigator.clipboard = {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn().mockResolvedValue(''),
      }
    }

    // Mock InputEvent.getTargetRanges() for ProseMirror beforeinput plugin
    // jsdom doesn't implement this method, but @handlewithcare/react-prosemirror@3.2.1 requires it
    if (!globalThis.InputEvent.prototype.getTargetRanges) {
      globalThis.InputEvent.prototype.getTargetRanges = MockGetTargetRanges
    }
  })

  afterEach(() => {
    resetIntersectionMocking()
    vi.spyOn(globalThis.Math, 'random').mockRestore()

    cleanup()
  })

  vi.stubGlobal('ResizeObserver', MockResize)
}
