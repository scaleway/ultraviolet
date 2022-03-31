import { ThemeProvider } from '@emotion/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import makeHelpers from '@scaleway/jest-helpers'
import { FC } from 'react'
import defaultTheme from '../theme'

interface WrapperProps {
  theme?: typeof defaultTheme
}

const Wrapper: FC<WrapperProps> = ({ theme = defaultTheme, children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export const {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotWithPortal,
} = makeHelpers(Wrapper, { classNameReplacer: className => className })
