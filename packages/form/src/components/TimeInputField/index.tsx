'use client'

import { TimeInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useField } from '../../hooks/useField'
import type { BaseFieldProps } from '../../types'

type TimeInputFieldProps<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = BaseFieldProps<
  TFieldValues,
  TFieldName
> &
  Omit<ComponentProps<typeof TimeInput>, 'value' | 'error' | 'name' | 'onChange'>

/**
 * This component offers a form field based on Ultraviolet UI TimeInput component
 *  @experimental This component is experimental and may be subject to breaking changes in the future.
 */
export const TimeInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  label,
  required = false,
  'aria-label': ariaLabel,
  ...props
}: TimeInputFieldProps<TFieldValues, TFieldName>) => {
  const { fieldProps } = useField({ ...props, required, label, 'aria-label': ariaLabel })

  return (
    <TimeInput
      {...props}
      error={fieldProps.error}
      onBlur={fieldProps.onBlur}
      onChange={fieldProps.onChange}
      required={required}
      value={fieldProps.value}
      {...(label ? { label } : { 'aria-label': ariaLabel! })}
    />
  )
}

TimeInputField.displayName = 'TimeInputField'
