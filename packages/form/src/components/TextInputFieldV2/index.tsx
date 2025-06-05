'use client'

import { TextInputV2 } from '@ultraviolet/ui'
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
    ComponentProps<typeof TextInputV2>,
    'value' | 'error' | 'name' | 'onChange'
  > & {
    regex?: (RegExp | RegExp[])[]
  }

/**
 * This component offers a form field based on Ultraviolet UI TextInputV2 component
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
    name,
    shouldUnregister,
    control,
    rules: {
      required,
      validate: {
        ...(regexes
          ? {
              pattern: value => validateRegex(value, regexes),
            }
          : {}),
        ...validate,
      },
      minLength,
      maxLength,
    },
  })

  return (
    <TextInputV2
      {...props}
      error={getError(
        {
          regex: regexes,
          minLength,
          maxLength,
          label: label ?? ariaLabel ?? name,
          value: field.value,
        },
        error,
      )}
      label={label}
      minLength={minLength}
      maxLength={maxLength}
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
      value={field.value === undefined ? '' : field.value}
      aria-label={ariaLabel}
    />
  )
}
