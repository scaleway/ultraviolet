import { Global, ThemeProvider } from '@emotion/react'
import type { ReactNode } from 'react'
import { globalStyles } from '../../../../../.storybook/components/globalStyle'
import { lightTheme } from '../../theme'

const ThemeWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={lightTheme}>
    <Global styles={[globalStyles]} />
    {children}
  </ThemeProvider>
)

export default ThemeWrapper
