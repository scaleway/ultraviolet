import { mockMediaQueryList } from 'use-media/lib/useMedia'

export interface MockMatchMedia {
  media: string
  matches?: boolean
}

function getMockImplementation({ media, matches = false }: MockMatchMedia) {
  const mql: MediaQueryList = {
    ...mockMediaQueryList,
    matches,
    media,
  }

  return () => mql
}

export default ({ media, matches = false }: MockMatchMedia): void => {
  const mockedImplementation = getMockImplementation({ matches, media })
  window.matchMedia = jest.fn().mockImplementation(mockedImplementation)
}
