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
