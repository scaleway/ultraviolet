'use client'

import { SelectInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useField } from '../../hooks/useField'
import type { BaseFieldProps } from '../../types'

type SelectInputFieldExtraProps = Omit<ComponentProps<typeof SelectInput>, 'value' | 'onChange'>

export const SelectInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  ...props
}: BaseFieldProps<TFieldValues, TFieldName> & SelectInputFieldExtraProps) => {
  const { fieldProps } = useField(props)

  return <SelectInput {...props} {...fieldProps} />
}

SelectInputField.displayName = 'SelectInputField'
