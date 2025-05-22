'use client'

import { VerificationCode } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type VerificationCodeFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof VerificationCode>, 'value'> & {
    id?: string
  }

export const VerificationCodeField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  fields,
  id = 'verification-code-input',
  label,
  name,
  onChange,
  required,
  validate,
  ...props
}: VerificationCodeFieldProps<TFieldValues, TName>) => {
  const { getError } = useErrors()

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    rules: {
      required,
      validate: {
        required: localValue => {
          if (required && localValue.length !== (fields ?? 4)) {
            return false
          }

          return true
        },
        ...validate,
      },
    },
  })

  return (
    <VerificationCode
      {...props}
      inputId={id}
      fields={fields}
      onChange={event => {
        onChange?.(event)
        field.onChange(event)
      }}
      required={required}
      error={getError({ label: label || 'verification-code-field' }, error)}
      label={label}
    />
  )
}
