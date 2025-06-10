'use client'

import { NumberInput } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent } from 'react'
import { useController } from 'react-hook-form'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
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
    name,
    control,
    shouldUnregister,
    rules: {
      max,
      min,
      required,
      validate: {
        ...validate,
        isInteger: isInteger(step),
      },
    },
  })

  return (
    <NumberInput
      {...props}
      name={field.name}
      value={field.value}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        field.onBlur()
        onBlur?.(event)
      }}
      onChange={newValue => {
        // React hook form doesnt allow undefined values after definition https://react-hook-form.com/docs/usecontroller/controller (that make sense)
        field.onChange(newValue)
        onChange?.(newValue as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      max={max}
      min={min}
      step={step}
      label={label}
      error={getError(
        { label: label ?? ariaLabel ?? name, max, min, isInteger: step },
        error,
      )}
      aria-label={ariaLabel}
      required={required}
    />
  )
}
