import type {
  FieldPath,
  FieldPathValue,
  FieldValues,
  Path,
  Validate,
} from 'react-hook-form'
import { useController, useFormContext } from 'react-hook-form'

type Options<TFieldValues extends FieldValues> = {
  subscription?: Record<string, boolean>
  validate?: Validate<
    FieldPathValue<TFieldValues, Path<TFieldValues>>,
    TFieldValues
  >
}

/**
 * @deprecated
 */
export const useFieldDeprecated = <
  T,
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TFieldName,
  options?: Options<TFieldValues>,
) => {
  const { getValues } = useFormContext<TFieldValues>()
  const { field, fieldState } = useController<TFieldValues>({
    name,
    rules: { validate: options?.validate },
  })

  return {
    input: {
      value: getValues(name) as T,
      onChange: field.onChange,
    },
    meta: {
      error: fieldState.error?.message,
      touched: fieldState.isTouched,
      invalid: fieldState.invalid,
      dirty: fieldState.isDirty,
    },
  }
}
