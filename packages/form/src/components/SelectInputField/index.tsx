'use client'

import { SelectInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useCallback } from 'react'
import type { FieldPath, FieldValues, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type SelectInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof SelectInput>, 'value' | 'onChange'>

export const SelectInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label = '',
  onBlur,
  required,
  name,
  'aria-label': ariaLabel,
  shouldUnregister = false,
  control,
  validate,
  onChange,
  multiselect,
  ...props
}: SelectInputFieldProps<TFieldValues, TFieldName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    control,
    shouldUnregister,
    rules: {
      required,
      validate,
    },
  })

  const { getError } = useErrors()

  const handleChange: ComponentProps<
    typeof SelectInput<typeof multiselect>
  >['onChange'] = useCallback(
    (value: string | string[]) => {
      onChange?.(value as PathValue<TFieldValues, TFieldName>)
      field.onChange(value)
    },
    [onChange, field],
  )

  return (
    <SelectInput
      name={field.name}
      multiselect={multiselect}
      required={required}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      value={field.value as string | string[]}
      error={getError({ label: label ?? ariaLabel ?? name }, error)}
      label={label}
      aria-label={ariaLabel}
      onChange={handleChange}
      {...props}
    />
  )
}
