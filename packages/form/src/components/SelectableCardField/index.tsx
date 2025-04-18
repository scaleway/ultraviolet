'use client'

import { SelectableCard } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { BaseFieldProps, LabelProp } from '../../types'

type SelectableCardFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = Omit<BaseFieldProps<TFieldValues, TFieldName>, 'label'> &
  Partial<
    Pick<
      ComponentProps<typeof SelectableCard>,
      | 'disabled'
      | 'onBlur'
      | 'onFocus'
      | 'showTick'
      | 'type'
      | 'id'
      | 'children'
      | 'tooltip'
      | 'data-testid'
    >
  > & {
    className?: string
  } & (
    | {
        illustration?: ComponentProps<typeof SelectableCard>['illustration']
        productIcon?: never
      }
    | {
        productIcon?: ComponentProps<typeof SelectableCard>['productIcon']
        illustration?: never
      }
  ) &
  LabelProp

export const SelectableCardField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  value,
  onChange,
  showTick,
  type,
  disabled,
  children,
  className,
  onFocus,
  onBlur,
  required,
  tooltip,
  id,
  label,
  shouldUnregister = false,
  validate,
  productIcon,
  illustration,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
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
      {...(productIcon ? { productIcon } : { illustration })}
      {...(label ? { label } : { 'aria-label': ariaLabel as string })}
      isError={!!error}
      showTick={showTick}
      checked={isChecked}
      className={className}
      disabled={disabled}
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
      id={id}
      tooltip={tooltip}
      value={value ?? ''}
      name={field.name}
      data-testid={dataTestId}
    >
      {children}
    </SelectableCard>
  )
}
