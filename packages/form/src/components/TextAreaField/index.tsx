import { TextArea } from '@ultraviolet/ui'
import type { FieldState } from 'final-form'
import type { ComponentProps } from 'react'
import { useFormField } from '../../hooks'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

export type TextAreaFieldProps = Pick<
  BaseFieldProps<string, string>,
  'validate'
> &
  Omit<
    ComponentProps<typeof TextArea>,
    'value' | 'onChange' | 'error' | 'name'
  > & {
    regex?: (RegExp | RegExp[])[]
    name: string
  }

export const TextAreaField = ({
  autoFocus,
  clearable,
  'data-testid': dataTestId,
  disabled,
  helper,
  label,
  labelDescription,
  minLength,
  maxLength,
  name,
  onFocus,
  onBlur,
  placeholder,
  readOnly,
  required,
  rows,
  success,
  tooltip,
  validate,
  regex,
}: TextAreaFieldProps) => {
  const { getError } = useErrors()

  const { input, meta } = useFormField<string>(name, {
    disabled,
    required,
    type: '',
    validate,
    regex,
  })

  const error = getError({
    label,
    maxLength,
    name,
    value: input.value,
    regex,
    meta: meta as FieldState<string>,
  })

  return (
    <TextArea
      autoFocus={autoFocus}
      clearable={clearable}
      data-testid={dataTestId}
      disabled={disabled}
      error={error}
      helper={helper}
      label={label}
      labelDescription={labelDescription}
      minLength={minLength}
      maxLength={maxLength}
      name={name}
      onBlur={event => {
        onBlur?.(event)
        input.onBlur()
      }}
      onChange={input.onChange}
      onFocus={event => {
        onFocus?.(event)
        input.onFocus()
      }}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      rows={rows}
      success={success}
      tooltip={tooltip}
      value={input.value}
    />
  )
}
