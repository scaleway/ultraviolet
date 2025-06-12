'use client'

import { SwitchButton } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

type SwitchButtonFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof SwitchButton>, 'value' | 'name' | 'onChange'> &
  Partial<Pick<ComponentProps<typeof SwitchButton>, 'onChange'>> & {
    name: FieldPath<TFieldValues>
  }

const SwitchButtonField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  size,
  control,
  shouldUnregister,
  onBlur,
  onChange,
  onFocus,
  tooltip,
  className,
  ...props
}: SwitchButtonFieldProps<TFieldValues, TFieldName>) => {
  const { field } = useController<TFieldValues>({
    name,
    shouldUnregister,
    control,
  })

  return (
    <SwitchButton
      {...props}
      name={name}
      onChange={event => {
        field.onChange(event)
        onChange?.(
          event.target as PathValue<TFieldValues, TFieldName> | undefined,
        )
      }}
      value={field.value}
      tooltip={tooltip}
      size={size}
      className={className}
      onFocus={onFocus}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
    />
  )
}

SwitchButtonField.Option = SwitchButton.Option

export { SwitchButtonField }
