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
    shouldUnregister,
    rules: { required },
  })

  const { field: valueField, fieldState: valueFieldState } = useController<
    TFieldValues,
    TFieldName
  >({
    name,
    shouldUnregister,
    control,
    rules: {
      required,
      min,
      max,
      validate,
    },
  })

  return (
    <UnitInput
      {...props}
      name={name}
      required={required}
      max={max}
      min={min}
      error={getError({ label }, valueFieldState.error)}
      onChange={event => {
        valueField.onChange(event)
        onChange?.(event as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      onChangeUnitValue={event => {
        unitField.onChange(event)
        onChangeUnitValue?.(event)
      }}
      value={valueField.value as number}
      unitValue={unitField.value as string}
      label={label}
    />
  )
}
