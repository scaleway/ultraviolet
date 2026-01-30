import {
  consoleDarkTheme,
  consoleLightTheme,
  ThemeProvider,
} from '@ultraviolet/themes'
import { extendTheme, Stack } from '@ultraviolet/ui'
import type { AppProps } from 'next/app'
import { useCallback, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Head from '../components/Head'
import Header from '../components/Header'
import '@ultraviolet/fonts/fonts.css'
import '@ultraviolet/ui/styles'
import '@ultraviolet/icons/styles'
import '@ultraviolet/themes/global'
import '@ultraviolet/themes/dark.css'
import '@ultraviolet/themes/light.css'
import '@ultraviolet/themes/darker.css'
import '../../styles/global.css'

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

  const setThemes = (theme: Themes) => {
    setTheme(theme)
    document.documentElement.classList.remove('light-theme', 'dark-theme')
    document.documentElement.classList.add(`${theme}-theme`)
  }
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
        <Header setTheme={setThemes} />
        <Component {...pageProps} />
        <Footer />
      </Stack>
    </ThemeProvider>
  )
}

export default App
