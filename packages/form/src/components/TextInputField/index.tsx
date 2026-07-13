'use client'

import { TextInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'
import { useField } from './useField'

type TextInputFieldProps<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = BaseFieldProps<
  TFieldValues,
  TFieldName
> &
  Omit<ComponentProps<typeof TextInput>, 'value' | 'error' | 'name' | 'onChange'> & {
    regex?: (RegExp | RegExp[])[]
  }

/**
 * This component offers a form field based on Ultraviolet UI TextInput component
 */
export const TextInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  onChange,
  onBlur,
  control,
  ...props
}: TextInputFieldProps<TFieldValues, TFieldName>) => {
  const { fieldProps, error } = useField(props)

  return (
    <TextInput
      {...props}
      {...fieldProps}
      error={error}
      onBlur={event => {
        onBlur?.(event)
        fieldProps.onBlur(event)
      }}
      onChange={event => {
        fieldProps.onChange(event)
        onChange?.(event.target.value as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
    />
  )
}

TextInputField.displayName = 'TextInputField'
