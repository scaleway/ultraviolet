import { Global, ThemeProvider } from '@emotion/react'
import type { ReactNode } from 'react'
import { useDarkMode } from 'storybook-dark-mode'
// eslint-disable-next-line import/no-relative-packages
import { fonts } from '../../../../../.storybook/components/DocsContainer'
// eslint-disable-next-line import/no-relative-packages
import { globalStyles } from '../../../../../.storybook/preview'
import lightTheme, { darkTheme } from '../../theme'

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const mode = useDarkMode() ? 'dark' : 'light'
  const currentTheme = mode === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <Global styles={[globalStyles(mode), fonts]} />
      {children}
    </ThemeProvider>
  )
}

export default ThemeWrapper
