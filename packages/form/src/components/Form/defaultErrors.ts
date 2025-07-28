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
  validate: () => '',
  value: () => '',
  valueAsDate: () => '',
  valueAsNumber: () => '',
}
