'use client'

import { SelectableCard } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useController } from 'react-hook-form'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import type { BaseFieldProps, DistributiveOmit } from '../../types'

type SelectableCardFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = DistributiveOmit<BaseFieldProps<TFieldValues, TFieldName>, 'label'> &
  DistributiveOmit<ComponentProps<typeof SelectableCard>, 'name' | 'onChange' | 'value'>

export const SelectableCardField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  value,
  onChange,
  type,
  onFocus,
  onBlur,
  required,
  shouldUnregister = false,
  validate,
  productIcon,
  illustration,
  ...props
}: SelectableCardFieldProps<TFieldValues, TFieldName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    control,
    name,
    rules: {
      required,
      validate,
    },
    shouldUnregister,
  })

  const isChecked =
    (type === 'checkbox' || type === 'toggle') && Array.isArray(field.value) && value
      ? (field.value ?? []).includes(value)
      : field.value === value

  return (
    <SelectableCard
      {...props}
      {...(productIcon ? { productIcon } : { illustration })}
      checked={isChecked}
      isError={!!error}
      name={field.name}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      onChange={event => {
        if (type === 'checkbox' || type === 'toggle') {
          const fieldValue = (field.value ?? []) as string[]
          if (fieldValue?.includes(event.currentTarget.value)) {
            field.onChange(fieldValue?.filter(currentValue => currentValue !== event.currentTarget.value))
          } else {
            field.onChange([...fieldValue, event.currentTarget.value])
          }
        } else {
          field.onChange(event)
        }
        onChange?.(event.currentTarget.value as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      onFocus={event => {
        onFocus?.(event)
      }}
      type={type}
      value={value ?? ''}
    />
  )
}

SelectableCardField.displayName = 'SelectableCardField'
