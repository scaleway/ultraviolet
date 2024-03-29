import { Global, ThemeProvider } from '@emotion/react'
import type { ReactNode } from 'react'
import { useDarkMode } from 'storybook-dark-mode'
// eslint-disable-next-line import/no-relative-packages
import { globalStyles } from '../../../../../.storybook/preview'
// eslint-disable-next-line import/no-relative-packages
import lightTheme, { darkTheme } from '../../../../ui/src/theme'

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const mode = useDarkMode() ? 'dark' : 'light'
  const currentTheme = mode === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <Global styles={[globalStyles(mode)]} />
      {children}
    </ThemeProvider>
  )
}

export default ThemeWrapper
