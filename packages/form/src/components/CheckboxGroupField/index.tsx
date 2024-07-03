import { CheckboxGroup } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Children, isValidElement, useCallback } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

const arraysContainSameValues = (array1: string[], array2: string[]) => {
  if (array1.length === 0) {
    return false
  }

  return array2.every(value => array1.includes(value))
}

type CheckboxGroupFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Partial<
    Pick<
      ComponentProps<typeof CheckboxGroup>,
      | 'className'
      | 'helper'
      | 'required'
      | 'direction'
      | 'children'
      | 'error'
      | 'legend'
    >
  > &
  Required<Pick<ComponentProps<typeof CheckboxGroup>, 'legend'>>

type ElementProps = {
  name: string
  value: string
  required?: boolean
}

export const CheckboxGroupField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  legend,
  className,
  control,
  helper,
  direction,
  children,
  onChange,
  label = '',
  error: customError,
  name,
  required = false,
  shouldUnregister = false,
  validate,
}: CheckboxGroupFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const checkboxValid = useCallback(
    (value: string[]) => {
      const requiredChildren =
        Children.map(children, child => {
          if (isValidElement<ElementProps>(child)) {
            if (child.props.required) {
              return child.props.name
            }

            return null
          }

          return null
        })?.filter(Boolean) ?? []

      if (!required && arraysContainSameValues(value, requiredChildren)) {
        return true
      }

      if (value.length >= Children.count(children)) {
        return true
      }

      return false
    },
    [children, required],
  )

  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    control,
    shouldUnregister,
    rules: {
      validate: {
        checkboxValid,
        ...validate,
      },
    },
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

        onChange?.(
          event.currentTarget.value as PathValue<
            TFieldValues,
            Path<TFieldValues>
          >,
        )
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
