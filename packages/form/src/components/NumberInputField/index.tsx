'use client'

import { NumberInput } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'
import { isInteger } from '../../validators/isInteger'

type NumberInputProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof NumberInput>, 'onChange'>

export const NumberInputField = <
  TFieldValues extends FieldValues,
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
  ...props
}: NumberInputProps<TFieldValues, TFieldName>) => {
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
        isInteger: isInteger(step),
      },
    },
    shouldUnregister,
  })

  return (
    <NumberInput
      {...props}
      aria-label={ariaLabel}
      error={getError(
        { isInteger: step, label: label ?? ariaLabel ?? name, max, min },
        error,
      )}
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
        field.onChange(newValue)
        onChange?.(newValue as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      required={required}
      step={step}
      value={field.value}
    />
  )
}
