import { ThemeProvider } from '@emotion/react'
import { Stack, darkTheme as dark, extendTheme } from '@scaleway/ui'
import Footer from 'components/Footer'
import GlobalStyle from 'components/GlobalStyle'
import Head from 'components/Head'
import Header from 'components/Header'
import { AppProps } from 'next/app'
import { useCallback, useEffect, useState } from 'react'

type Themes = 'light' | 'dark'

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

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<Themes>('light')
  const setThemeCallBack = useCallback((localTheme: Themes) => {
    localStorage.setItem('theme', localTheme)
    setTheme(localTheme)
  }, [])

  const localLightTheme = extendTheme({
    ...COMMON_THEME_PROPS,
    colors: {
      primary: {
        textWeak: '#A395FF',
        text: '#4F0599',
      },
    },
    theme: 'light',
    setTheme: setThemeCallBack,
  })

  const localDarkTheme = extendTheme({
    ...dark,
    ...COMMON_THEME_PROPS,
    theme: 'dark',
    setTheme: setThemeCallBack,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageTheme = localStorage.getItem('theme')
      if (storageTheme) {
        setTheme(storageTheme as 'light' | 'dark')
      } else {
        const isThemeDark = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches

        if (isThemeDark) {
          setThemeCallBack('dark')
        } else {
          setThemeCallBack('light')
        }
      }
    }
  }, [setThemeCallBack])

  return (
    <ThemeProvider theme={theme === 'light' ? localLightTheme : localDarkTheme}>
      <GlobalStyle />
      <Head />
      <Stack gap={4} alignItems="center">
        <Header />
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
