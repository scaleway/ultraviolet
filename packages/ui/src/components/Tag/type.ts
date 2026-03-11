import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'
import type { SENTIMENTS } from './styles.css'

export type TagProps = {
  isLoading?: boolean
  sentiment?: (typeof SENTIMENTS)[number]
  disabled?: boolean

  className?: string
  variant?: 'default' | 'code'
  'data-testid'?: string
  style?: CSSProperties
} & (
  | {
      keyValue: { key: string; value: string }
      children?: never
      copiable?: never
      copyButton?: never
      copyText?: never
      copiedText?: never
      onClose?: never
    }
  | {
      keyValue?: never
      children: ReactNode
      copiable?: boolean
      copyButton?: boolean
      copyText?: string

      copiedText?: string
      onClose?: MouseEventHandler<HTMLButtonElement>
    }
)
