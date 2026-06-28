import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'
import type { SENTIMENTS } from './styles.css'

export type TagProps = {
  isLoading?: boolean
  sentiment?: (typeof SENTIMENTS)[number]
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
