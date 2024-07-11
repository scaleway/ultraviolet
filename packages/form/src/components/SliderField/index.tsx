import { Slider } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent, ReactNode } from 'react'
import { useController } from 'react-hook-form'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type SliderFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Pick<
    ComponentProps<typeof Slider>,
    | 'name'
    | 'label'
    | 'helper'
    | 'tooltip'
    | 'direction'
    | 'input'
    | 'prefix'
    | 'unit'
    | 'required'
    | 'possibleValues'
    | 'disabled'
    | 'error'
    | 'options'
    | 'data-testid'
    | 'min'
    | 'double'
    | 'max'
    | 'step'
    | 'id'
    | 'onBlur'
    | 'onFocus'
    | 'className'
    | 'tooltipPosition'
    | 'aria-label'
  > & {
    suffix?: string | ReactNode[]
  }

export const SliderField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  shouldUnregister,
  max,
  min,
  required,
  validate,
  onBlur,
  onChange,
  label,
  value,
  defaultValue,
  ...props
}: SliderFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    control,
    shouldUnregister,
    rules: {
      max,
      min,
      required,
      validate,
    },
  })

  return (
    <Slider
      name={field.name}
      value={field.value}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        field.onBlur()
        onBlur?.(event)
      }}
      onChange={(newValue: number | number[]) => {
        field.onChange(newValue)
        onChange?.(newValue as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      max={max}
      min={min}
      error={getError({ label: label ?? '', max, min }, error)}
      label={label}
      required={required}
      {...props}
    />
  )
}
