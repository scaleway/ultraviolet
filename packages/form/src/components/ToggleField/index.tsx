'use client'

import { Toggle } from '@ultraviolet/ui'
import { useMemo } from 'react'
import { useController } from 'react-hook-form'

import { useErrors } from '../../providers'

import type { BaseFieldProps } from '../../types'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'

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
  onBlur,
  onFocus,
  required,
  parse,
  format,
  shouldUnregister = false,
  validate,
  errorLabel,
  'aria-label': ariaLabel,
  ...props
}: ToggleFieldProps<TFieldValues, TFieldName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    control,
    name,
    rules: {
      required,
      validate,
    },
    shouldUnregister,
  })
  const { getError } = useErrors()

  const transformedValue = () => {
    if (format) {
      return format(field.value)
    }

    return field.value as boolean
  }

  const computedErrorLabel = useMemo(() => {
    if (errorLabel) {
      return errorLabel
    }

    if (typeof label === 'string') {
      return label
    }

    return ariaLabel ?? name
  }, [errorLabel, name, ariaLabel, label])

  return (
    <Toggle
      {...props}
      checked={transformedValue()}
      error={getError({ label: computedErrorLabel }, error)}
      label={label}
      name={field.name}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
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
      onFocus={event => {
        onFocus?.(event)
      }}
      ref={field.ref}
      required={required}
    />
  )
}
