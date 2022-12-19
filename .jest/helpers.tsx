import { ThemeProvider } from '@emotion/react'
import makeHelpers from '@scaleway/jest-helpers'
import type { ReactNode } from 'react'
import defaultTheme from '../src/theme'

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
