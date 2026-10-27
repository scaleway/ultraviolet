import * as domMatchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, expect } from 'vitest'
import * as axeMatchers from 'vitest-axe/matchers'
import { toBeVisuallyHidden } from '../toBeVisuallyHidden'
// oxlint-disable-next-line import/no-unassigned-import
import '@ultraviolet/themes/global'

declare global {
  // React act environment flag, flipped off in `setupBrowser` below: real
  // browsers update React state outside act() (floating-ui, rAF) without it
  // being an error.
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined
}

const setupBrowser = () => {
  beforeEach(() => {
    // Library internals (floating-ui positioning, rAF, ResizeObserver) update
    // React state outside act() and cannot be wrapped by tests
    globalThis.IS_REACT_ACT_ENVIRONMENT = false
  })

  expect.extend(domMatchers)
  expect.extend(axeMatchers)
  expect.extend({ toBeVisuallyHidden })

  afterEach(() => {
    cleanup()
  })
}

setupBrowser()
