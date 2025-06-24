'use client'

import { Radio } from '@ultraviolet/ui'
import { type ComponentProps, useMemo } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type RadioFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = Omit<BaseFieldProps<TFieldValues, TFieldName>, 'label'> &
  Omit<ComponentProps<typeof Radio>, 'value' | 'onChange'>

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
  'aria-label': ariaLabel,
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

  const errorLabel = useMemo(() => {
    if (label && typeof label === 'string') {
      return label
    }

    if (ariaLabel) {
      return ariaLabel
    }

    return name
  }, [label, name, ariaLabel])

  return (
    <Radio
      {...props}
      name={field.name}
      checked={field.value === value}
      disabled={disabled}
      error={getError({ label: errorLabel }, error)}
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
      {...(label ? { label } : { 'aria-label': ariaLabel as string })}
    />
  )
}
