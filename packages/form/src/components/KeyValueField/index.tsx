'use client'

import { KeyValueInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldArray, FieldArrayPath, FieldPath, FieldValues } from 'react-hook-form'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'
import { validateRegex } from '../../utils/validateRegex'

type KeyValueType = NonNullable<ComponentProps<typeof KeyValueInput>['keyvalues']>

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
                  const keyValid =
                    (required || inputKey.required) && item?.key && (!regexKey || validateRegex(item?.key, regexKey))
                  const valueValid =
                    (required || inputValue.required) &&
                    item?.value &&
                    (!regexValue || validateRegex(item?.value, regexValue))
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
      append({ key: '', value: '' } as FieldArray<TFieldValues, TFieldArrayName>)
    } else if (operationType === 'remove') {
      remove(index)
    } else if (operationType === 'change' && index !== undefined) {
      update(index, keyValues?.[index] as FieldArray<TFieldValues, TFieldArrayName>)
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
    />
  )
}

KeyValueField.displayName = 'KeyValueField'
