export interface MockMatchMedia {
  media: string
  matches?: boolean
}

function noop() {}

function getMockImplementation({ media, matches = false }: MockMatchMedia) {
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

export default ({ media, matches = false }: MockMatchMedia): void => {
  const mockedImplementation = getMockImplementation({ matches, media })
  window.matchMedia = jest.fn().mockImplementation(mockedImplementation)
}
