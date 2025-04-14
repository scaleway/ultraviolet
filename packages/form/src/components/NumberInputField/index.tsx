'use client'

import { NumberInput } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent, FocusEventHandler } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type NumberInputValueFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Partial<
    Pick<
      ComponentProps<typeof NumberInput>,
      | 'disabled'
      | 'maxValue'
      | 'minValue'
      | 'onMaxCrossed'
      | 'onMinCrossed'
      | 'size'
      | 'step'
      | 'text'
      | 'className'
    >
  > & {
    onBlur?: FocusEventHandler<HTMLInputElement>
    onFocus?: FocusEventHandler<HTMLInputElement>
  }

/**
 * @deprecated This component is deprecated, use `NumberInputFieldV2` instead.
 */
export const NumberInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  disabled,
  maxValue,
  minValue,
  name,
  onChange,
  onBlur,
  onFocus,
  onMaxCrossed,
  onMinCrossed,
  required,
  size,
  step,
  text,
  className,
  label,
  shouldUnregister = false,
  validate,
  control,
}: NumberInputValueFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    shouldUnregister,
    control,
    rules: {
      max: maxValue,
      min: minValue,
      required,
      validate,
    },
  })

  return (
    <NumberInput
      name={field.name}
      value={field.value}
      disabled={disabled}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        field.onBlur()
        onBlur?.(event)
      }}
      onChange={event => {
        // React hook form doesnt allow undefined values after definition https://react-hook-form.com/docs/usecontroller/controller (that make sense)
        field.onChange(event ?? null)
        onChange?.(event as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      onFocus={onFocus}
      maxValue={maxValue}
      minValue={minValue}
      onMinCrossed={onMinCrossed}
      onMaxCrossed={onMaxCrossed}
      size={size}
      step={step}
      text={text}
      className={className}
      label={label}
      error={getError(
        { label: label ?? '', max: maxValue, min: minValue },
        error,
      )}
    />
  )
}
