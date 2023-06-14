import { CheckboxGroup } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
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
        | 'value'
        | 'error'
        | 'legend'
      >
    > &
    Required<Pick<ComponentProps<typeof CheckboxGroup>, 'legend' | 'name'>>

export const CheckboxGroupField = <TFieldValues extends FieldValues>({
  legend,
  value,
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

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <CheckboxGroup
          legend={legend}
          name={name}
          value={value}
          onChange={event => {
            const fieldValue = field.value as string[]
            if (fieldValue?.includes(event.currentTarget.value)) {
              field.onChange(
                fieldValue?.filter(
                  currentValue => currentValue === event.currentTarget.value,
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
      )}
    />
  )
}

CheckboxGroupField.Checkbox = CheckboxGroup.Checkbox
