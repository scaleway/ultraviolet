import * as domMatchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, expect, vi } from 'vitest'
import * as axeMatchers from 'vitest-axe/matchers'
import { toBeVisuallyHidden } from './toBeVisuallyHidden'

declare global {
  // React act environment flag, flipped off in `setupBrowser` below: real
  // browsers update React state outside act() (floating-ui, rAF) without it
  // being an error. Mirrors React's own global declaration so both the jsdom
  // and the browser setups can assign it type-safely.
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined
}

// Mock InputEvent.getTargetRanges() for ProseMirror beforeinput plugin
// jsdom doesn't implement this method, but @handlewithcare/react-prosemirror@3.2.1 requires it
const MockGetTargetRanges = vi.fn((): StaticRange[] => [])

export const setup = () => {
  process.env['TZ'] = 'UTC'
  expect.extend(domMatchers)
  expect.extend(axeMatchers)
  expect.extend({ toBeVisuallyHidden })

  beforeEach(() => {
    vi.spyOn(globalThis.Math, 'random').mockReturnValue(0.415_591_366_944_480_4)

    // DON'T mock global browser APIs here because it would force consumer projects to add the same mocks.
    // Make the components more robust instead.

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
    vi.spyOn(globalThis.Math, 'random').mockRestore()

    cleanup()
  })
}

export const setupBrowser = () => {
  // Library internals (floating-ui positioning, rAF, ResizeObserver) update
  // React state outside act() and cannot be wrapped by tests: React act
  // warnings are noise in a real browser. RTL still wraps render and user
  // events in act itself, so interactions stay deterministic.
  // beforeEach is needed: RTL's own module init sets the flag back to true
  // in a beforeAll, and module hooks run before it.
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = false
  })

  expect.extend(domMatchers)
  expect.extend(axeMatchers)
  expect.extend({ toBeVisuallyHidden })

  afterEach(() => {
    cleanup()
  })
}
