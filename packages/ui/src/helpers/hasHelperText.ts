import type { ReactNode } from 'react'

export const canDisplay = (element: ReactNode) =>
  element && typeof element !== 'boolean'

export const hasHelperText = (
  helper?: ReactNode,
  error?: ReactNode,
  success?: string | boolean,
) => helper || canDisplay(error) || typeof success === 'string'
