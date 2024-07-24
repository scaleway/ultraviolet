import { Radio } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type RadioFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = Omit<BaseFieldProps<TFieldValues, TFieldName>, 'label'> &
  Omit<ComponentProps<typeof Radio>, 'value' | 'onChange' | 'aria-label'>

/**
 * @deprecated This component is deprecated, use `RadioGroupField` instead.
 */
export const RadioField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  disabled,
  name,
  onBlur,
  label = '',
  onChange,
  onFocus,
  required,
  value,
  shouldUnregister = false,
  validate,
  ...props
}: RadioFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    control,
    shouldUnregister,
    rules: {
      required,
      validate,
    },
  })

  return (
    <Radio
      {...props}
      name={field.name}
      checked={field.value === value}
      disabled={disabled}
      error={getError({ label: typeof label === 'string' ? label : '' }, error)}
      onChange={() => {
        field.onChange(value)
        onChange?.(value)
      }}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      onFocus={onFocus}
      required={required}
      value={value ?? ''}
      label={label}
    />
  )
}
