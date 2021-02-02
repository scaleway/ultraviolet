/* eslint-disable import/no-extraneous-dependencies */
import createCache from '@emotion/cache'
import { createSerializer } from '@emotion/jest'
import { CacheProvider } from '@emotion/react'
import { render } from '@testing-library/react'
import React from 'react'

expect.addSnapshotSerializer(createSerializer())

const emotionCache = createCache({
  key: 'cache',
})
emotionCache.compat = true

export default (component, { transform } = {}) => {
  const node = render(
    <CacheProvider value={emotionCache}>{component}</CacheProvider>,
  )
  if (transform) transform(node)

  expect(node.asFragment()).toMatchSnapshot()
}
