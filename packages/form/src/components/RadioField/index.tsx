import { Radio } from '@scaleway/ui'
import type { FieldState } from 'final-form'
import type { ComponentProps, ReactNode } from 'react'
import { useFormField } from '../../hooks'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type RadioValue = NonNullable<ComponentProps<typeof Radio>['value']>

type RadioFieldProps<T = RadioValue, K = string> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof Radio>,
      'disabled' | 'id' | 'onBlur' | 'onChange' | 'onFocus' | 'size' | 'value'
    >
  > & {
    children?: ReactNode
    className?: string
    label?: string
    name: string
    required?: boolean
  }

export const RadioField = ({
  children,
  className,
  disabled,
  id,
  label = '',
  name,
  onBlur,
  onChange,
  onFocus,
  required,
  size,
  validate,
  value,
}: RadioFieldProps): JSX.Element => {
  const { getError } = useErrors()

  const { input, meta } = useFormField(name, {
    required,
    type: 'radio',
    validate,
    value,
  })

  const error = getError({
    disabled,
    label,
    meta: meta as FieldState<unknown>,
    name,
    value: input.value,
  })

  return (
    <Radio
      checked={input.checked}
      className={className}
      disabled={disabled}
      error={error}
      id={id}
      name={input.name}
      onChange={event => {
        input.onChange(event)
        onChange?.(event)
      }}
      onBlur={event => {
        input.onBlur(event)
        onBlur?.(event)
      }}
      onFocus={event => {
        input.onFocus(event)
        onFocus?.(event)
      }}
      required={required}
      size={size}
      value={input.value}
    >
      {children}
    </Radio>
  )
}
