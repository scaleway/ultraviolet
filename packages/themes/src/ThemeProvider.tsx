'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { createContext, useContext, useLayoutEffect } from 'react'
import type { ReactNode } from 'react'
import { consoleLightTheme } from './themes'
import { theme as themeContract } from './vanilla/themes.css'

const ThemeContext = createContext(consoleLightTheme)

/**
 * Provide an object of the theme variables.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider imported from @ultraviolet/ui')
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
  cssLayer?: string
}

/**
 * ThemeProvider applies the theme variables to the application.
 * If no theme is provided, it will default to `lightTheme`.
 */
export const ThemeProvider = ({ children, theme = consoleLightTheme, cssLayer }: ThemeProviderProps) => {
  useLayoutEffect(() => {
    const cssVars = assignInlineVars(themeContract, theme)
    const styleId = 'uv-theme'
    const existingStyle = document.getElementById(styleId)
    const cssString = Object.entries(cssVars)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ')

    if (cssString) {
      const css = `:root { ${cssString} }
       body {
        color: ${theme.colors.neutral.text};
        background-color: ${theme.colors.neutral.background};
      }
      `

      const layeredCssString = cssLayer ? `@layer ${cssLayer} { ${css} }` : css

      if (existingStyle) {
        existingStyle.textContent = layeredCssString
      } else {
        const style = document.createElement('style')
        style.id = styleId
        style.textContent = layeredCssString
        document.head.appendChild(style)
      }
    } else if (existingStyle) {
      existingStyle.remove()
    }

    return () => {
      const style = document.getElementById(styleId)
      if (style) {
        style.remove()
      }
    }
  }, [theme, cssLayer])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
