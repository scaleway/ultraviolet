import type { RefObject, InputHTMLAttributes, ReactNode } from 'react'
import type { SIZES } from './constant'
type Sizes = keyof typeof SIZES

export type NumberInputProps = {
  size?: Sizes
  /**
   * Text displayed into component at the right of number value.
   */
  unit?: string
  tooltip?: string
  className?: string
  'data-testid'?: string
  label?: string
  /**
   * Label description displayed right next to the label. It allows you to customize the label content.
   */
  labelDescription?: ReactNode
  /**
   * Whether to show controls
   */
  controls?: boolean
  error?: string | boolean
  success?: string | boolean
  helper?: ReactNode
  value?: number | null
  onChange?: (newValue: number | null) => void
  min?: number
  max?: number
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'onFocus'
  | 'onBlur'
  | 'name'
  | 'id'
  | 'placeholder'
  | 'aria-label'
  | 'disabled'
  | 'step'
  | 'readOnly'
  | 'required'
  | 'autoFocus'
  | 'style'
  | 'aria-describedby'
>

export type ControlsProps = {
  controls?: NumberInputProps['controls']
  direction: 'up' | 'down'
  size: keyof typeof SIZES
  localRef: RefObject<HTMLInputElement | null>
  max?: NumberInputProps['max']
  min?: NumberInputProps['min']
  isDisabledOrReadOnly?: boolean
  onChange?: NumberInputProps['onChange']
}

export type UnitProps = {
  unit?: string
  disabled?: boolean
  readOnly?: boolean
  size: 'large' | 'medium' | 'small'
  controls?: NumberInputProps['controls']
}
