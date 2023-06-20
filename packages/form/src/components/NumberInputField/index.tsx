import { NumberInput } from '@ultraviolet/ui'
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
      | 'data-testid'
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
  'data-testid': dataTestId,
}: NumberInputValueFieldProps) => {
  const { input } = useFormField<number>(name, {
    disabled,
    required,
    type: 'number',
    validate,
    value,
    defaultValue: 0,
    max: maxValue,
    min: minValue,
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
        onChange?.(event)
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
      data-testid={dataTestId}
    />
  )
}
