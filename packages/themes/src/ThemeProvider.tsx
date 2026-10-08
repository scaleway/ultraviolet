'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { createContext, useContext, useLayoutEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import { consoleLightTheme } from './themes'
import { theme as themeContract } from './vanilla/themes.css'

const ThemeContext = createContext({ ...consoleLightTheme, defined: false })

/**
 * Provide an object of the theme variables.
 * @deprecated use `v2/useTheme` instead
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)
  // oxlint-disable-next-line typescript/no-unnecessary-condition
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
}

/**
 * ThemeProvider applies the theme variables to the application.
 * If no theme is provided, it will default to `lightTheme`.
 * @deprecated use `v2/ThemeProvider` instead
 */
export const ThemeProvider = ({ children, theme = consoleLightTheme }: ThemeProviderProps) => {
  useLayoutEffect(() => {
    const cssVars = assignInlineVars(themeContract, theme)
    const styleId = 'uv-theme'
    const existingStyle = document.querySelector(`#${styleId}`)
    const cssString = Object.entries(cssVars)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ')

    const css = `:root { ${cssString} }`

    if (existingStyle) {
      existingStyle.textContent = css
    } else {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = css
      document.head.append(style)
    }

    return () => {
      const style = document.querySelector(`#${styleId}`)
      if (style) {
        style.remove()
      }
    }
  }, [theme])

  const value = useMemo(
    () => ({
      ...theme,
      defined: true,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
