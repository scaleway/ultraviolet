import { SelectableCardGroup } from '@ultraviolet/ui'
import type { ComponentProps, JSX } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type SelectableCardGroupFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> &
  Omit<BaseFieldProps<TFieldValues, TName>, 'label' | 'onChange'> &
  Partial<
    Pick<
      ComponentProps<typeof SelectableCardGroup>,
      | 'helper'
      | 'legend'
      | 'error'
      | 'columns'
      | 'children'
      | 'showTick'
      | 'type'
      | 'className'
      | 'onChange'
    >
  > &
  Required<Pick<ComponentProps<typeof SelectableCardGroup>, 'legend'>>

export const SelectableCardGroupField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  legend,
  name,
  onChange,
  required = false,
  rules,
  children,
  label = '',
  error: customError,
  helper,
  columns = 1,
  showTick,
  type = 'radio',
  shouldUnregister = false,
}: SelectableCardGroupFieldProps<TFieldValues, TName>): JSX.Element => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    shouldUnregister,
    rules: {
      required,
      ...rules,
    },
  })

  return (
    <SelectableCardGroup
      legend={legend}
      name={name}
      type={type}
      showTick={showTick}
      value={field.value}
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
        onChange?.(event)
      }}
      error={getError({ label }, error) ?? customError}
      className={className}
      columns={columns}
      helper={helper}
      required={required}
    >
      {children}
    </SelectableCardGroup>
  )
}

SelectableCardGroupField.Card = SelectableCardGroup.Card
