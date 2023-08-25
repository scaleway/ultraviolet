import { CheckboxGroup } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useFieldArray } from 'react-final-form-arrays'
// import { useFormField } from '../../hooks'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'
import { CheckboxField } from '../CheckboxField'

type CheckboxGroupValue = string[]

type CheckboxGroupFieldProps<
  T = CheckboxGroupValue,
  K = string,
> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof CheckboxGroup>,
      | 'className'
      | 'label'
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
  label: legend,
  value,
  className,
  helper,
  direction,
  children,
  onChange,
  name, // required = false,
}: CheckboxGroupFieldProps) => {
  const { getError } = useErrors()

  // const { input, meta } = useFormField(name, {
  //   type: 'checkbox',
  //   value,
  //   required,
  // })
  const { fields, meta } = useFieldArray(name, {
    type: 'checkbox',
    value,
  })

  const error = getError({
    label: legend,
    meta,
    value: fields.value,
    name,
  })

  // console.log('error', error)
  // console.log('fields', fields)
  // console.log('value', fields.value)
  // console.log('meta', meta)

  return (
    <CheckboxGroup
      label={legend}
      name={fields.name}
      value={fields.value}
      onChange={event => {
        if (fields.value.includes(event.currentTarget.value)) {
          fields.remove(fields.value.indexOf(event.currentTarget?.value))
        } else {
          fields.push(event.currentTarget.value)
        }
        // if (required && !fields.value.length) {
        //   error = 'hjfdyhd'
        // }

        onChange?.(event)
      }}
      error={error}
      className={className}
      direction={direction}
      helper={helper}
    >
      {children}
    </CheckboxGroup>
  )
}

CheckboxGroupField.Checkbox = CheckboxField
