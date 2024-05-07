import { Global, ThemeProvider } from '@emotion/react'
import type { ReactNode } from 'react'
// eslint-disable-next-line import/no-relative-packages
import { globalStyles } from '../../../../../.storybook/preview'
import lightTheme from '../../theme'

const ThemeWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={lightTheme}>
    <Global styles={[globalStyles]} />
    {children}
  </ThemeProvider>
)

export default ThemeWrapper
