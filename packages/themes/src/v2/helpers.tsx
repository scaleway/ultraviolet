import { createContext } from 'react'
import type { ThemeContextType } from './types'

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isSystem: false,
  setTheme: () => {
    /* empty */
  },
  defined: false,
})
