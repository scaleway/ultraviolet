'use client'

import { Slider } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent, ReactNode } from 'react'
import { useMemo } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type SliderFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof Slider>, 'value' | 'onChange'> & {
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
  options,
  'aria-label': ariaLabel,
  ...props
}: SliderFieldProps<TFieldValues, TFieldName>) => {
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
      validate,
    },
    shouldUnregister,
  })

  const finalValue = useMemo(() => {
    if (options && field.value) {
      if (!Array.isArray(field.value)) {
        const processedValue = options
          .map(option => option.value)
          .indexOf(field.value)

        return processedValue
      }

      if (Array.isArray(field.value)) {
        const processedValue = (field.value as number[]).map(val =>
          options.map(option => option.value).indexOf(val),
        )

        return processedValue
      }
    }

    return field.value as number | number[]
  }, [field.value, options])

  return (
    <Slider
      aria-label={ariaLabel}
      error={getError({ label: label ?? ariaLabel ?? name, max, min }, error)}
      label={label}
      max={max}
      min={min}
      name={field.name}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        field.onBlur()
        onBlur?.(event)
      }}
      onChange={(newValue: number | number[]) => {
        if (options) {
          const processedValue = Array.isArray(newValue)
            ? newValue.map((val: number) =>
                val ? options[val]?.value : options[0]?.value,
              )
            : options[newValue]?.value

          field.onChange(processedValue)
          onChange?.(
            processedValue as PathValue<TFieldValues, Path<TFieldValues>>,
          )
        } else {
          field.onChange(newValue)
          onChange?.(newValue as PathValue<TFieldValues, Path<TFieldValues>>)
        }
      }}
      options={options}
      required={required}
      value={finalValue as PathValue<TFieldValues, Path<TFieldValues>>}
      {...props}
    />
  )
}
