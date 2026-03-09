import {
  consoleDarkTheme,
  consoleLightTheme,
  ThemeProvider,
} from '@ultraviolet/themes'
import { extendTheme, Stack } from '@ultraviolet/ui'
import type { AppProps } from 'next/app'
import type { PropsWithChildren } from 'react'
import { useCallback, useLayoutEffect, useState } from 'react'
import Footer from '../components/Footer'
import Head from '../components/Head'
import Header from '../components/Header'
import '@ultraviolet/fonts/fonts.css'
import '@ultraviolet/ui/styles'
import '@ultraviolet/icons/styles'
import '@ultraviolet/themes/global'
import '@ultraviolet/themes/dark.css'
import '@ultraviolet/themes/darker.css'
import '@ultraviolet/themes/light.css'
import styles from '../../styles/grid.module.scss'
import '../../styles/global.css'

type Themes = 'light' | 'dark'

const Grid = ({ children }: PropsWithChildren) => (
  <Stack alignItems="center" className={styles.grid} gap={4}>
    {children}
  </Stack>
)

const themeKey = 'theme'

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<Themes>('light')

  const setThemes = (theme: Themes) => {
    setTheme(theme)
    document.documentElement.classList.remove('light-theme', 'dark-theme')
    document.documentElement.classList.add(`${theme}-theme`)
  }
  const setThemeCallBack = useCallback((localTheme: Themes) => {
    localStorage.setItem(themeKey, localTheme)
    setTheme(localTheme)
  }, [])

  const localLightTheme = {
    ...extendTheme({
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
    }),
    setTheme: setThemeCallBack,
    theme: 'dark',
  } as const

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      const storageTheme =
        (localStorage.getItem(themeKey) as 'light' | 'dark') ?? theme
      if (storageTheme) {
        setTheme(storageTheme)
      }
    }
  }, [])

  return (
    <ThemeProvider theme={theme === 'light' ? localLightTheme : localDarkTheme}>
      <Head />
      <Grid>
        <Header className={styles.header} setTheme={setThemes} />
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
        <Footer className={styles.footer} />
      </Grid>
    </ThemeProvider>
  )
}

export default App
