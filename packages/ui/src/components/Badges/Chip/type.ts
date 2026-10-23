import type { CSSProperties, ReactNode } from 'react'

export type ChipType = {
  children: ReactNode
  size?: 'medium' | 'large'
  disabled?: boolean
  active?: boolean
  className?: string
  'data-testid'?: string
  onClick?: (active: boolean) => void
  onClose?: () => void
  /**
   * Close button accessible label, rendered as a `VisuallyHidden` content
   */
  closeAccessibleLabel?: string
  style?: CSSProperties
}
