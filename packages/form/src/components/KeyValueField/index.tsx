'use client'

import { KeyValueInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import type { FieldArray, FieldArrayPath, FieldPath, FieldValues } from 'react-hook-form'
import { BaseFieldProps } from '../../types'

type KeyValueType = ComponentProps<typeof KeyValueInput>['keyvalues']
type KeyValueFieldProps<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues>,
  TFieldName extends FieldPath<TFieldValues>,
> = {
  name: TFieldArrayName
} & Omit<ComponentProps<typeof KeyValueInput>, 'value' | 'onChange'> &
  BaseFieldProps<TFieldValues, TFieldName>

/**
 * A React component that allows users to manage key-value pairs
 */
export const KeyValueField = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  onChange,
  onBlur,
  ...props
}: KeyValueFieldProps<TFieldValues, TFieldArrayName, TFieldName>) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name,
  })

  const { getValues } = useFormContext()

  const handleFieldChange = (keyValues: KeyValueType, index?: number, operationType?: string) => {
    if (operationType === 'add') {
      append({ key: '', value: '' } as FieldArray<TFieldValues, TFieldArrayName>)
    } else if (operationType === 'remove') {
      remove(index)
    } else if (operationType === 'change' && index !== undefined) {
      update(index, keyValues?.[index] as FieldArray<TFieldValues, TFieldArrayName>)
    }
    onChange?.(getValues(name))
  }

  const currentValues = getValues(name)

  return (
    <KeyValueInput
      {...props}
      name={name}
      keyvalues={fields.map((_, index) => ({
        key: (currentValues[index] as { key?: string })?.key ?? '',
        value: (currentValues[index] as { value?: string })?.value ?? '',
      }))}
      onChange={handleFieldChange}
      onBlur={onBlur}
    />
  )
}

KeyValueField.displayName = 'KeyValueField'
