import { SelectableCard } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

type SelectableCardFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = Omit<BaseFieldProps<TFieldValues, TFieldName>, 'label' | 'onChange'> &
  Partial<
    Pick<
      ComponentProps<typeof SelectableCard>,
      | 'disabled'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'showTick'
      | 'type'
      | 'id'
      | 'children'
      | 'tooltip'
      | 'label'
      | 'data-testid'
    >
  > & {
    className?: string
  }

export const SelectableCardField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  value,
  onChange,
  showTick,
  type,
  disabled,
  children,
  className,
  onFocus,
  onBlur,
  required,
  tooltip,
  id,
  label,
  shouldUnregister = false,
  validate,
  'data-testid': dataTestId,
}: SelectableCardFieldProps<TFieldValues, TFieldName>) => {
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

  const isChecked =
    type === 'checkbox' && Array.isArray(field.value) && value
      ? (field.value ?? []).includes(value)
      : field.value === value

  return (
    <SelectableCard
      isError={!!error}
      showTick={showTick}
      checked={isChecked}
      className={className}
      disabled={disabled}
      onChange={event => {
        if (type === 'checkbox') {
          const fieldValue = (field.value ?? []) as string[]
          if (fieldValue?.includes(event.currentTarget.value)) {
            field.onChange(
              fieldValue?.filter(
                currentValue => currentValue !== event.currentTarget.value,
              ),
            )
          } else {
            field.onChange([...fieldValue, event.currentTarget.value])
          }
        } else {
          field.onChange(event)
        }
        onChange?.(event)
      }}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      onFocus={event => {
        onFocus?.(event)
      }}
      type={type}
      id={id}
      tooltip={tooltip}
      label={label}
      value={value ?? ''}
      name={field.name}
      data-testid={dataTestId}
    >
      {children}
    </SelectableCard>
  )
}
