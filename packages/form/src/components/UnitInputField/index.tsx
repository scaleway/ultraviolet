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
    | 'size'
    | 'unitValue'
    | 'required'
    | 'width'
    | 'selectInputWidth'
  > & {
    onChange?: ComponentProps<typeof UnitInput>['onChange']
    onChangeUnitValue?: ComponentProps<typeof UnitInput>['onChangeUnitValue']
    label: string
    minValueMessage?: string
    maxValueMessage?: string
    requiredMessage?: string
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
  onChange,
  onChangeUnitValue,
  disabled,
  options,
  className,
  label,
  required,
  width,
  requiredMessage = 'Required',
  minValueMessage = 'Minimum value',
  maxValueMessage = 'Maximum value',
  selectInputWidth,
  shouldUnregister = false,
}: UnitInputFieldProps<TFieldValues, TName>) => {
  const { getError } = useErrors()

  const { field: unitField } = useController({
    name: `${name}-unit`,
    shouldUnregister,
  })

  const { field: valueField, fieldState: valueFieldState } = useController({
    name: `${name}-value`,
    shouldUnregister,
    rules: {
      required: required ? requiredMessage : undefined,
      max: max
        ? {
            value: max,
            message: maxValueMessage,
          }
        : undefined,
      min: min
        ? {
            value: min,
            message: minValueMessage,
          }
        : undefined,
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
    />
  )
}
