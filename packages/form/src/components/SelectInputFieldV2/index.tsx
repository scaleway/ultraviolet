'use client'

import { SelectInputV2 } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useCallback } from 'react'
import type { FieldPath, FieldValues, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type SelectInputFieldV2Props<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof SelectInputV2>, 'value' | 'onChange'>

export const SelectInputFieldV2 = <
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
}: SelectInputFieldV2Props<TFieldValues, TFieldName>) => {
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
    typeof SelectInputV2<typeof multiselect>
  >['onChange'] = useCallback(
    (value: string | string[]) => {
      onChange?.(value as PathValue<TFieldValues, TFieldName>)
      field.onChange(value)
    },
    [onChange, field],
  )

  return (
    <SelectInputV2
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
