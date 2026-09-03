'use client'

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import noFlashScript from './helpers/noFlashScript.js?raw'
import { consoleDarkTheme, consoleDarkerTheme, consoleLightTheme } from './themes'

/**
 * Built-in theme name accepted by `ThemesProvider`.
 */
export type ConsoleTheme = 'light' | 'dark' | 'darker'

const CONSOLE_THEMES = {
  light: consoleLightTheme,
  dark: consoleDarkTheme,
  darker: consoleDarkerTheme,
} as const

// CSS class names matching the selectors in vanilla/themes.css.ts
// (`:root`, `:root.dark-theme`, `:root.darker-theme`).
const THEME_CLASSES: Record<ConsoleTheme, string> = {
  light: 'light-theme',
  dark: 'dark-theme',
  darker: 'darker-theme',
}

const ALL_THEME_CLASSES = Object.values(THEME_CLASSES)

type ThemesContextValue = {
  /** The current theme object (same shape as `consoleLightTheme`). */
  theme: typeof consoleLightTheme
  /** The current theme name. */
  themeName: ConsoleTheme
  /** Switch to another built-in theme. */
  setThemeName: (theme: ConsoleTheme) => void
  /** Toggle between light and dark. */
  toggleTheme: () => void
}

const ThemesContext = createContext<ThemesContextValue | null>(null)

/**
 * Access the current theme and switching helpers.
 * Must be used within a `ThemesProvider`.
 */
export const useThemes = () => {
  const context = useContext(ThemesContext)
  if (!context) {
    throw new Error('useThemes must be used within a ThemesProvider')
  }

  return context
}

type ThemesProviderProps = {
  /**
   * Initial theme name. Defaults to `'light'`.
   *
   * On the client, the provider reads the user's preference from
   * `localStorage[storageKey]` (falling back to `prefers-color-scheme`)
   * before first paint, so this is only the SSR fallback.
   */
  defaultTheme?: ConsoleTheme
  /**
   * localStorage key used to persist the user's choice and read it
   * before hydration.
   *
   * @default 'uv-theme'
   */
  storageKey?: string
  children: ReactNode
}

/**
 * ThemesProvider is a static-CSS-first alternative to `ThemeProvider`.
 *
 * Instead of injecting CSS variables at runtime via a `<style>` tag, it
 * toggles pre-generated CSS classes (`light-theme`, `dark-theme`,
 * `darker-theme`) on the `<html>` element. The CSS variables are defined
 * statically via `createGlobalTheme` and shipped in the bundle.
 *
 * This means:
 * - **No FOUC** in SSR/SSG — variables are defined in static CSS before
 *   React hydrates, and a no-flash `<script>` applies the correct class
 *   even before that.
 * - **No runtime JS** required to define variables — the CSS files can be
 *   loaded via `<link>` or `import` and everything works.
 * - **Programmatic theme switching** via `useThemes()` hook.
 *
 * @example
 * ```tsx
 * import { ThemesProvider, useThemes } from '@ultraviolet/themes'
 *
 * const App = () => (
 *   <ThemesProvider>
 *     <YourApp />
 *   </ThemesProvider>
 * )
 *
 * const ThemeSwitcher = () => {
 *   const { themeName, toggleTheme } = useThemes()
 *   return <button onClick={toggleTheme}>{themeName}</button>
 * }
 * ```
 */
export const ThemesProvider = ({ children, defaultTheme = 'light', storageKey = 'uv-theme' }: ThemesProviderProps) => {
  const [themeName, setThemeNameState] = useState<ConsoleTheme>(defaultTheme)

  // Read the stored preference synchronously on mount (before paint).
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey) as ConsoleTheme | null
      if (stored && stored in CONSOLE_THEMES) {
        setThemeNameState(stored)
        return
      }
    } catch {
      // localStorage unavailable, keep default
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeNameState('dark')
    }
  }, [storageKey])

  // Toggle the CSS class on <html> whenever the theme changes.
  useLayoutEffect(() => {
    const list = document.documentElement.classList
    const activeClass = THEME_CLASSES[themeName]

    // Add the new class first, then remove old ones — prevents a frame
    // where no theme class is present (which would flash the :root light default).
    list.add(activeClass)
    ALL_THEME_CLASSES.forEach(cls => {
      if (cls !== activeClass) {
        list.remove(cls)
      }
    })
  }, [themeName])

  const setThemeName = useCallback(
    (next: ConsoleTheme) => {
      setThemeNameState(next)
      try {
        localStorage.setItem(storageKey, next)
      } catch {
        // ignore
      }
    },
    [storageKey],
  )

  const toggleTheme = useCallback(() => {
    setThemeName(themeName === 'light' ? 'dark' : 'light')
  }, [themeName, setThemeName])

  const value = useMemo<ThemesContextValue>(
    () => ({
      theme: CONSOLE_THEMES[themeName],
      themeName,
      setThemeName,
      toggleTheme,
    }),
    [themeName, setThemeName, toggleTheme],
  )

  return (
    <ThemesContext.Provider value={value}>
      <script
        data-uv-theme-key={storageKey}
        // oxlint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: noFlashScript }}
      />
      {children}
    </ThemesContext.Provider>
  )
}

// Re-export the theme contract and console themes for convenience.
export { theme as themeContract } from './vanilla/themes.css'
export { consoleThemesMap } from './themes'
export type { UltravioletUITheme } from './constants'
