import { Plans } from '@ultraviolet/ui/compositions/Plans'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../../../types'

type PlanFieldsProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<
  ComponentProps<typeof Plans>,
  'features' | 'plans' | 'hideLabels' | 'onChange' | 'highlight'
> &
  Pick<
    BaseFieldProps<TFieldValues, TFieldName>,
    'name' | 'control' | 'required'
  >

export const PlansField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  features,
  plans,
  hideLabels,
  highlight,
  onChange,
  required,
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
      features={features}
      fieldName={field.name}
      hideLabels={hideLabels}
      highlight={highlight}
      onChange={value => {
        field.onChange(value)
        if (onChange) {
          onChange(value)
        }
      }}
      plans={plans}
      value={field.value as string | undefined}
    />
  )
}
