import type { FieldPath, FieldValues } from '@ultraviolet/form'
import { SwitchButton } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

type SwitchButtonFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Pick<
    ComponentProps<typeof SwitchButton>,
    'leftButton' | 'rightButton' | 'tooltip' | 'onBlur' | 'onFocus'
  > & {
    name: FieldPath<TFieldValues>
  }

export const SwitchButtonField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  leftButton,
  rightButton,
  onBlur,
  onFocus,
  tooltip,
}: SwitchButtonFieldProps<TFieldValues, TFieldName>) => {
  const { field } = useController<TFieldValues>({ name })

  return (
    <SwitchButton
      name={name}
      leftButton={leftButton}
      rightButton={rightButton}
      onChange={field.onChange}
      value={field.value}
      tooltip={tooltip}
      onFocus={onFocus}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
    />
  )
}
