'use client'

import { Checkbox } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useController } from 'react-hook-form'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps, DistributiveOmit } from '../../types'

type CheckboxFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = DistributiveOmit<BaseFieldProps<TFieldValues, TFieldName>, 'value'> &
  DistributiveOmit<ComponentProps<typeof Checkbox>, 'value' | 'onChange'>

export const CheckboxField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  disabled,
  required,
  onChange,
  onBlur,
  shouldUnregister = false,
  validate,
  errorLabel,
  ...props
}: CheckboxFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    control,
    disabled,
    name,
    rules: {
      required,
      validate,
    },
    shouldUnregister,
  })

  return (
    <Checkbox
      {...props}
      required={required}
      checked={!!field.value}
      disabled={field.disabled}
      error={getError({ label: errorLabel ?? label ?? props['aria-label'] ?? name }, error)}
      name={field.name}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      onChange={event => {
        field.onChange(event.target.checked)
        onChange?.(event.target.checked as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      ref={field.ref}
    />
  )
}

CheckboxField.displayName = 'CheckboxField'
