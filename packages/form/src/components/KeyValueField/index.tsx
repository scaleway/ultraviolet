'use client'

import { KeyValueInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldArray, FieldArrayPath, FieldPath, FieldValues } from 'react-hook-form'
import { useController, useFieldArray, useFormContext } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'
import { validateRegex } from '../../utils/validateRegex'

type KeyValueType = NonNullable<ComponentProps<typeof KeyValueInput>['keyvalues']>

type KeyValueFieldError = KeyValueType[number]

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
  inputValue,
  inputKey,
  errorLabel,
  label,
  ...props
}: KeyValueFieldProps<TFieldValues, TFieldArrayName, TFieldName>) => {
  const regexKey = inputKey.inputType !== 'select' ? inputKey.regex : undefined
  const regexValue = inputValue.inputType !== 'select' ? inputValue.regex : undefined
  const { errors } = useErrors()
  const {
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    control,
    name,
    rules: {
      validate:
        regexKey || regexValue
          ? {
              pattern: (value: KeyValueType) =>
                value
                  ? value.every(item => validateRegex(item?.value, regexValue) && validateRegex(item?.key, regexKey))
                  : true,
            }
          : undefined,
    },
  })

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

  const currentValues = (getValues(name) ?? []) as KeyValueType

  const fieldErrors = fields.reduce<Record<number, KeyValueFieldError>>((acc, _, index) => {
    const entry = currentValues[index]
    const keyError = regexKey ? !validateRegex(entry.key ?? '', regexKey) : false
    const valueError = regexValue ? !validateRegex(entry.value ?? '', regexValue) : false

    if (keyError || valueError) {
      acc[index] = {
        key: keyError ? (errorLabel ?? errors.pattern({ label: label ?? '', regex: regexKey })) : '',
        value: valueError ? (errorLabel ?? errors.pattern({ label: label ?? '', regex: regexValue })) : '',
      }
    }

    return acc
  }, {})

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
      inputValue={inputValue}
      inputKey={inputKey}
      error={error?.message}
      fieldErrors={fieldErrors}
    />
  )
}

KeyValueField.displayName = 'KeyValueField'
