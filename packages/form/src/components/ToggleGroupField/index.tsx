'use client'

import { ToggleGroup } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useController } from 'react-hook-form'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type ToggleGroupFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof ToggleGroup>, 'value' | 'onChange'>

export const ToggleGroupField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  legend = '',
  control,
  onChange,
  error: customError,
  name,
  required = false,
  shouldUnregister = false,
  validate,
  ...props
}: ToggleGroupFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    control,
    shouldUnregister,
    rules: {
      validate: {
        ...(required ? { required: value => value.length > 0 } : undefined),
        ...validate,
      },
    },
  })

  const value = field.value as string[]

  return (
    <ToggleGroup
      {...props}
      legend={legend}
      name={field.name}
      value={value}
      onChange={event => {
        if (value.includes(event.currentTarget.value)) {
          const newValue = value.filter(
            currentValue => currentValue !== event.currentTarget.value,
          )
          field.onChange(newValue)
          onChange?.(newValue as PathValue<TFieldValues, Path<TFieldValues>>)
        } else {
          const newValue = [...value, event.currentTarget.value]
          field.onChange(newValue)
          onChange?.(newValue as PathValue<TFieldValues, Path<TFieldValues>>)
        }
      }}
      error={customError ?? getError({ label: legend }, error)}
      required={required}
    />
  )
}

ToggleGroupField.Toggle = ToggleGroup.Toggle
