import { ThemeProvider } from '@emotion/react'
import { theme } from '@scaleway/ui'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Component
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...pageProps}
    />
  </ThemeProvider>
)

export default App
