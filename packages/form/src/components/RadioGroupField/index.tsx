import { RadioGroup } from '@ultraviolet/ui'
import type { ComponentProps, JSX } from 'react'
import type { FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type RadioGroupFieldProps<TFieldValues extends FieldValues> =
  BaseFieldProps<TFieldValues> &
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

export const RadioGroupField = <TFieldValues extends FieldValues>({
  className,
  legend = '',
  name,
  onChange,
  required,
  value,
  rules,
  children,
  label = '',
  error: customError,
  helper,
  direction,
}: RadioGroupFieldProps<TFieldValues>): JSX.Element => {
  const { getError } = useErrors()

  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <RadioGroup
          className={className}
          name={field.name}
          onChange={event => {
            field.onChange(event)
            onChange?.(event)
          }}
          required={required}
          value={value ?? ''}
          legend={legend}
          error={getError({ label }, error) ?? customError}
          helper={helper}
          direction={direction}
        >
          {children}
        </RadioGroup>
      )}
    />
  )
}

RadioGroupField.Radio = RadioGroup.Radio
