import { SelectableCard } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

type SelectableCardFieldProps<TFieldValues extends FieldValues> = Omit<
  BaseFieldProps<TFieldValues>,
  'label' | 'onChange'
> &
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
    >
  > & {
    className?: string
  }

export const SelectableCardField = <TFieldValues extends FieldValues>({
  name,
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
  rules,
  shouldUnregister = false,
}: SelectableCardFieldProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    shouldUnregister,
    rules: {
      required,
      ...rules,
    },
  })

  return (
    <SelectableCard
      isError={!!error}
      showTick={showTick}
      checked={field.value === value}
      className={className}
      disabled={disabled}
      onChange={event => {
        field.onChange(event)
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
    >
      {children}
    </SelectableCard>
  )
}
