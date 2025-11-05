import { extendTheme, Stack } from '@ultraviolet/ui'
import type { AppProps } from 'next/app'
import { useCallback, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Head from '../components/Head'
import Header from '../components/Header'
// oxlint-disable-next-line import/no-unassigned-import
import '@ultraviolet/fonts/fonts.css'
import '@ultraviolet/ui/styles'
import '@ultraviolet/themes/global'
import {
  consoleDarkTheme,
  consoleLightTheme,
  ThemeProvider,
} from '@ultraviolet/themes'
import '../components/globalStyle.css'

type Themes = 'light' | 'dark'

const COMMON_THEME_PROPS = {
  typography: {
    heading: {
      fontSize: '42px',
      lineHeight: '52px',
    },
    headingLarge: {
      fontSize: '72px',
      lineHeight: '80px',
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

  const localLightTheme = {
    ...extendTheme({
      ...COMMON_THEME_PROPS,
      ...consoleLightTheme,
      colors: {
        primary: {
          text: '#4F0599',
        },
      },
    }),
    setTheme: setThemeCallBack,
    theme: 'light',
  } as const

  const localDarkTheme = {
    ...extendTheme({
      ...consoleDarkTheme,
      ...COMMON_THEME_PROPS,
    }),
    setTheme: setThemeCallBack,
    theme: 'dark',
  } as const

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
      <Head />
      <Stack alignItems="center" gap={4}>
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
