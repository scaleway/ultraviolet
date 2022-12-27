import { useMemo } from 'react'
import type { UseFieldConfig } from 'react-final-form'
import { useField } from 'react-final-form'
import { pickValidators } from '../helpers'
import type { ValidatorProps } from '../types'
import { useValidation } from './useValidation'

export const useFormField = <
  FieldValue = unknown,
  T extends HTMLElement = HTMLElement,
  InputValue = FieldValue,
>(
  name: string,
  {
    afterSubmit,
    disabled,
    allowNull,
    beforeSubmit,
    defaultValue,
    format,
    formatOnBlur,
    initialValue,
    isEqual,
    multiple,
    parse,
    subscription,
    type,
    validate,
    validateFields,
    value,
    max,
    maxLength,
    min,
    minLength,
    regex,
    required,
    maxDate,
    minDate,
  }: UseFieldConfig<FieldValue, InputValue> &
    ValidatorProps & { disabled?: boolean },
) => {
  const serializedRegex = useMemo(() => regex?.toString(), [regex])

  const validators = useMemo(
    () =>
      pickValidators<FieldValue>({
        max,
        maxDate,
        maxLength,
        min,
        minDate,
        minLength,
        regex,
        required,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      max,
      maxLength,
      min,
      minLength,
      required,
      serializedRegex,
      maxDate,
      minDate,
    ],
  )

  const validateFn = useValidation({ validate, validators })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = useMemo(() => ({ key: Math.random() }), [validateFn, disabled])

  return useField<FieldValue, T, InputValue>(name, {
    afterSubmit,
    allowNull,
    beforeSubmit,
    defaultValue,
    format,
    formatOnBlur,
    initialValue,
    isEqual,
    multiple,
    parse,
    subscription,
    type,
    validate: disabled ? undefined : validateFn,
    validateFields,
    value,
    data,
  })
}
