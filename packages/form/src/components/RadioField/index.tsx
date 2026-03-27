'use client'

import { Radio } from '@ultraviolet/ui'
import { useMemo } from 'react'
import { useController } from 'react-hook-form'

import { useErrors } from '../../providers'

import type { BaseFieldProps } from '../../types'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'

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
  errorLabel,
  'aria-label': ariaLabel,
  ...props
}: RadioFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    control,
    name,
    rules: {
      required,
      validate,
    },
    shouldUnregister,
  })

  const computedErrorLabel = useMemo(() => {
    if (errorLabel) {
      return errorLabel
    }
    if (label && typeof label === 'string') {
      return label
    }

    if (ariaLabel) {
      return ariaLabel
    }

    return name
  }, [label, name, ariaLabel, errorLabel])

  return (
    <Radio
      {...props}
      checked={field.value === value}
      disabled={disabled}
      error={getError({ label: computedErrorLabel }, error)}
      name={field.name}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      onChange={() => {
        field.onChange(value)
        onChange?.(value)
      }}
      onFocus={onFocus}
      required={required}
      value={value ?? ''}
      {...(label ? { label } : { 'aria-label': ariaLabel! })}
    />
  )
}
