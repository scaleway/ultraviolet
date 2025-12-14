'use client'

import { ToggleGroup } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type ToggleGroupFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof ToggleGroup>, 'value' | 'onChange'>

const ToggleGroupFieldComponent = <
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
    control,
    name,
    rules: {
      validate: {
        ...(required ? { required: value => value.length > 0 } : undefined),
        ...validate,
      },
    },
    shouldUnregister,
  })

  const value = field.value as string[]

  return (
    <ToggleGroup
      {...props}
      error={customError ?? getError({ label: legend }, error)}
      legend={legend}
      name={field.name}
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
      required={required}
      value={value}
    />
  )
}

type RadioGroupFieldType = typeof ToggleGroupFieldComponent & {
  Toggle: typeof ToggleGroup.Toggle
}

export const ToggleGroupField: RadioGroupFieldType = Object.assign(
  ToggleGroupFieldComponent,
  {
    Toggle: ToggleGroup.Toggle,
  },
)
