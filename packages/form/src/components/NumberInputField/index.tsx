'use client'

import { NumberInput } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent } from 'react'
import { useController } from 'react-hook-form'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type NumberInput = ComponentProps<typeof NumberInput>

export type NumberInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = NumberInput & BaseFieldProps<TFieldValues, TFieldName, NumberInput['value']>

export const NumberInputField = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  max = Number.MAX_SAFE_INTEGER,
  min = 0,
  name,
  onChange,
  onBlur,
  step,
  label,
  'aria-label': ariaLabel,
  required,
  shouldUnregister = false,
  validate,
  errorLabel,
  ...props
}: NumberInputFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    control,
    name,
    rules: {
      max,
      min,
      required,
      validate: {
        ...validate,
        // isNumber will never happen with input[type=number] as onChange is never trigger
        isNumber: (value: NumberInput['value']) => {
          if (!required && value === undefined) {
            return true
          }

          return Number.isFinite(value)
        },
        // we can m
        isInteger: (value: NumberInput['value']) => {
          if (!required && value === undefined) {
            return true
          }

          if (Number.isInteger(step)) {
            return Number.isInteger(value)
          }
          return true
        },
      },
    },

    shouldUnregister,
  })

  const errorField = getError(
    {
      label: errorLabel ?? label ?? ariaLabel ?? name,
      max,
      min,
      value: field.value,
    },
    error,
  )

  return (
    <NumberInput
      {...props}
      aria-label={ariaLabel}
      error={errorField}
      label={label}
      max={max}
      min={min}
      name={field.name}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        field.onBlur()
        onBlur?.(event)
      }}
      onChange={newValue => {
        // React hook form doesnt allow undefined values after definition https://react-hook-form.com/docs/usecontroller/controller (that make sense)
        onChange?.(newValue)
        field.onChange(newValue)
      }}
      required={required}
      step={step}
      value={field.value}
    />
  )
}
