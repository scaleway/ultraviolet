import { NumberInput } from '@scaleway/ui'
import type { ComponentProps, FocusEvent, FocusEventHandler } from 'react'
import { useFormField } from '../../hooks'
import type { BaseFieldProps } from '../../types'

type NumberInputValue = NonNullable<ComponentProps<typeof NumberInput>['value']>

type NumberInputValueFieldProps<
  T = NumberInputValue,
  K = string,
> = BaseFieldProps<T, K> &
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
    name: string
    required?: boolean
    onBlur?: FocusEventHandler<HTMLInputElement>
    onFocus?: FocusEventHandler<HTMLInputElement>
  }

export const NumberInputField = ({
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
  validate,
  value,
  className,
}: NumberInputValueFieldProps) => {
  const { input } = useFormField(name, {
    disabled,
    required,
    type: 'number',
    validate,
    value,
  })

  return (
    <NumberInput
      name={name}
      disabled={disabled}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        input.onBlur(event)
        onBlur?.(event)
      }}
      onChange={event => {
        input.onChange(event)
        onChange?.(event as number)
      }}
      onFocus={(event: FocusEvent<HTMLInputElement>) => {
        input.onFocus(event)
        onFocus?.(event)
      }}
      maxValue={maxValue}
      minValue={minValue}
      onMinCrossed={onMinCrossed}
      onMaxCrossed={onMaxCrossed}
      size={size}
      step={step}
      text={text}
      value={input.value}
      className={className}
    />
  )
}
