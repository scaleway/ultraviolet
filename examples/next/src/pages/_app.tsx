import { ThemesProvider } from '@ultraviolet/themes'
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
import '@ultraviolet/themes/dark.css'
import '@ultraviolet/themes/darker.css'
import '@ultraviolet/themes/light.css'
import styles from '../../styles/grid.module.scss'
import '../../styles/global.css'

const Grid = ({ children }: PropsWithChildren) => (
  <Stack alignItems="center" className={styles.grid} gap={4}>
    {children}
  </Stack>
)

const App = ({ Component, pageProps }: AppProps) => (
  <ThemesProvider>
    <Head />
    <Grid>
      <Header className={styles.header} />
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <Footer className={styles.footer} />
    </Grid>
  </ThemesProvider>
)

export default App
