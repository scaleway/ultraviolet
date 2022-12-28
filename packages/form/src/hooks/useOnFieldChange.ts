import { useEffect, useRef } from 'react'
import { useField, useFormState } from 'react-final-form'

type CallbackFn<FieldValue, AllValues> = (
  value: FieldValue,
  values: AllValues,
) => unknown

export const useOnFieldChange = <FieldValue = unknown, AllValues = unknown>(
  name: string,
  callback: CallbackFn<FieldValue, AllValues>,
  condition = true,
): void => {
  const { values } = useFormState<AllValues>()
  const {
    input: { value },
  } = useField<FieldValue>(name, {
    allowNull: true,
    subscription: { value: true },
  })
  const previousValues = useRef(value)

  useEffect(() => {
    if (previousValues.current !== value && condition) {
      previousValues.current = value
      callback(value, values)
    }
  }, [value, values, callback, condition])
}
