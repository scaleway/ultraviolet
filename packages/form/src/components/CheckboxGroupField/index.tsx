'use client'

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
> = Omit<BaseFieldProps<TFieldValues, TFieldName>, 'label'> &
  Omit<ComponentProps<typeof CheckboxGroup>, 'value' | 'onChange'>

type ElementProps = {
  name: string
  value: string
  required?: boolean
}

const CheckboxGroupFieldComponent = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  children,
  onChange,
  error: customError,
  name,
  required = false,
  shouldUnregister = false,
  validate,
  legend = '',
  ...props
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

      if (requiredChildren.length === 0 && !required) {
        return true
      }

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
    control,
    name,
    rules: {
      validate: {
        checkboxValid,
        ...validate,
      },
    },
    shouldUnregister,
  })

  return (
    <CheckboxGroup
      {...props}
      error={getError({ label: legend }, error) ?? customError}
      legend={legend}
      name={name}
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
      required={required}
      value={field.value}
    >
      {children}
    </CheckboxGroup>
  )
}

type RadioGroupFieldType = typeof CheckboxGroupFieldComponent & {
  Checkbox: typeof CheckboxGroup.Checkbox
}

export const CheckboxGroupField: RadioGroupFieldType = Object.assign(
  CheckboxGroupFieldComponent,
  {
    Checkbox: CheckboxGroup.Checkbox,
  },
)
