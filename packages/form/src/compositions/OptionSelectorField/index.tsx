'use client'

import { OptionSelector } from '@ultraviolet/ui/compositions/OptionSelector'
import { useController } from 'react-hook-form'

import { useErrors } from '../../providers'

import type { BaseFieldProps } from '../../types'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'

type OptionSelectorFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof OptionSelector>, 'value'>

export const OptionSelectorField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label = '',
  required,
  name,
  'aria-label': ariaLabel,
  shouldUnregister = false,
  control,
  validate,
  onChange,
  errorLabel,
  ...props
}: OptionSelectorFieldProps<TFieldValues, TFieldName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    control,
    name,
    rules: {
      required,
      validate: {
        completeSelection: (value?: { first?: string; second?: string }) => {
          if (value?.first && value.second) {
            return true
          }

          return false
        },
        ...validate,
      },
    },
    shouldUnregister,
  })

  const { getError } = useErrors()

  return (
    <OptionSelector
      aria-label={ariaLabel}
      error={getError(
        { label: errorLabel ?? label ?? ariaLabel ?? name },
        error,
      )}
      name={field.name}
      onChange={val => {
        field.onChange({ first: val.first, second: val.second })
        onChange?.(
          val as {
            first?: string
            second?: string
            changingValue: 'first' | 'second'
          },
        )
      }}
      required={required}
      value={field.value}
      {...props}
    />
  )
}
