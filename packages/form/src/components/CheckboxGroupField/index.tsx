import { CheckboxGroup } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type CheckboxGroupFieldProps<TFieldValues extends FieldValues> =
  BaseFieldProps<TFieldValues> &
    Partial<
      Pick<
        ComponentProps<typeof CheckboxGroup>,
        | 'className'
        | 'helper'
        | 'onChange'
        | 'required'
        | 'direction'
        | 'children'
        | 'error'
        | 'legend'
      >
    > &
    Required<Pick<ComponentProps<typeof CheckboxGroup>, 'legend'>>

export const CheckboxGroupField = <TFieldValues extends FieldValues>({
  legend,
  className,
  helper,
  direction,
  children,
  onChange,
  label = '',
  error: customError,
  name,
  required = false,
}: CheckboxGroupFieldProps<TFieldValues>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
  })

  return (
    <CheckboxGroup
      legend={legend}
      name={name}
      value={field.value}
      onChange={event => {
        const fieldValue = field.value as string[]
        if (fieldValue?.includes(event.currentTarget.value)) {
          field.onChange(
            fieldValue?.filter(
              currentValue => currentValue !== event.currentTarget.value,
            ),
          )
        } else {
          field.onChange([...field.value, event.currentTarget.value])
        }

        onChange?.(event)
      }}
      error={getError({ label }, error) ?? customError}
      className={className}
      direction={direction}
      helper={helper}
      required={required}
    >
      {children}
    </CheckboxGroup>
  )
}

CheckboxGroupField.Checkbox = CheckboxGroup.Checkbox
