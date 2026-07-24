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
  ...props
}: TimeInputFieldProps<TFieldValues, TFieldName>) => {
  const { fieldProps } = useField(props)

  return <TimeInput {...props} {...fieldProps} {...labelProps} />
}

TimeInputField.displayName = 'TimeInputField'
