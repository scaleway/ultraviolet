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
 * @deprecated Use [useForm](https://www.react-hook-form.com/api/useform/), [useFormContext](https://www.react-hook-form.com/api/useformcontext/) or [useWatch](https://www.react-hook-form.com/api/usewatch/) to get values. Use [useFormState](https://www.react-hook-form.com/api/useformstate/) to get fields states.
 *
 * @example
 * ```tsx
 *  const Input = () {
 *   const username = useWatch({
 *    name: 'username'
 *   })
 *
 *   const { errors } = useFormState()
 *
 *   console.log(errors.username)
 * }
 * ```
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
