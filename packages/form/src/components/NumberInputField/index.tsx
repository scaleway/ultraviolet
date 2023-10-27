import { NumberInput } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent, FocusEventHandler } from 'react'
import type { FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type NumberInputValueFieldProps<TFieldValues extends FieldValues> =
  BaseFieldProps<TFieldValues> &
    Partial<
      Pick<
        ComponentProps<typeof NumberInput>,
        | 'disabled'
        | 'maxValue'
        | 'minValue'
        | 'onMaxCrossed'
        | 'onMinCrossed'
        | 'size'
        | 'step'
        | 'text'
        | 'value'
        | 'onChange'
        | 'className'
      >
    > & {
      onBlur?: FocusEventHandler<HTMLInputElement>
      onFocus?: FocusEventHandler<HTMLInputElement>
    }

export const NumberInputField = <TFieldValues extends FieldValues>({
  disabled,
  maxValue,
  minValue,
  name,
  onChange,
  onBlur,
  onFocus,
  onMaxCrossed,
  onMinCrossed,
  required,
  size,
  step,
  text,
  rules,
  className,
  label,
}: NumberInputValueFieldProps<TFieldValues>) => {
  const { getError } = useErrors()

  return (
    <Controller
      name={name}
      rules={{
        required,
        max: maxValue,
        min: minValue,
        ...rules,
      }}
      render={({ field, fieldState: { error } }) => (
        <NumberInput
          name={field.name}
          value={field.value}
          disabled={disabled}
          onBlur={(event: FocusEvent<HTMLInputElement>) => {
            field.onBlur()
            onBlur?.(event)
          }}
          onChange={event => {
            // React hook form doesnt allow undefined values after definition https://react-hook-form.com/docs/usecontroller/controller (that make sense)
            field.onChange(event ?? null)
            onChange?.(event)
          }}
          onFocus={onFocus}
          maxValue={maxValue}
          minValue={minValue}
          onMinCrossed={onMinCrossed}
          onMaxCrossed={onMaxCrossed}
          size={size}
          step={step}
          text={text}
          className={className}
          label={label}
          error={getError(
            { label: label ?? '', max: maxValue, min: minValue },
            error,
          )}
        />
      )}
    />
  )
}
