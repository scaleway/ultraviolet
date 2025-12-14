'use client'

import { RadioGroup } from '@ultraviolet/ui'
import type { ComponentProps, JSX } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type RadioGroupFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = Omit<BaseFieldProps<TFieldValues, TFieldName>, 'label'> &
  Omit<ComponentProps<typeof RadioGroup>, 'value' | 'onChange' | 'legend'> &
  Partial<Pick<ComponentProps<typeof RadioGroup>, 'legend'>>

const RadioGroupFieldComponent = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  onChange,
  required,
  children,
  error: customError,
  shouldUnregister = false,
  validate,
  legend = '',
  ...props
}: RadioGroupFieldProps<TFieldValues, TFieldName>): JSX.Element => {
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
    <RadioGroup
      {...props}
      error={getError({ label: legend }, error) ?? customError}
      legend={legend}
      name={field.name}
      onChange={event => {
        field.onChange(event)
        onChange?.(
          event.target.value as PathValue<TFieldValues, Path<TFieldValues>>,
        )
      }}
      required={required}
      value={field.value}
    >
      {children}
    </RadioGroup>
  )
}

type RadioGroupFieldType = typeof RadioGroupFieldComponent & {
  Radio: typeof RadioGroup.Radio
}

export const RadioGroupField: RadioGroupFieldType = Object.assign(
  RadioGroupFieldComponent,
  {
    Radio: RadioGroup.Radio,
  },
)
