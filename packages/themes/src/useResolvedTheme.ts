import { useTheme } from './ThemeProvider'
import { useTheme as useThemeV2 } from './v2'
import type { Themes } from './v2'

/**
 * Hook to get current applied theme from v2/ThemeProvider with a fallback on ThemeProvider.
 * Uses `useTheme` and `v2/useTheme`
 * @returns 'light' | 'dark' | 'darker'
 */
export const useResolvedTheme = () => {
  const { theme, defined } = useTheme()
  const { theme: themeV2, defined: definedV2 } = useThemeV2()

  const fallBackTheme = (defined ? theme : 'light') as Themes
  const computedTheme = definedV2 ? themeV2 : fallBackTheme

  return computedTheme
}
