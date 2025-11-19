import { ThemeProvider } from '@ultraviolet/themes'
import type { ReactNode } from 'react'
import lightTheme from '../../theme'

const ThemeWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
)

export default ThemeWrapper
