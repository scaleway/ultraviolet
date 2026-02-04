'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { JSX, PropsWithChildren } from 'react'
import { createContext, useContext, useLayoutEffect } from 'react'
import { consoleLightTheme } from './themes'
import { theme as themeContract } from './vanilla/themes.css'

const ThemeContext = createContext(consoleLightTheme)

/**
 * Provide an object of the theme variables.
 */

type UseTheme = () => typeof consoleLightTheme

// oxlint-disable-next-line react/only-export-components
export const useTheme: UseTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider imported from @ultraviolet/ui',
    )
  }

  return context
}

type ThemeProviderComponent = (
  args: PropsWithChildren<{
    theme: typeof consoleLightTheme
  }>,
) => JSX.Element
/**
 * ThemeProvider will apply generated global CSS variables to the application in the `<head>`.
 * If no theme is provided, it will default to `lightTheme`.
 */
export const ThemeProvider: ThemeProviderComponent = ({
  children,
  theme = consoleLightTheme,
}) => {
  useLayoutEffect(() => {
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
