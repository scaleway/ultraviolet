'use client'

import { Slider } from '@ultraviolet/ui'
import {
  type ComponentProps,
  type FocusEvent,
  type ReactNode,
  useMemo,
} from 'react'
import { useController } from 'react-hook-form'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
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
      name={field.name}
      value={finalValue as PathValue<TFieldValues, Path<TFieldValues>>}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        field.onBlur()
        onBlur?.(event)
      }}
      onChange={(newValue: number | number[]) => {
        if (options) {
          const processedValue = !Array.isArray(newValue)
            ? options[newValue]?.value
            : newValue.map((val: number) =>
                val ? options[val]?.value : options[0]?.value,
              )

          field.onChange(processedValue)
          onChange?.(
            processedValue as PathValue<TFieldValues, Path<TFieldValues>>,
          )
        } else {
          field.onChange(newValue)
          onChange?.(newValue as PathValue<TFieldValues, Path<TFieldValues>>)
        }
      }}
      max={max}
      min={min}
      error={getError({ label: label ?? ariaLabel ?? name, max, min }, error)}
      label={label}
      required={required}
      options={options}
      aria-label={ariaLabel}
      {...props}
    />
  )
}
