import { ThemeProviderV2 as ThemeProvider } from '@ultraviolet/themes'
import { Stack } from '@ultraviolet/ui'
import type { AppProps } from 'next/app'
import type { PropsWithChildren } from 'react'
import Footer from '../components/Footer'
import Head from '../components/Head'
import Header from '../components/Header'
import '@ultraviolet/fonts/fonts.css'
import '@ultraviolet/ui/styles'
import '@ultraviolet/icons/styles'
import '@ultraviolet/themes/global'
import styles from '../../styles/grid.module.css'
import '../../styles/global.css'

const Grid = ({ children }: PropsWithChildren) => (
  <Stack alignItems="center" className={styles.grid} gap={4}>
    {children}
  </Stack>
)

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider initialTheme="system" localStorageConfig={{ key: 'next-app-theme' }}>
    <Head />
    <Grid>
      <Header className={styles.header} />
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <Footer className={styles.footer} />
    </Grid>
  </ThemeProvider>
)

export default App
