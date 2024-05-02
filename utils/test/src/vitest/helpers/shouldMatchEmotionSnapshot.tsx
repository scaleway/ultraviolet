import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { render } from '@testing-library/react'
import type { ReactNode } from 'react'
import { expect } from 'vitest'

const emotionCache = createCache({
  key: 'cache',
})

emotionCache.compat = true

export const makeShouldMatchEmotionSnapshot = (
  children: ReactNode,
  {
    wrapper,
  }: {
    wrapper?: React.JSXElementConstructor<{ children: React.ReactNode }>
  },
) => {
  const { asFragment } = render(
    <CacheProvider value={emotionCache}>{children}</CacheProvider>,
    { wrapper },
  )

  expect(asFragment()).toMatchSnapshot()
}
