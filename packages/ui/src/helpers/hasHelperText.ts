import type { ReactNode } from 'react'

export const canDisplay = (element: ReactNode) => Boolean(element) && typeof element !== 'boolean'

export const hasHelperText = (helper?: ReactNode, error?: ReactNode, success?: string | boolean) =>
  Boolean(helper) || canDisplay(error) || typeof success === 'string'
