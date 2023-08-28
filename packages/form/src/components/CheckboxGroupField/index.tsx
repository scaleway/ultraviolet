import { CheckboxGroup } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useFieldArray } from 'react-final-form-arrays'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type CheckboxGroupValue = string[]

type CheckboxGroupFieldProps<
  T = CheckboxGroupValue,
  K = string,
> = BaseFieldProps<T, K> &
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
    >
  > &
  Required<Pick<ComponentProps<typeof CheckboxGroup>, 'label' | 'name'>>

export const CheckboxGroupField = ({
  label,
  value,
  className,
  helper,
  direction,
  children,
  onChange,
  name,
  required = false,
}: CheckboxGroupFieldProps) => {
  const { getError } = useErrors()

  const { fields, meta } = useFieldArray(name, {
    type: 'checkbox',
    value,
    validate: localValue =>
      required && localValue?.length === 0 ? 'Required' : undefined,
  })

  const error = getError({
    label,
    meta,
    value: fields.value,
    name,
  })

  return (
    <CheckboxGroup
      label={label}
      name={fields.name}
      value={fields.value}
      onChange={event => {
        if (fields.value?.includes(event.currentTarget.value)) {
          fields.remove(fields.value.indexOf(event.currentTarget?.value))
        } else {
          fields.push(event.currentTarget.value)
        }

        onChange?.(event)
      }}
      error={error}
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
