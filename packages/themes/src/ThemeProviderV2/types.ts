import type { ReactNode } from 'react'

export type Themes = 'light' | 'dark' | 'darker'

export type ThemesExtended = Themes | 'system'

export type LocalStorageConfig = {
  /**
   * Name of the item to store in the local storage.
   * @default "theme"
   */
  key?: string
  values?: {
    light?: string
    dark?: string
    darker?: string
    system?: string
  }
}

export type ThemeProviderProps = {
  /**
   * Initial chosen theme. When not provided, the theme is read from the
   * `light-theme`/`dark-theme`/`darker-theme` classes on the document element,
   * @default "system".
   */
  initialTheme?: ThemesExtended
  children: ReactNode
  /**
   * When provided, the chosen theme is stored in the local storage
   */
  localStorageConfig?: LocalStorageConfig
}

export type ThemeContextType = {
  /**
   * Currently applied theme ("dark", "light", or "darker")
   */
  theme: Themes
  /**
   * Whether the chosen theme is `system` (which translates to dark or light)
   */
  isSystem: boolean
  setTheme: (newTheme: ThemesExtended) => void
  /** TO REMOVE ONCE THEMEPROVIDER IS REMOVED AND THEMEPROVIDERV2 IS THE ONLY VERSION
   *  Wether a ThemeProviderV2 is defined in the app
   */
  defined: boolean
}
