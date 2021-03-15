/* eslint-disable import/no-extraneous-dependencies */
import createCache from '@emotion/cache'
import { createSerializer } from '@emotion/jest'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import { render } from '@testing-library/react'
import React from 'react'
import theme from '../theme'

expect.addSnapshotSerializer(createSerializer())

const emotionCache = createCache({
  key: 'cache',
})
emotionCache.compat = true

export default async (component, { transform } = {}) => {
  const node = render(
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </CacheProvider>,
  )
  if (transform) await transform(node)

  expect(node.asFragment()).toMatchSnapshot()
}
