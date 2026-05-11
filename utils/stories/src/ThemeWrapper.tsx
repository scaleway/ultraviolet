import { consoleLightTheme, ThemeProvider } from '@ultraviolet/themes'
import type { ReactNode } from 'react'

const ThemeWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={consoleLightTheme}>{children}</ThemeProvider>
)

export default ThemeWrapper
