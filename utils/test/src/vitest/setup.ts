import * as domMatchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, expect, vi } from 'vitest'
import * as axeMatchers from 'vitest-axe/matchers'

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
