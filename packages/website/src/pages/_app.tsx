import { ThemeProvider } from '@emotion/react'
import { Stack, darkTheme as dark, theme as light } from '@scaleway/ui'
import Footer from '../components/Footer'
import GlobalStyle from '../components/GlobalStyle'
import Head from '../components/Head'
import Header from '../components/Header'
import { AppProps } from 'next/app'
import { useCallback, useState } from 'react'

const App = ({ Component, pageProps }: AppProps) => {
  const [isLightMode, setIsLightMode] = useState<boolean>(true)

  const setLightModeCallBack = useCallback(
    (isLight: boolean) => {
      setIsLightMode(isLight)
      localStorage.setItem('settings', JSON.stringify({ isLightMode: isLight }))
    },
    [setIsLightMode],
  )

  return (
    <ThemeProvider theme={isLightMode ? light : dark}>
      <GlobalStyle />
      <Head />
      <Stack gap={4} alignItems="center">
        <Header
          isLightMode={isLightMode}
          setIsLightMode={setLightModeCallBack}
        />
        <Component
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...pageProps}
        />
        <Footer />
      </Stack>
    </ThemeProvider>
  )
}

export default App
