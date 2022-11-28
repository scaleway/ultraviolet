import { ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import { darkTheme as dark, extendTheme } from '@scaleway/ui'
import Footer from 'components/Footer'
import GlobalStyle from 'components/GlobalStyle'
import Head from 'components/Head'
import Header from 'components/Header'
import { AppProps } from 'next/app'
import { useCallback, useState } from 'react'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['4']};
  align-items: center;
`

const COMMON_THEME_PROPS = {
  typography: {
    headingLarge: {
      fontSize: '72px',
    },
    heading: {
      fontSize: '42px',
      lineHeight: '52px',
    },
    headingSmall: {
      fontSize: '28px',
    },
  },
}

const LOCAL_LIGHT_THEME = extendTheme({
  ...COMMON_THEME_PROPS,
  colors: {
    primary: {
      textWeak: '#A395FF',
      text: '#4F0599',
    },
  },
})

const LOCAL_DARK_THEME = extendTheme({
  ...dark,
  ...COMMON_THEME_PROPS,
})

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
    <ThemeProvider theme={isLightMode ? LOCAL_LIGHT_THEME : LOCAL_DARK_THEME}>
      <GlobalStyle />
      <Head />
      <AppContainer>
        <Header
          isLightMode={isLightMode}
          setIsLightMode={setLightModeCallBack}
        />
        <Component
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...pageProps}
        />
        <Footer />
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
