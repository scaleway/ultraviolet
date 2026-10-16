'use client'

import { useLocalStorage } from '@scaleway/use-storage'
import { useEffect, useMemo } from 'react'
import { DEFAULT_THEME_CLASSES, DEFAULT_THEME_STORAGE_KEY } from './constants'
import { ThemeContext } from './helpers'
import type { ThemeContextType, ThemeOption, ThemeProviderProps } from './types'
import { usePrefersDarkMode } from './usePrefersDarkMode'

/**
 * ThemeProvider (v2) manages the theme without injecting any CSS variable at runtime.
 * It relies on the static CSS files to provide the theme variables
 */
export const ThemeProvider = ({ initialTheme = 'system', children, storageKey }: ThemeProviderProps) => {
  const [storedTheme, setStoredTheme] = useLocalStorage<ThemeOption>(
    storageKey ?? DEFAULT_THEME_STORAGE_KEY,
    initialTheme,
  )

  const chosenTheme = storedTheme ?? initialTheme
  const isSystem = chosenTheme === 'system'
  const prefersDarkMode = usePrefersDarkMode()

  const appliedTheme = useMemo(() => {
    if (isSystem) {
      return prefersDarkMode ? 'dark' : 'light'
    }

    return chosenTheme
  }, [isSystem, prefersDarkMode, chosenTheme])

  // Add class to document according to applied theme.
  // Effects only run on the client after render, so `document` is always defined
  useEffect(() => {
    const { documentElement } = document
    documentElement.classList.remove(...Object.values(DEFAULT_THEME_CLASSES))
    documentElement.classList.add(DEFAULT_THEME_CLASSES[appliedTheme])

    return () => {
      documentElement.classList.remove(DEFAULT_THEME_CLASSES[appliedTheme])
    }
  }, [appliedTheme])

  const value = useMemo<ThemeContextType>(
    () => ({
      theme: appliedTheme,
      isSystem,
      setTheme: setStoredTheme,
      defined: true,
    }),
    [appliedTheme, isSystem, setStoredTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
