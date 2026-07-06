import { ComponentProps, CSSProperties } from 'react'
import { Button } from '../Button'
import { SelectInput } from '../SelectInput'
import { TextInput } from '../TextInput'

type TextInputProps = {
  inputType?: 'text'
  regex?: (RegExp | RegExp[])[]
}

type SelectInputProps = {
  inputType: 'select'
  options: ComponentProps<typeof SelectInput>['options']
}

type InputProps = XOR<[TextInputProps, SelectInputProps]>

type InputKeyProps = {
  label: ComponentProps<typeof TextInput>['label']
  required?: ComponentProps<typeof TextInput>['required']
} & InputProps

type InputValueProps = {
  type?: ComponentProps<typeof TextInput>['type']
  placeholder?: ComponentProps<typeof TextInput>['placeholder']
} & InputKeyProps

type AddButtonProps = {
  name: ComponentProps<typeof Button>['children']
  fullWidth?: ComponentProps<typeof Button>['fullWidth']
  tooltip?: string
  maxSizeReachedTooltip?: string
}

export type KeyValuePair = {
  key: string
  value: string
}

export type KeyValueInputProps = {
  name?: string
  keyvalues?: KeyValuePair[]
  size?: 'small' | 'medium' | 'large'
  required?: boolean
  maxSize?: number
  inputKey: InputKeyProps
  inputValue: InputValueProps
  addButton: AddButtonProps
  disabled?: boolean
  readOnly?: boolean
  error?: boolean | string
  onChange?: (keyValues: KeyValuePair[]) => void
  onBlur?: (keyValues: KeyValuePair[]) => void
  onFocus?: (keyValues: KeyValuePair[]) => void
  style?: CSSProperties
  className?: string
  'data-testid'?: string
  'aria-describedby'?: string
}
