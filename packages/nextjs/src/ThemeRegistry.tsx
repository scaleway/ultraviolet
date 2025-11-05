'use client'

import { ThemeProvider } from '@ultraviolet/themes'
import type { ComponentProps, ReactNode } from 'react'

type ThemeRegistryProps = {
  children: ReactNode
  theme: ComponentProps<typeof ThemeProvider>['theme']
}

/**
 * ThemeRegistry is a component that provides a theme to its children.
 * This solution is provided to work with Next.js app router.
 */
export const ThemeRegistry = ({ children, theme }: ThemeRegistryProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
