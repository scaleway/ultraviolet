import type { ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'darker'

export type ThemeOption = Theme | 'system'

export type ThemeProviderProps = {
  /**
   * Initial chosen theme. When not provided, the theme is read from the
   * `light-theme`/`dark-theme`/`darker-theme` classes on the document element,
   * @default "system".
   */
  initialTheme?: ThemeOption
  children: ReactNode
  /**
   * Key used to persist the chosen theme in the local storage.
   * @default "uv-theme"
   */
  storageKey?: string
}

export type ThemeContextType = {
  /**
   * Currently applied theme ("dark", "light", or "darker")
   */
  theme: Theme
  /**
   * Whether the chosen theme is `system` (which translates to dark or light)
   */
  isSystem: boolean
  setTheme: (newTheme: ThemeOption) => void
  /** TO REMOVE ONCE THEMEPROVIDER IS REMOVED AND THEMEPROVIDER V2 IS THE ONLY VERSION
   *  Whether a ThemeProvider v2 is defined in the app
   */
  defined: boolean
}
