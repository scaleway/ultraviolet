import { useEffect, useRef } from 'react'
import type {
  DeepPartial,
  FieldPath,
  FieldPathValue,
  FieldValues,
} from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

export type CallbackFn<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = (
  value: FieldPathValue<TFieldValues, TFieldName>,
  values: DeepPartial<TFieldValues>,
) => void | Promise<void>

/**
 * @deprecated
 */
export const useOnFieldChange = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>(
  fieldName: TFieldName,
  callback: CallbackFn<TFieldValues, TFieldName>,
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
        callback(value[fieldName], value)?.catch(() => null)
      }
    })

    return () => subscription.unsubscribe()
  }, [callback, enabled, watch, getValues, fieldName])
}
