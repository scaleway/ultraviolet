'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect } from 'react'
import { consoleLightTheme } from './themes'
import { theme as themeContract } from './vanilla/themes.css'

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
 * ThemeProvider will apply generated global CSS variables to the application in the `<head>`.
 * If no theme is provided, it will default to `lightTheme`.
 */
export const ThemeProvider = ({
  children,
  theme = consoleLightTheme,
}: ThemeProviderProps) => {
  useEffect(() => {
    const styleId = 'uv-theme'
    const existingStyle = document.getElementById(styleId)
    const cssVars = assignInlineVars(themeContract, theme)
    const cssString = `:root { ${Object.entries(cssVars)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ')} }`

    if (existingStyle) {
      existingStyle.textContent = cssString
    } else {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = cssString
      document.head.appendChild(style)
    }

    return () => {
      const style = document.getElementById(styleId)
      if (style) {
        style.remove()
      }
    }
  }, [theme])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
