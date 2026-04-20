'use client'

import { RichTextInput } from '@ultraviolet/ui/compositions/RichTextInput'
import { useController } from 'react-hook-form'

import { useErrors } from '../../providers'

import type { BaseFieldProps } from '../../types'
import type { ComponentProps, FocusEvent } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'

export type RichTextInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof RichTextInput>, 'value' | 'onChange' | 'error'>

export const RichTextInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  errorLabel,
  label,
  onChange,
  name,
  onBlur,
  required = false,
  validate,
  'aria-label': ariaLabel,
  ...props
}: RichTextInputFieldProps<TFieldValues, TFieldName>) => {
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
  })

  return (
    <RichTextInput
      {...props}
      error={getError(
        {
          label: errorLabel ?? label ?? ariaLabel ?? name,
          value: field.value,
        },
        error,
      )}
      onBlur={(event: FocusEvent<HTMLElement>) => {
        onBlur?.(event)
        field.onBlur()
      }}
      onChange={value => {
        field.onChange(value)
        onChange?.(value as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      value={field.value}
      {...(label ? { label } : { 'aria-label': ariaLabel! })}
    />
  )
}
