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
 * Computes the CSS variables that differ from what is already defined on the document
 * (from direct import, e.g @ultraviolet/themes/light.css).
 */
const getMissingVars = (theme: typeof consoleLightTheme) => {
  const cssVars = assignInlineVars(themeContract, theme)
  const computedStyle = getComputedStyle(document.documentElement)

  // Guard against environments where getComputedStyle does not return a real CSSStyleDeclaration
  if (typeof computedStyle?.getPropertyValue !== 'function') {
    return cssVars
  }

  const missing: Record<string, string> = {}

  for (const [key, value] of Object.entries(cssVars)) {
    if (computedStyle.getPropertyValue(key) !== value) {
      missing[key] = value
    }
  }

  return missing
}

/**
 * ThemeProvider applies the theme variables to the application.
 * If no theme is provided, it will default to `lightTheme`.
 */
export const ThemeProvider = ({ children, theme = consoleLightTheme, cssLayer }: ThemeProviderProps) => {
  useLayoutEffect(() => {
    const missingVars = getMissingVars(theme)
    const styleId = 'uv-theme'
    const existingStyle = document.getElementById(styleId)
    const cssString = Object.entries(missingVars)
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
