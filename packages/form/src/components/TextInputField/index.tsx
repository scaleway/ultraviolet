'use client'

import { TextInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'
import { validateRegex } from '../../utils/validateRegex'

type TextInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<
    ComponentProps<typeof TextInput>,
    'value' | 'error' | 'name' | 'onChange'
  > & {
    regex?: (RegExp | RegExp[])[]
  }

/**
 * This component offers a form field based on Ultraviolet UI TextInput component
 */
export const TextInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  regex: regexes,
  onChange,
  label,
  required = false,
  name,
  onBlur,
  minLength,
  maxLength,
  'aria-label': ariaLabel,
  shouldUnregister,
  validate,
  control,
  ...props
}: TextInputFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()

  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    control,
    name,
    rules: {
      maxLength,
      minLength,
      required,
      validate: {
        ...(regexes
          ? {
              pattern: value => validateRegex(value, regexes),
            }
          : {}),
        ...validate,
      },
    },
    shouldUnregister,
  })

  return (
    <TextInput
      {...props}
      aria-label={ariaLabel}
      error={getError(
        {
          label: label ?? ariaLabel ?? name,
          maxLength,
          minLength,
          regex: regexes,
          value: field.value,
        },
        error,
      )}
      label={label}
      maxLength={maxLength}
      minLength={minLength}
      name={name}
      onBlur={event => {
        onBlur?.(event)
        field.onBlur()
      }}
      onChange={event => {
        field.onChange(event)
        onChange?.(
          event.target.value as PathValue<TFieldValues, Path<TFieldValues>>,
        )
      }}
      required={required}
      value={field.value ?? ''}
    />
  )
}
