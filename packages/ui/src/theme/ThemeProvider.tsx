'use client'

import { iconStyles } from '@ultraviolet/icons/iconStyles'
import { consoleLightTheme, theme as themeContract } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ReactNode } from 'react'
import { createContext, useContext, useLayoutEffect } from 'react'

const ThemeContext = createContext(consoleLightTheme)

/**
 * Provide an object of the theme variables.
 */
// oxlint-disable-next-line react/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider imported from @ultraviolet/themes',
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
  useLayoutEffect(() => {
    const styleId = 'uv-theme'
    const iconsStyleId = 'uv-icons'

    const existingIconsStyle = document.getElementById(iconsStyleId)
    const existingStyle = document.getElementById(styleId)
    const cssVars = assignInlineVars(themeContract, theme)
    const cssString = `:root { ${Object.entries(cssVars)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ')} }
      
      body {
        color: ${theme.colors.neutral.text};
        background-color: ${theme.colors.neutral.background};
      }
    `

    if (existingStyle) {
      existingStyle.textContent = cssString
    } else {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = cssString
      document.head.appendChild(style)
    }

    if (existingIconsStyle) {
      existingIconsStyle.textContent = iconStyles
    } else {
      const iconsStyle = document.createElement('style')
      iconsStyle.id = iconsStyleId
      iconsStyle.textContent = iconStyles
      document.head.appendChild(iconsStyle)
    }

    return () => {
      const style = document.getElementById(styleId)
      const iconsStyle = document.getElementById(iconsStyleId)

      if (style) {
        style.remove()
      }
      if (iconsStyle) {
        iconsStyle.remove()
      }
    }
  }, [theme])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
