import type { TEXTINPUT_SIZE_HEIGHT } from './constants'
import type { InputHTMLAttributes, ReactNode } from 'react'

export type TextInputProps = {
  className?: string
  clearable?: boolean
  'data-testid'?: string
  error?: string
  helper?: ReactNode
  label?: string
  labelDescription?: ReactNode
  loading?: boolean
  minLength?: number
  maxLength?: number
  onRandomize?: () => void
  prefix?: ReactNode
  size?: keyof typeof TEXTINPUT_SIZE_HEIGHT
  success?: string | boolean
  suffix?: ReactNode
  tooltip?: string
  type?: 'text' | 'password' | 'url' | 'email'
  value?: string
  defaultValue?: string
  onChangeValue?: (value: string) => void
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'onFocus'
  | 'onBlur'
  | 'name'
  | 'id'
  | 'placeholder'
  | 'aria-label'
  | 'aria-labelledby'
  | 'disabled'
  | 'readOnly'
  | 'required'
  | 'autoFocus'
  | 'tabIndex'
  | 'autoComplete'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'role'
  | 'aria-live'
  | 'aria-atomic'
  | 'onChange'
  | 'style'
  | 'aria-describedby'
>
