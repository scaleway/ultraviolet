import { Radio } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useErrors } from '../../providers'
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
      | 'data-testid'
      | 'tooltip'
      | 'label'
    >
  > & {
    className?: string
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
}: RadioFieldProps<TFieldValues>) => {
  const { getError } = useErrors()

  return (
    <Controller
      name={name}
      rules={{
        required,
        ...rules,
      }}
      render={({ field, fieldState: { error } }) => (
        <Radio
          name={field.name}
          checked={field.value === value}
          className={className}
          data-testid={dataTestId}
          disabled={disabled}
          error={getError(
            { label: typeof label === 'string' ? label : '' },
            error,
          )}
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
}
