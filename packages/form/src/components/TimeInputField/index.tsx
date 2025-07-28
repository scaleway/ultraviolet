'use client'

import { TimeInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type TimeInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<
    ComponentProps<typeof TimeInput>,
    'value' | 'error' | 'name' | 'onChange'
  >

/**
 * This component offers a form field based on Ultraviolet UI TimeInput component
 *  @experimental This component is experimental and may be subject to breaking changes in the future.
 */
export const TimeInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  onChange,
  label,
  required = false,
  name,
  onBlur,
  'aria-label': ariaLabel,
  shouldUnregister,
  control,
  ...props
}: TimeInputFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()

  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    control,
    name,
    rules: {
      required,
    },
    shouldUnregister,
  })

  return (
    <TimeInput
      {...props}
      error={getError(
        {
          label: label ?? ariaLabel ?? name,
          value: field.value,
        },
        error,
      )}
      label={label}
      onBlur={event => {
        onBlur?.(event)
        field.onBlur()
      }}
      onChange={value => {
        field.onChange(value)
        onChange?.(value as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      required={required}
      value={field.value}
    />
  )
}
