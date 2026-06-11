import type { RequiredErrors } from '../../types'

export const defaultErrors: RequiredErrors = {
  deps: () => '',
  disabled: () => '',
  max: () => '',
  maxDate: () => '',
  maxLength: () => '',
  min: () => '',
  minLength: () => '',
  onBlur: () => '',
  onChange: () => '',
  pattern: () => '',
  required: () => '',
  setValueAs: () => '',
  shouldUnregister: () => '',
  isInteger: () => 'isInteger error',
  isNumber: () => 'isNumber error',
  validate: () => '',
  value: () => '',
  valueAsDate: () => '',
  valueAsNumber: () => '',
}
