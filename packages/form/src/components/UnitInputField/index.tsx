'use client'

import { UnitInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useController } from 'react-hook-form'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type UnitInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Pick<
    ComponentProps<typeof UnitInput>,
    | 'id'
    | 'name'
    | 'className'
    | 'data-testid'
    | 'disabled'
    | 'value'
    | 'max'
    | 'min'
    | 'options'
    | 'placeholder'
    | 'placeholderUnit'
    | 'size'
    | 'unitValue'
    | 'required'
    | 'width'
    | 'helper'
    | 'selectInputWidth'
    | 'dropdownAlign'
  > & {
    onChangeUnitValue?: ComponentProps<typeof UnitInput>['onChangeUnitValue']
    label: string
    optionName?: string
  }

export const UnitInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  id,
  name,
  max = Number.MAX_SAFE_INTEGER,
  min = 0,
  size,
  placeholder,
  placeholderUnit,
  onChange,
  onChangeUnitValue,
  disabled,
  options,
  className,
  label,
  required,
  width,
  selectInputWidth,
  helper,
  shouldUnregister = false,
  validate,
  control,
  optionName,
  dropdownAlign,
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
      id={id}
      name={name}
      required={required}
      max={max}
      min={min}
      error={getError({ label }, valueFieldState.error)}
      size={size}
      placeholder={placeholder}
      helper={helper}
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
      selectInputWidth={selectInputWidth}
      disabled={disabled}
      options={options}
      label={label}
      className={className}
      width={width}
      placeholderUnit={placeholderUnit}
      dropdownAlign={dropdownAlign}
    />
  )
}
