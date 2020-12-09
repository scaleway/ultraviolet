/* eslint-disable import/no-extraneous-dependencies */
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/core'
import { render } from '@testing-library/react'
import serializer from 'jest-emotion'
import React from 'react'

expect.addSnapshotSerializer(serializer)

const emotionCache = createCache()
emotionCache.compat = true

export default component => {
  const { asFragment } = render(
    <CacheProvider value={emotionCache}>{component}</CacheProvider>,
  )
  expect(asFragment()).toMatchSnapshot()
}
