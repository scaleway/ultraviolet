import { createSerializer } from '@emotion/jest'
import * as matchers from '@testing-library/jest-dom/matchers'
// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup } from '@testing-library/react'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, expect, vi } from 'vitest'

const MockResize = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

export const setup = () => {
  process.env.TZ = 'UTC'
  expect.extend(matchers)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  expect.addSnapshotSerializer(createSerializer())

  // oxlint-disable-next-line no-hooks
  beforeEach(() => {
    setupIntersectionMocking(vi.fn())
    vi.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  // oxlint-disable-next-line no-hooks
  afterEach(() => {
    resetIntersectionMocking()
    vi.spyOn(global.Math, 'random').mockRestore()

    cleanup()
  })

  vi.stubGlobal('ResizeObserver', MockResize)
}
