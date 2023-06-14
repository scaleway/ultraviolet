import type { RequiredErrors } from '../../types'

export const defaultErrors: RequiredErrors = {
  maxDate: () => '',
  maxLength: () => '',
  minLength: () => '',
  max: () => '',
  min: () => '',
  required: () => '',
  pattern: () => '',
  deps: () => '',
  value: () => '',
  onBlur: () => '',
  disabled: () => '',
  onChange: () => '',
  validate: () => '',
  setValueAs: () => '',
  valueAsDate: () => '',
  valueAsNumber: () => '',
  shouldUnregister: () => '',
}
