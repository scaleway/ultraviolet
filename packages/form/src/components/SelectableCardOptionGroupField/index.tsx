'use client'

import { SelectableCardOptionGroup } from '@ultraviolet/ui'
import type { ComponentProps, JSX } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type SelectableCardOptionGroupUI = typeof SelectableCardOptionGroup

type SelectableCardOptionGroupFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = Omit<
  ComponentProps<SelectableCardOptionGroupUI>,
  'onChange' | 'onChangeOption'
> &
  Partial<
    Pick<
      ComponentProps<SelectableCardOptionGroupUI>,
      'onChangeOption' | 'onChange'
    >
  > &
  Omit<BaseFieldProps<TFieldValues, TFieldName>, 'label'> & {
    optionName?: string
  }

const SelectableCardOptionGroupFieldComponent: <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: SelectableCardOptionGroupFieldProps<TFieldValues, TFieldName>,
) => JSX.Element = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  legend = '',
  control,
  name,
  optionName,
  onChange,
  onChangeOption,
  required = false,
  children,
  error: customError,
  shouldUnregister = false,
  validate,
  ...props
}: SelectableCardOptionGroupFieldProps<
  TFieldValues,
  TFieldName
>): JSX.Element => {
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

  const { field: optionField } = useController({
    name: optionName ?? `${name}Option`,
    rules: { required },
    shouldUnregister,
  })

  return (
    <SelectableCardOptionGroup
      error={getError({ label: legend }, error) ?? customError}
      legend={legend}
      name={name}
      onChange={event => {
        field.onChange(event)
        onChange?.(event)
      }}
      onChangeOption={(value: string) => {
        optionField.onChange(value)
        onChangeOption?.(value)
      }}
      optionValue={String(optionField.value)}
      required={required}
      value={field.value as string}
      {...props}
    >
      {children}
    </SelectableCardOptionGroup>
  )
}

type SelectableCardOptionGroupFieldType =
  typeof SelectableCardOptionGroupFieldComponent & {
    Option: typeof SelectableCardOptionGroup.Option
  }

export const SelectableCardOptionGroupField: SelectableCardOptionGroupFieldType =
  Object.assign(SelectableCardOptionGroupFieldComponent, {
    Option: SelectableCardOptionGroup.Option,
  })
