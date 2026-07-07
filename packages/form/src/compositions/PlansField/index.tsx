import { Plans } from '@ultraviolet/ui/compositions/Plans'
import type { ComponentProps } from 'react'
import { useController } from 'react-hook-form'
import type { FieldPath, FieldValues } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

type PlanFieldsProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> & Omit<ComponentProps<typeof Plans>, 'value' | 'fieldName'>
export const PlansField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  onChange,
  required,
  ...props
}: PlanFieldsProps<TFieldValues, TFieldName>) => {
  const { field } = useController({
    control,
    name,
    rules: {
      required,
    },
  })

  return (
    <Plans
      fieldName={field.name}
      onChange={value => {
        field.onChange(value)
        if (onChange) {
          onChange(value)
        }
      }}
      value={field.value as string | undefined}
      {...props}
    />
  )
}

PlansField.displayName = 'PlansField'
