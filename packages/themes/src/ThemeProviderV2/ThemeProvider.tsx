import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_THEME_CLASSES } from './constants'
import { ThemeContext, getInitTheme, getSystemTheme } from './helpers'
import type { ThemeContextType, ThemeProviderProps, Themes, ThemesExtended } from './types'
import { useThemeStorage } from './useThemeStorage'

/**
 * ThemeProviderV2 manages the theme without injecting any CSS variable at runtime.
 * It relies on the static CSS files to provide the theme variables
 */
export const ThemeProviderV2 = ({ initialTheme, children, localStorageConfig }: ThemeProviderProps) => {
  const [chosenTheme, setChosenTheme] = useState<ThemesExtended>(initialTheme ?? getInitTheme())
  const [colorMediaPreference, setColorMediaPreference] = useState<Themes>(getSystemTheme())

  const isSystem = chosenTheme === 'system'

  const appliedTheme = useMemo(() => {
    if (isSystem) {
      return colorMediaPreference
    }

    return chosenTheme
  }, [isSystem, colorMediaPreference, chosenTheme])

  useThemeStorage({
    enabled: Boolean(localStorageConfig),
    localStorageConfig,
    chosenTheme,
    onThemeChange: setChosenTheme,
  })

  // Listen to matchMedia update
  useEffect(() => {
    const colorMedia = globalThis.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => {
      setColorMediaPreference(event.matches ? 'dark' : 'light')
    }

    colorMedia.addEventListener('change', handleChange)

    return () => colorMedia.removeEventListener('change', handleChange)
  }, [])

  // Add class to document according to applied theme
  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    const { documentElement } = document
    documentElement.classList.remove(...Object.values(DEFAULT_THEME_CLASSES))
    documentElement.classList.add(DEFAULT_THEME_CLASSES[appliedTheme])

    // oxlint-disable-next-line typescript/consistent-return
    return () => {
      documentElement.classList.remove(DEFAULT_THEME_CLASSES[appliedTheme])
    }
  }, [appliedTheme])

  const value = useMemo<ThemeContextType>(
    () => ({
      theme: appliedTheme,
      isSystem,
      setTheme: setChosenTheme,
      defined: true,
    }),
    [appliedTheme, isSystem],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
