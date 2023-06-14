import { Radio } from '@ultraviolet/ui'
import type { ComponentProps, JSX } from 'react'
import type { FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

type RadioFieldProps<TFieldValues extends FieldValues> = Omit<
  BaseFieldProps<TFieldValues>,
  'label'
> &
  Partial<
    Pick<
      ComponentProps<typeof Radio>,
      | 'disabled'
      | 'id'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'value'
      | 'data-testid'
      | 'label'
      | 'tooltip'
    >
  > & {
    className?: string
    name: string
    required?: boolean
  }

export const RadioField = <TFieldValues extends FieldValues>({
  className,
  'data-testid': dataTestId,
  disabled,
  id,
  name,
  onBlur,
  label = '',
  onChange,
  onFocus,
  required,
  value,
  rules,
  tooltip,
}: RadioFieldProps<TFieldValues>): JSX.Element => (
  <Controller
    name={name}
    rules={{
      required,
      ...rules,
    }}
    render={({ field, fieldState: { error } }) => (
      <Radio
        checked={field.value === value}
        className={className}
        data-testid={dataTestId}
        disabled={disabled}
        error={error?.message}
        id={id}
        onChange={event => {
          field.onChange(value)
          onChange?.(event)
        }}
        onBlur={event => {
          field.onBlur()
          onBlur?.(event)
        }}
        onFocus={onFocus}
        required={required}
        value={value ?? ''}
        label={label}
        tooltip={tooltip}
      />
    )}
  />
)
