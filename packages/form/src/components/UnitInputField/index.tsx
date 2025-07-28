'use client'

import { UnitInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type UnitInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof UnitInput>, 'value' | 'onChange' | 'label'> & {
    optionName?: string
  }

export const UnitInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  max = Number.MAX_SAFE_INTEGER,
  min = 0,
  onChange,
  onChangeUnitValue,
  label = '',
  required,
  shouldUnregister = false,
  validate,
  control,
  optionName,
  ...props
}: UnitInputFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const { field: unitField } = useController({
    name: optionName ?? `${name}-unit`,
    rules: { required },
    shouldUnregister,
  })

  const { field: valueField, fieldState: valueFieldState } = useController<
    TFieldValues,
    TFieldName
  >({
    control,
    name,
    rules: {
      max,
      min,
      required,
      validate,
    },
    shouldUnregister,
  })

  return (
    <UnitInput
      {...props}
      error={getError({ label }, valueFieldState.error)}
      label={label}
      max={max}
      min={min}
      name={name}
      onChange={event => {
        valueField.onChange(event)
        onChange?.(event as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      onChangeUnitValue={event => {
        unitField.onChange(event)
        onChangeUnitValue?.(event)
      }}
      required={required}
      unitValue={unitField.value as string}
      value={valueField.value as number}
    />
  )
}
