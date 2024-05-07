import { Global, ThemeProvider } from '@emotion/react'
import type { ReactNode } from 'react'
// eslint-disable-next-line import/no-relative-packages
import { globalStyles } from '../../../../../.storybook/preview'
// eslint-disable-next-line import/no-relative-packages
import lightTheme from '../../../../ui/src/theme'

const ThemeWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={lightTheme}>
    <Global styles={[globalStyles]} />
    {children}
  </ThemeProvider>
)

export default ThemeWrapper
