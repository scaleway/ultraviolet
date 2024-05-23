import { UnitInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useController } from 'react-hook-form'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type UnitInputFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> &
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
  > & {
    onChange?: ComponentProps<typeof UnitInput>['onChange']
    onChangeUnitValue?: ComponentProps<typeof UnitInput>['onChangeUnitValue']
    label: string
  }

export const UnitInputField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
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
  rules,
  shouldUnregister = false,
  validate,
}: UnitInputFieldProps<TFieldValues, TName>) => {
  const { getError } = useErrors()
  const { field: unitField } = useController({
    name: `${name}-unit`,
    shouldUnregister,
    rules: { required },
  })

  const { field: valueField, fieldState: valueFieldState } =
    useController<TFieldValues>({
      name,
      shouldUnregister,
      rules: {
        required,
        min,
        max,
        ...rules,
        ...validate,
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
        onChange?.(event)
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
    />
  )
}
