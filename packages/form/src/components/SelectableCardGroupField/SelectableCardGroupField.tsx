'use client'

import { SelectableCardGroup } from '@ultraviolet/ui'
import type { ComponentProps, JSX } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type SelectableCardGroupProps = ComponentProps<typeof SelectableCardGroup>

type SelectableCardGroupFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<SelectableCardGroupProps, 'name' | 'onChange' | 'value'>

const SelectableCardGroupFieldComponent = <
<<<<<<< HEAD
  TFieldValues extends FieldValues,
=======
  TFieldValues extends FieldValues = FieldValues,
>>>>>>> c6fe95b82 (feat(vite-v8): migrate)
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  legend = '',
  control,
  name,
  onChange,
  required = false,
  error: customError,
  columns = 1,
  type = 'radio',
  shouldUnregister = false,
  validate,
  ...props
}: SelectableCardGroupFieldProps<TFieldValues, TFieldName>): JSX.Element => {
  const { getError } = useErrors()
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

  return (
    <SelectableCardGroup
      {...props}
      columns={columns}
      error={getError({ label: legend }, error) ?? customError}
      legend={legend}
      name={name}
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
      required={required}
      type={type}
      value={field.value}
    />
  )
}

type SelectableCardGroupFieldType = typeof SelectableCardGroupFieldComponent & {
  Card: typeof SelectableCardGroup.Card
}

export const SelectableCardGroupField: SelectableCardGroupFieldType =
  Object.assign(SelectableCardGroupFieldComponent, {
    Card: SelectableCardGroup.Card,
  })
