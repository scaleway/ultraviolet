import { Checkbox } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type CheckboxFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> &
  Partial<
    Pick<
      ComponentProps<typeof Checkbox>,
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
  value,
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
      name={field.name}
      onChange={event => {
        field.onChange(
          value ? [...(field.value ?? []), value] : event.target.checked,
        )
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
      checked={
        Array.isArray(field.value)
          ? (field.value as (typeof value)[]).includes(value)
          : !!field.value
      }
      error={getError({ label: label ?? '' }, error)}
      ref={field.ref}
      className={className}
      required={required}
      data-testid={dataTestId}
      helper={helper}
      tooltip={tooltip}
      value={value}
    >
      {children}
    </Checkbox>
  )
}
