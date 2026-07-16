'use client'

import { TextInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useField } from '../../hooks/useField'
import type { BaseFieldProps } from '../../types'

type TextInputFieldExtraProps = Omit<ComponentProps<typeof TextInput>, 'value' | 'error' | 'name' | 'onChange'> & {
  regex?: (RegExp | RegExp[])[]
}

export const TextInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: BaseFieldProps<TFieldValues, TFieldName> & TextInputFieldExtraProps,
) => {
  const { fieldProps } = useField(props)

  return <TextInput {...props} {...fieldProps} />
}

TextInputField.displayName = 'TextInputField'
