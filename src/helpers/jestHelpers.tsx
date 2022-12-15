import { ThemeProvider } from '@emotion/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import makeHelpers from '@scaleway/jest-helpers'
import type { ReactNode } from 'react'
import defaultTheme from '../theme'

type WrapperProps = {
  theme?: typeof defaultTheme
  children: ReactNode
}

const Wrapper = ({ theme = defaultTheme, children }: WrapperProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export const {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotWithPortal,
} = makeHelpers(Wrapper, { classNameReplacer: className => className })
