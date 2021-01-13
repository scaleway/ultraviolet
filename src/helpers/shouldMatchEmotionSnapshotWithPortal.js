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
  // Save the instance of console (disable warning about adding element directly to document.body which is necessary when testing portal components)
  const { console } = global
  global.console = { error: jest.fn() }

  const { asFragment, unmount } = render(
    <CacheProvider value={emotionCache}>{component}</CacheProvider>,
    { container: document.body },
  )
  expect(asFragment()).toMatchSnapshot()

  // Unmounting to don't see the warning message described above
  unmount()
  global.console = console
}
