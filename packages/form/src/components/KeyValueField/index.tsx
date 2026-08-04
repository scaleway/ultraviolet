'use client'

import { KeyValueInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldArrayPath, FieldArrayPathValue, FieldPath, FieldValues } from 'react-hook-form'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'
import { validateRegex } from '../../utils/validateRegex'

type KeyValueType = NonNullable<ComponentProps<typeof KeyValueInput>['keyvalues']>

type FieldArrayItem<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues>,
> = NonNullable<FieldArrayPathValue<TFieldValues, TFieldArrayName>>[number]

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
  required,
  label,
  ...props
}: KeyValueFieldProps<TFieldValues, TFieldArrayName, TFieldName>) => {
  const regexKey = inputKey.inputType !== 'select' ? inputKey.regex : undefined
  const regexValue = inputValue.inputType !== 'select' ? inputValue.regex : undefined
  const { errors } = useErrors()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name,
    rules: {
      validate:
        regexKey || regexValue || inputKey.required || inputValue.required || required
          ? {
              pattern: value => {
                const keyValueArray = value as KeyValueType
                if (!keyValueArray) return !required

                return keyValueArray.every(item => {
                  const keyValidRegex = !regexKey || validateRegex(item?.key, regexKey)
                  const keyValidRequired = !(required || inputKey.required) || item?.key
                  const keyValid = keyValidRegex && keyValidRequired

                  const valueValidRegex = !regexValue || validateRegex(item?.value, regexValue)
                  const valueValidRequired = !(required || inputValue.required) || item?.value
                  const valueValid = valueValidRegex && valueValidRequired

                  return keyValid && valueValid
                })
              },
            }
          : undefined,
      required,
    },
  })

  const { getValues, formState } = useFormContext()
  const error = formState.errors?.[name]?.root

  const handleFieldChange = (keyValues: KeyValueType, index?: number, operationType?: string) => {
    if (operationType === 'add') {
      append({ key: '', value: '' } as FieldArrayItem<TFieldValues, TFieldArrayName>)
    } else if (operationType === 'remove') {
      remove(index)
    } else if (operationType === 'change' && index !== undefined) {
      update(index, keyValues?.[index] as FieldArrayItem<TFieldValues, TFieldArrayName>)
    }
    onChange?.(getValues(name))
  }

  const currentValues = (getValues(name) ?? []) as KeyValueType

  const fieldErrors = fields.map((_, index) => {
    const entry = currentValues[index]
    const keyError = regexKey ? !validateRegex(entry.key ?? '', regexKey) : false
    const valueError = regexValue ? !validateRegex(entry.value ?? '', regexValue) : false

    if (keyError || valueError) {
      return {
        key: keyError ? (errorLabel ?? errors.pattern({ label: label ?? '', regex: regexKey })) : '',
        value: valueError ? (errorLabel ?? errors.pattern({ label: label ?? '', regex: regexValue })) : '',
      }
    }

    return null
  })

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
      error={error?.message as string}
      fieldErrors={fieldErrors}
      required={required}
    />
  )
}

KeyValueField.displayName = 'KeyValueField'
