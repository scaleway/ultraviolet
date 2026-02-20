import { CustomerSatisfaction } from '@ultraviolet/ui/compositions/CustomerSatisfaction'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../../../types'

type CustomerSatisfactionFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> & {
  name: string
  required?: boolean
}

export const CustomerSatisfactionField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  required,
}: CustomerSatisfactionFieldProps<TFieldValues, TName>) => {
  const { field } = useController<TFieldValues>({
    name,
    rules: {
      required,
    },
  })

  return (
    <CustomerSatisfaction onChange={field.onChange} value={field.value ?? 1} />
  )
}
