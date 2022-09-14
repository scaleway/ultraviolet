import { ThemeProvider } from '@emotion/react'
import { darkTheme as dark, lightTheme as light } from '@scaleway/ui'
import Footer from 'components/Footer'
import GlobalStyle from 'components/GlobalStyle'
import Head from 'components/Head'
import TopBar from 'components/TopBar'
import { AppProps } from 'next/app'
import { useCallback, useState } from 'react'

const App = ({ Component, pageProps }: AppProps): JSX.Element | null => {
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
      <TopBar isLightMode={isLightMode} setIsLightMode={setLightModeCallBack} />
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...pageProps}
      />
      <Footer />
    </ThemeProvider>
  )
}

export default App
