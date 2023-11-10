import { RadioGroup } from '@ultraviolet/ui'
import type { FieldState } from 'final-form'
import type { ComponentProps } from 'react'
import { useFormField } from '../../hooks'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type RadioValue = NonNullable<ComponentProps<typeof RadioGroup>['value']>

type RadioGroupFieldProps<T = RadioValue, K = string> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof RadioGroup>,
      | 'onChange'
      | 'value'
      | 'legend'
      | 'children'
      | 'required'
      | 'name'
      | 'error'
      | 'helper'
      | 'direction'
    >
  > & {
    className?: string
    name: string
    required?: boolean
  }

export const RadioGroupField = ({
  className,
  legend = '',
  name,
  onChange,
  required,
  validate,
  value,
  children,
  error: customError,
  helper,
  direction,
}: RadioGroupFieldProps) => {
  const { getError } = useErrors()

  const { input, meta } = useFormField(name, {
    required,
    validate,
    value,
  })

  const error = getError({
    label: legend,
    meta: meta as FieldState<unknown>,
    name,
    value: input.value,
  })

  return (
    <RadioGroup
      className={className}
      name={input.name}
      onChange={event => {
        input.onChange(event)
        onChange?.(event)
      }}
      required={required}
      value={input.value}
      legend={legend}
      error={error ?? customError}
      helper={helper}
      direction={direction}
    >
      {children}
    </RadioGroup>
  )
}

RadioGroupField.Radio = RadioGroup.Radio
