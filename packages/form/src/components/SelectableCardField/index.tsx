'use client'

import { SelectableCard } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

type SelectableCardFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = Omit<BaseFieldProps<TFieldValues, TFieldName>, 'label'> &
  Omit<ComponentProps<typeof SelectableCard>, 'name' | 'onChange' | 'value'>

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
  label,
  shouldUnregister = false,
  validate,
  productIcon,
  illustration,
  'aria-label': ariaLabel,
  ...props
}: SelectableCardFieldProps<TFieldValues, TFieldName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    control,
    shouldUnregister,
    rules: {
      required,
      validate,
    },
  })

  const isChecked =
    type === 'checkbox' && Array.isArray(field.value) && value
      ? (field.value ?? []).includes(value)
      : field.value === value

  return (
    <SelectableCard
      {...props}
      {...(productIcon ? { productIcon } : { illustration })}
      {...(label ? { label } : { 'aria-label': ariaLabel as string })}
      isError={!!error}
      checked={isChecked}
      onChange={event => {
        if (type === 'checkbox') {
          const fieldValue = (field.value ?? []) as string[]
          if (fieldValue?.includes(event.currentTarget.value)) {
            field.onChange(
              fieldValue?.filter(
                currentValue => currentValue !== event.currentTarget.value,
              ),
            )
          } else {
            field.onChange([...fieldValue, event.currentTarget.value])
          }
        } else {
          field.onChange(event)
        }
        onChange?.(
          event.currentTarget.value as PathValue<
            TFieldValues,
            Path<TFieldValues>
          >,
        )
      }}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      onFocus={event => {
        onFocus?.(event)
      }}
      type={type}
      value={value ?? ''}
      name={field.name}
    />
  )
}
