import { SelectableCardGroup } from '@ultraviolet/ui'
import type { ComponentProps, JSX } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type SelectableCardGroupFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<BaseFieldProps<TFieldValues, TFieldName>, 'label'> &
  Partial<
    Pick<
      ComponentProps<typeof SelectableCardGroup>,
      | 'helper'
      | 'error'
      | 'columns'
      | 'children'
      | 'showTick'
      | 'type'
      | 'className'
    >
  > &
  Pick<ComponentProps<typeof SelectableCardGroup>, 'legend'>

export const SelectableCardGroupField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  legend,
  control,
  name,
  onChange,
  required = false,
  children,
  label = '',
  error: customError,
  helper,
  columns = 1,
  showTick,
  type = 'radio',
  shouldUnregister = false,
  validate,
}: SelectableCardGroupFieldProps<TFieldValues, TFieldName>): JSX.Element => {
  const { getError } = useErrors()
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
        onChange?.(
          event.currentTarget.value as PathValue<
            TFieldValues,
            Path<TFieldValues>
          >,
        )
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
