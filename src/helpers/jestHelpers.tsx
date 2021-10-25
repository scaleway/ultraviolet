/* eslint-disable import/no-extraneous-dependencies */
import { ThemeProvider } from '@emotion/react'
import makeHelpers from '@scaleway/jest-helpers'
import React, { FC } from 'react'
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
