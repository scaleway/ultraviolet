import { createContext } from 'react'
import { DEFAULT_THEME_CLASSES } from './constants'
import type { ThemeContextType, ThemeOption } from './types'

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isSystem: false,
  setTheme: () => {
    /* empty */
  },
  defined: false,
})

export const getInitTheme = (): ThemeOption => {
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
