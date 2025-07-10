'use client'

import { Toggle } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type ToggleFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = Omit<BaseFieldProps<TFieldValues, TFieldName>, 'label'> &
  Omit<ComponentProps<typeof Toggle>, 'value' | 'onChange'> & {
    parse?: (value: boolean) => PathValue<TFieldValues, TFieldName>
    format?: (value: PathValue<TFieldValues, TFieldName>) => boolean
  }

export const ToggleField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  name,
  control,
  onChange,
  required,
  parse,
  format,
  shouldUnregister = false,
  validate,
  'aria-label': ariaLabel,
  ...props
}: ToggleFieldProps<TFieldValues, TFieldName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    control,
    shouldUnregister,
    rules: {
      required,
      validate,
    },
  })
  const { getError } = useErrors()

  const transformedValue = () => {
    if (format) {
      return format(field.value)
    }

    return field.value as boolean
  }

  return (
    <Toggle
      {...props}
      name={field.name}
      ref={field.ref}
      checked={transformedValue()}
      onChange={event => {
        if (parse) {
          field.onChange(parse(event.target.checked))
        } else {
          field.onChange(event)
        }
        onChange?.(
          event.target.checked as PathValue<TFieldValues, Path<TFieldValues>>,
        )
      }}
      label={label}
      required={required}
      error={getError(
        { label: typeof label === 'string' ? label : (ariaLabel ?? name) },
        error,
      )}
    />
  )
}
