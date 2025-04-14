import { Global, ThemeProvider, css } from '@emotion/react'
import { Button, normalize, theme } from '@ultraviolet/ui'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ThemeProvider theme={theme}>
          <Global
            styles={css`
                ${normalize()}
              `}
          />
          <Button>Click Me</Button>
        </ThemeProvider>
      </main>
    </div>
  )
}
