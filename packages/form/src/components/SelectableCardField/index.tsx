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
    control,
    name,
    rules: {
      required,
      validate,
    },
    shouldUnregister,
  })

  const isChecked =
    (type === 'checkbox' || type === 'toggle') &&
    Array.isArray(field.value) &&
    value
      ? (field.value ?? []).includes(value)
      : field.value === value

  return (
    <SelectableCard
      {...props}
      {...(productIcon ? { productIcon } : { illustration })}
      {...(label ? { label } : { 'aria-label': ariaLabel! })}
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
      onFocus={event => {
        onFocus?.(event)
      }}
      type={type}
      value={value ?? ''}
    />
  )
}
