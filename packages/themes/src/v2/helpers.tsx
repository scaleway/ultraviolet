import { createContext } from 'react'
import { DEFAULT_THEME_CLASSES } from './constants'
import type { ThemeContextType, Themes, ThemesExtended } from './types'

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isSystem: false,
  setTheme: () => {
    /* empty */
  },
  defined: false,
})

export const getSystemTheme = (): Themes => {
  if (typeof globalThis.matchMedia !== 'function') {
    return 'light'
  }

  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const getInitTheme = (): ThemesExtended => {
  if (typeof document === 'undefined') {
    return 'system'
  }

  const { documentElement } = document
  if (documentElement.classList.contains(DEFAULT_THEME_CLASSES.dark)) {
    return 'dark'
  }
  if (documentElement.classList.contains(DEFAULT_THEME_CLASSES.darker)) {
    return 'darker'
  }
  if (documentElement.classList.contains(DEFAULT_THEME_CLASSES.light)) {
    return 'light'
  }

  return 'system'
}
