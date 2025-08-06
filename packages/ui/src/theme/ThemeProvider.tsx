'use client'

import { consoleLightTheme, theme as themeContract } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

const ThemeContext = createContext(consoleLightTheme)

/**
 * Provide an object of the theme variables.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider imported from @ultraviolet/ui',
    )
  }

  return context
}

type ThemeProviderProps = {
  /**
   * Change the theme by passing a vanilla theme object.
   * If no theme is provided, it will default to `consolelightTheme`.
   */
  theme?: typeof consoleLightTheme
  children: ReactNode
}

/**
 * ThemeProvider will apply generated global CSS variables to the application.
 * If no theme is provided, it will default to `lightTheme`.
 */
export const ThemeProvider = ({
  children,
  theme = consoleLightTheme,
}: ThemeProviderProps) => (
  <ThemeContext.Provider value={theme}>
    <div style={assignInlineVars(themeContract, theme)}>{children}</div>
  </ThemeContext.Provider>
)
