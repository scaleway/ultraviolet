import type { FieldPath, FieldValues, PathValue } from '@ultraviolet/form'
import { SwitchButton } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

type SwitchButtonFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Omit<ComponentProps<typeof SwitchButton>, 'value' | 'name'> & {
    name: FieldPath<TFieldValues>
  }

export const SwitchButtonField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  leftButton,
  rightButton,
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
      leftButton={leftButton}
      rightButton={rightButton}
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
