import { useEffect, useRef } from 'react'
import type { DeepPartial, FieldPath, FieldValues } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

type CallbackFn<TFieldValues extends FieldValues, T> = (
  value: T,
  values: DeepPartial<TFieldValues>,
) => void | Promise<void>

/**
 * @deprecated
 */
export const useOnFieldChange = <
  T,
  TFieldValues extends FieldValues = FieldValues,
>(
  fieldName: FieldPath<TFieldValues>,
  callback: CallbackFn<TFieldValues, T>,
  enabled = true,
): void => {
  const { watch, getValues } = useFormContext<TFieldValues>()
  const previousValues = useRef<DeepPartial<TFieldValues> | null>(
    getValues(fieldName),
  )

  useEffect(() => {
    const subscription = watch(value => {
      if (previousValues.current !== value[fieldName] && enabled) {
        previousValues.current = value[fieldName]
        void callback(value[fieldName], value)
      }
    })

    return () => subscription.unsubscribe()
  }, [callback, enabled, watch, getValues, fieldName])
}
