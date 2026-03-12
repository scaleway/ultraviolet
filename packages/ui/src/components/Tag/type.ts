import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'
import type { SENTIMENTS } from './styles.css'

export type TagProps = {
  isLoading?: boolean
  onClose?: MouseEventHandler<HTMLButtonElement>
  sentiment?: (typeof SENTIMENTS)[number]
  disabled?: boolean
  copiable?: boolean
  copyButton?: boolean
  copyText?: string
  copiedText?: string
  className?: string
  children: ReactNode
  variant?: 'default' | 'code'
  'data-testid'?: string
  style?: CSSProperties
}
