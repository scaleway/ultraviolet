'use client'

import { OptionSelector } from '@ultraviolet/ui/compositions/OptionSelector'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

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
      error={getError({ label: label ?? ariaLabel ?? name }, error)}
      name={field.name}
      onChange={val => {
        field.onChange(val)
        onChange?.(val as { first?: string; second?: string })
      }}
      required={required}
      value={field.value}
      {...props}
    />
  )
}
