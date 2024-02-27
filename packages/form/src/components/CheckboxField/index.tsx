import { Checkbox } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type CheckboxFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<BaseFieldProps<TFieldValues, TName>, 'value'> &
  Partial<
    Pick<
      ComponentProps<typeof Checkbox>,
      | 'id'
      | 'disabled'
      | 'onBlur'
      | 'onFocus'
      | 'progress'
      | 'size'
      | 'data-testid'
      | 'helper'
      | 'tooltip'
    >
  > & {
    className?: string
    children?: ReactNode
  }

export const CheckboxField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  id,
  name,
  label,
  size,
  progress,
  disabled,
  required,
  className,
  children,
  onChange,
  onBlur,
  onFocus,
  rules,
  helper,
  tooltip,
  'data-testid': dataTestId,
  shouldUnregister = false,
}: CheckboxFieldProps<TFieldValues, TName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    disabled,
    shouldUnregister,
    rules: {
      required,
      ...rules,
    },
  })

  return (
    <Checkbox
      id={id}
      name={field.name}
      onChange={event => {
        field.onChange(event.target.checked)
        onChange?.(
          event.target.checked as PathValue<TFieldValues, Path<TFieldValues>>,
        )
      }}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      onFocus={onFocus}
      size={size}
      progress={progress}
      disabled={field.disabled}
      checked={!!field.value}
      error={getError({ label: label ?? '' }, error)}
      ref={field.ref}
      className={className}
      required={required}
      data-testid={dataTestId}
      helper={helper}
      tooltip={tooltip}
    >
      {children}
    </Checkbox>
  )
}
