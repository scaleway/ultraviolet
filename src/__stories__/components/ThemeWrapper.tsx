import { Global, ThemeProvider } from '@emotion/react'
import React, { ReactNode } from 'react'
import { globalStyles } from '../../../.storybook/preview'
import lightTheme from '../../theme'

const ThemeWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={lightTheme}>
    <Global styles={[globalStyles]} />
    {children}
  </ThemeProvider>
)

export default ThemeWrapper
