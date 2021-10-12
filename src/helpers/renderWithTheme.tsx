import { renderWithTheme } from './jestHelpers'

export default renderWithTheme
// /* eslint-disable import/no-extraneous-dependencies */
// import createCache from '@emotion/cache'
// import { CacheProvider, ThemeProvider } from '@emotion/react'
// import { RenderOptions, render } from '@testing-library/react'
// import React, { ReactNode } from 'react'
// import defaultTheme from '../theme'

// const emotionCache = createCache({
//   key: 'cache',
// })

// emotionCache.compat = true

// export default (
//   component: ReactNode,
//   options?: RenderOptions,
//   theme: typeof defaultTheme = defaultTheme,
// ): ReturnType<typeof render> =>
//   render(
//     <CacheProvider value={emotionCache}>
//       <ThemeProvider theme={theme}>{component}</ThemeProvider>
//     </CacheProvider>,
//     options,
//   )
