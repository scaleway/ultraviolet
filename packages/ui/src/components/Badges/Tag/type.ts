import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

export type TagProps = {
  isLoading?: boolean
  sentiment?: 'danger' | 'info' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning'
  disabled?: boolean
  copyText?: string
  copiedText?: string
  copiable?: boolean
  className?: string
  variant?: 'default' | 'code'
  'data-testid'?: string
  style?: CSSProperties
  onClose?: MouseEventHandler<HTMLButtonElement>
  /** Accessible name of the close button when onClose is defined.
   * The text is followed by the tag name (text content)
   * @default "Remove tag"
   */
  closeButtonText?: string
} & (
  | {
      keyValue: { key: string; value: string }
      children?: never
      copyButton?: never
    }
  | {
      keyValue?: never
      children: ReactNode
      copyButton?: boolean
    }
)
