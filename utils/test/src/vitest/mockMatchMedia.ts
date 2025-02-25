/* eslint-disable eslint-comments/disable-enable-pair */

import { vi } from 'vitest'

type MockMatchMedia = {
  media: string
  matches?: boolean
}

const noop = () => {}

const getMockImplementation = ({ media, matches = false }: MockMatchMedia) => {
  const mql: MediaQueryList = {
    addEventListener: noop,
    addListener: noop,
    dispatchEvent: () => true,
    matches,
    media,
    onchange: noop,
    removeEventListener: noop,
    removeListener: noop,
  }

  return () => mql
}

export const mockMatchMedia = ({ media, matches = false }: MockMatchMedia) => {
  const mockedImplementation = getMockImplementation({ media, matches })
  vi.spyOn(window, 'matchMedia').mockImplementation(mockedImplementation)
}
