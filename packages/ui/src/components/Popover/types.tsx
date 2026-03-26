import type { Popup } from '../Popup'
import type { SIZES_WIDTH } from './constant'
import type { ComponentProps, ReactNode } from 'react'

type SentimentType = 'neutral' | 'primary'

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
  maxWidth?: string
  maxHeight?: string
  /**
   * By default, the portal target is children container or document.body if children is a function. You can override this
   * behavior by setting a portalTarget prop.
   */
  portalTarget?: HTMLElement
  placement?: Exclude<ComponentProps<typeof Popup>['placement'], 'nested-menu'>
} & Pick<
  ComponentProps<typeof Popup>,
  'dynamicDomRendering' | 'align' | 'style'
>

export type ContentWrapperProps = Pick<
  PopoverProps,
  'title' | 'onClose' | 'sentiment' | 'children'
>
