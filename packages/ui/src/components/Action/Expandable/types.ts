import type { CSSProperties, ReactNode } from 'react'

export type ExpandableProps = {
  /**
   * The content to display
   */
  children: ReactNode
  /**
   * To display or not the content
   */
  opened?: boolean
  /**
   * The minimum height of the content
   */
  minHeight?: number
  className?: string
  'data-testid'?: string
  /**
   * The duration of the animation in ms. If set to 0, the animation will be disabled.
   */
  animationDuration?: number
  style?: CSSProperties
}
