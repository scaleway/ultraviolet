import { ThemeProvider } from '@emotion/react'
import makeHelpers from '@scaleway/jest-helpers'
import type { ReactNode } from 'react'
import { theme } from '@ultraviolet/ui'

type WrapperProps = {
  theme?: typeof theme
  children: ReactNode
}

const Wrapper = ({ theme, children }: WrapperProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export const {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotWithPortal,
} = makeHelpers(Wrapper, { classNameReplacer: className => className })
