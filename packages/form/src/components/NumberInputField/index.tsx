'use client'

import { NumberInput } from '@ultraviolet/ui'
import { isNullOrUndefined } from '@ultraviolet/utils'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useField } from '../../hooks/useField'
import type { BaseFieldProps } from '../../types'

type NumberInputComponentProps = ComponentProps<typeof NumberInput>

export const NumberInputField = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  max = Number.MAX_SAFE_INTEGER,
  min = 0,
  validate,
  ...props
}: BaseFieldProps<TFieldValues, TFieldName> & NumberInputComponentProps) => {
  const { fieldProps } = useField({
    ...props,
    min,
    max,
    validate: {
      ...validate,
      isNumber: (newValue: NumberInputComponentProps['value']) => {
        if (!props.required && isNullOrUndefined(newValue)) {
          return true
        }
        return Number.isFinite(newValue)
      },
      isInteger: (newValue: NumberInputComponentProps['value']) => {
        if (!props.required && isNullOrUndefined(newValue)) {
          return true
        }

        if (Number.isInteger(Number(props.step))) {
          return Number.isInteger(newValue)
        }

        return true
      },
    },
  })

  return <NumberInput {...props} min={min} max={max} {...fieldProps} />
}

NumberInputField.displayName = 'NumberInputField'
