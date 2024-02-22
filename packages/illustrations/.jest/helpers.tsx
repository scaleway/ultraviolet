import { ThemeProvider } from '@emotion/react'
import makeHelpers from '@scaleway/jest-helpers'
import type { ReactNode } from 'react'
import { consoleLightTheme, consoleDarkTheme } from '@ultraviolet/themes'

type WrapperProps = {
  theme?: typeof consoleLightTheme
  children: ReactNode
}
type DarkWrapperProps = {
  theme?: typeof consoleDarkTheme
  children: ReactNode
}

export const Wrapper = ({
  theme = consoleLightTheme,
  children,
}: WrapperProps) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

export const DarkWrapper = ({
  theme = consoleDarkTheme,
  children,
}: DarkWrapperProps) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

const lightThemeFunctions = makeHelpers(Wrapper, {
  classNameReplacer: className => className,
})
const darkThemeFunctions = makeHelpers(DarkWrapper, {
  classNameReplacer: className => className,
})

export const shouldMatchEmotionSnapshotLight =
  lightThemeFunctions.shouldMatchEmotionSnapshot
export const shouldMatchEmotionSnapshotDark =
  darkThemeFunctions.shouldMatchEmotionSnapshot
