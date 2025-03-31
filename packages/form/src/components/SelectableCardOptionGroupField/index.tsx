import { SelectableCardOptionGroup } from '@ultraviolet/ui'
import type { ComponentProps, JSX } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type SelectableCardOptionGroupFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = Omit<
  ComponentProps<typeof SelectableCardOptionGroup>,
  'onChange' | 'onChangeOption'
> &
  Partial<
    Pick<
      ComponentProps<typeof SelectableCardOptionGroup>,
      'onChangeOption' | 'onChange'
    >
  > &
  BaseFieldProps<TFieldValues, TFieldName> &
  Omit<BaseFieldProps<TFieldValues, TFieldName>, 'label'> & {
    optionName?: string
  }

export const SelectableCardOptionGroupField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  legend,
  control,
  name,
  optionName,
  onChange,
  onChangeOption,
  required = false,
  children,
  label = '',
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
    name,
    control,
    shouldUnregister,
    rules: {
      required,
      validate,
    },
  })

  const { field: optionField } = useController({
    name: optionName ?? `${name}Option`,
    shouldUnregister,
    rules: { required },
  })

  return (
    <SelectableCardOptionGroup
      legend={legend}
      name={name}
      value={field.value as string}
      optionValue={String(optionField.value)}
      onChange={event => {
        field.onChange(event)
        onChange?.(event)
      }}
      onChangeOption={(value: string) => {
        optionField.onChange(value)
        onChangeOption?.(value)
      }}
      error={getError({ label }, error) ?? customError}
      required={required}
      {...props}
    >
      {children}
    </SelectableCardOptionGroup>
  )
}

SelectableCardOptionGroupField.Option = SelectableCardOptionGroup.Option
