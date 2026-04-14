'use client'

import { RichTextEditor } from '@ultraviolet/ui/compositions/RichTextEditor'
import { useController } from 'react-hook-form'

import { useErrors } from '../../providers'

import type { BaseFieldProps } from '../../types'
import type { ComponentProps, FocusEvent } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'

export type RichTextEditorFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof RichTextEditor>, 'value' | 'onChange' | 'error'>

export const RichTextEditorField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  label,
  onChange,
  name,
  onBlur,
  required = false,
  validate,
  'aria-label': ariaLabel,
  ...props
}: RichTextEditorFieldProps<TFieldValues, TFieldName>) => {
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
    <RichTextEditor
      {...props}
      error={getError(
        {
          label: label ?? ariaLabel ?? name,
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
