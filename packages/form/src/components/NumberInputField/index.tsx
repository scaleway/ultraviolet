import { NumberInput } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent, FocusEventHandler } from 'react'
import type { FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
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
  // validate,
  // value,
  rules,
  className,
}: NumberInputValueFieldProps<TFieldValues>) => (
  <Controller
    name={name}
    rules={{
      required,
      max: maxValue,
      min: minValue,
      ...rules,
    }}
    render={({ field }) => (
      <NumberInput
        {...field}
        disabled={disabled}
        onBlur={(event: FocusEvent<HTMLInputElement>) => {
          field.onBlur()
          onBlur?.(event)
        }}
        onChange={event => {
          field.onChange(event)
          onChange?.(event as number)
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
      />
    )}
  />
)
