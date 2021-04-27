/* eslint-disable import/no-extraneous-dependencies */
import createCache from '@emotion/cache'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import { render } from '@testing-library/react'
import React from 'react'
import theme from '../theme'

const emotionCache = createCache({
  key: 'cache',
})

emotionCache.compat = true

export default (component, options, modifyTheme = {}) =>
  render(
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={{ ...theme, ...modifyTheme }}>
        {component}
      </ThemeProvider>
    </CacheProvider>,
    options,
  )
