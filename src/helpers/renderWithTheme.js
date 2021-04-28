/* eslint-disable import/no-extraneous-dependencies */
import createCache from '@emotion/cache'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import { render } from '@testing-library/react'
import React from 'react'
import defaultTheme from '../theme'

const emotionCache = createCache({
  key: 'cache',
})

emotionCache.compat = true

export default (component, options, theme = defaultTheme) =>
  render(
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </CacheProvider>,
    options,
  )
