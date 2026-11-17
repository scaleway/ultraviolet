import type { TupleUnion } from '@scaleway/types'
import { createContext } from 'react'
import type { ThemeContextType, ThemeOption } from './types'

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isSystem: false,
  setTheme: () => {
    /* empty */
  },
  defined: false,
})

const DEFAULT_THEME_OPTIONS = new Set<ThemeOption>([
  'dark',
  'darker',
  'light',
  'system',
] satisfies TupleUnion<ThemeOption>)

export const isThemeOption = (theme: string): theme is ThemeOption => DEFAULT_THEME_OPTIONS.has(theme as ThemeOption)
