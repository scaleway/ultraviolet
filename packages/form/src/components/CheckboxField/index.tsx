import { Checkbox } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import type { FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type CheckboxFieldProps<TFieldValues extends FieldValues> =
  BaseFieldProps<TFieldValues> &
    Partial<
      Pick<
        ComponentProps<typeof Checkbox>,
        | 'disabled'
        | 'onBlur'
        | 'onChange'
        | 'onFocus'
        | 'progress'
        | 'size'
        | 'value'
        | 'data-testid'
        | 'helper'
        | 'tooltip'
      >
    > & {
      label?: string
      className?: string
      children?: ReactNode
      required?: boolean
    }

export const CheckboxField = <TFieldValues extends FieldValues>({
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
}: CheckboxFieldProps<TFieldValues>) => {
  const { getError } = useErrors()

  return (
    <Controller
      name={name}
      rules={{ required, ...rules }}
      render={({ field, fieldState: { error } }) => (
        <Checkbox
          name={field.name}
          onChange={event => {
            field.onChange(event)
            onChange?.(event)
          }}
          onBlur={event => {
            field.onBlur()
            onBlur?.(event)
          }}
          onFocus={onFocus}
          size={size}
          progress={progress}
          disabled={disabled}
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
      )}
    />
  )
}
