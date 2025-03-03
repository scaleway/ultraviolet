import { SelectableCardOptionGroup } from '@ultraviolet/ui'
import type { ComponentProps, JSX } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type SelectableCardOptionGroupFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = ComponentProps<typeof SelectableCardOptionGroup> &
  BaseFieldProps<TFieldValues, TFieldName> &
  Omit<BaseFieldProps<TFieldValues, TFieldName>, 'label'>

export const SelectableCardOptionGroupField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  legend,
  control,
  name,
  onChange,
  onChangeOption,
  required = false,
  children,
  label = '',
  error: customError,
  helper,
  columns,
  shouldUnregister = false,
  validate,
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
    name: `${name}-option`,
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
      className={className}
      columns={columns}
      helper={helper}
      required={required}
    >
      {children}
    </SelectableCardOptionGroup>
  )
}

SelectableCardOptionGroupField.Option = SelectableCardOptionGroup.Option
