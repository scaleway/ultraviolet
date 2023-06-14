import type { ReactNode } from 'react'
import type {
  ArrayPath,
  FieldArray,
  FieldValues,
  Validate,
} from 'react-hook-form'
import { useFieldArray as useFieldArrayHookForm } from 'react-hook-form'

type Options<TFieldValues extends FieldValues> = {
  validate?: Validate<FieldArray<TFieldValues>[], TFieldValues>
  subscription?: Record<string, boolean>
}

/**
 * @deprecated
 */
export const useFieldArrayDeprecated = <
  T,
  TFieldValues extends FieldValues = FieldValues,
>(
  name: ArrayPath<TFieldValues>,
  options?: Options<TFieldValues>,
) => {
  const { fields, append, remove, update, move } =
    useFieldArrayHookForm<TFieldValues>({
      name,
      rules: { validate: options?.validate },
    })

  return {
    fields: {
      push: append,
      value: fields as T[],
      remove,
      update,
      map: (callback: (name: string, index: number) => ReactNode) =>
        fields.map((_, index) => callback(`${name}.${index}`, index)),
      move,
      length: fields.length,
    },
  }
}
