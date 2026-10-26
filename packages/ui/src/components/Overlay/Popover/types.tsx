import type { CSSProperties, ReactNode } from 'react'
import type { SIZES_WIDTH } from './constant'

type SentimentType = 'neutral' | 'primary'

/**
 * @deprecated "auto" is not required since the Popover placement is always flipped if needed to remain visible.
 */
type LegacyPopoverPlacement = 'auto' | 'auto-top' | 'auto-bottom' | 'auto-left' | 'auto-right'

export type NewPopoverPlacement = 'top' | 'right' | 'bottom' | 'left'
export type PopoverPlacement = NewPopoverPlacement | LegacyPopoverPlacement

export type PopoverProps = {
  children: ReactNode
  content: ReactNode
  title: string
  sentiment?: SentimentType
  visible?: boolean
  size?: keyof typeof SIZES_WIDTH
  onClose?: () => void
  className?: string
  'data-testid'?: string
  /**
   * @deprecated the Popover has a fixed width derived from the `size` property.
   * This property is ignored and will be removed in the next major release.
   */
  maxWidth?: string
  /**
   * @deprecated the Popover should not truncate the content or scroll.
   * This property is ignored and will be removed in the next major release.
   */
  maxHeight?: string
  portalTarget?: HTMLElement
  placement?: PopoverPlacement
  /**
   * @deprecated the Popover is always centered
   * This property is ignored and will be removed in the next major release.
   */
  align?: 'start' | 'center'
  /**
   * @deprecated the popup is always rendered dynamically.
   * This property is ignored and will be removed in the next major release.
   */
  dynamicDomRendering?: boolean
  style?: CSSProperties
}

export type ContentWrapperProps = Pick<PopoverProps, 'title' | 'onClose' | 'sentiment' | 'children'> & {
  /**
   * id of the title, referenced by the popup panel's `aria-labelledby`.
   */
  titleId: string
}
