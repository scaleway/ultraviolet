import { useTheme } from './ThemeProvider'
import { useThemeV2 } from './ThemeProviderV2'
import type { Themes } from './ThemeProviderV2'

//
/**
 * Hook to get current applied theme from ThemeProviderV2 with a fallback on ThemeProvider.
 * Uses `useTheme` and `useThemeV2`
 * @returns 'light' | 'dark' | 'darker'
 */
export const useResolvedTheme = () => {
  const { theme, defined } = useTheme()
  const { theme: themeV2, defined: definedV2 } = useThemeV2()

  const fallBackTheme = (defined ? theme : 'light') as Themes
  const computedTheme = definedV2 ? themeV2 : fallBackTheme

  return computedTheme
}
