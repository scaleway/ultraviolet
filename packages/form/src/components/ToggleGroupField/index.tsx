import { ToggleGroup } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Controller, type FieldValues } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type ToggleGroupFieldProps<TFieldValues extends FieldValues> =
  BaseFieldProps<TFieldValues> &
    Partial<
      Pick<
        ComponentProps<typeof ToggleGroup>,
        | 'className'
        | 'helper'
        | 'onChange'
        | 'direction'
        | 'children'
        | 'error'
        | 'legend'
      >
    > &
    Required<Pick<ComponentProps<typeof ToggleGroup>, 'legend' | 'name'>>

export const ToggleGroupField = <TFieldValues extends FieldValues>({
  legend,
  className,
  helper,
  direction,
  children,
  onChange,
  label,
  error: customError,
  name,
  required = false,
}: ToggleGroupFieldProps<TFieldValues>) => {
  const { getError } = useErrors()

  return (
    <Controller
      name={name}
      rules={{
        validate: required ? value => value.length > 0 : undefined,
      }}
      render={({ field, fieldState: { error } }) => {
        const value = field.value as string[]

        return (
          <ToggleGroup
            legend={legend}
            name={field.name}
            value={value}
            onChange={event => {
              if (value.includes(event.currentTarget.value)) {
                field.onChange(
                  value.filter(
                    currentValue => currentValue !== event.currentTarget.value,
                  ),
                )
              } else {
                field.onChange([...value, event.currentTarget.value])
              }

              onChange?.(event)
            }}
            error={customError ?? getError({ label: label ?? '' }, error)}
            className={className}
            direction={direction}
            helper={helper}
            required={required}
          >
            {children}
          </ToggleGroup>
        )
      }}
    />
  )
}

ToggleGroupField.Toggle = ToggleGroup.Toggle
