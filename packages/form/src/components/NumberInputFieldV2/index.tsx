import { NumberInputV2 } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent } from 'react'
import { useFormField } from '../../hooks'
import type { BaseFieldProps } from '../../types'

type NumberInputV2Value = NonNullable<
  ComponentProps<typeof NumberInputV2>['value']
>

type NumberInputV2Props<T = NumberInputV2Value, K = string> = BaseFieldProps<
  T,
  K
> &
  Partial<
    Pick<
      ComponentProps<typeof NumberInputV2>,
      | 'disabled'
      | 'id'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'value'
      | 'data-testid'
      | 'label'
      | 'tooltip'
      | 'unit'
      | 'size'
      | 'step'
      | 'className'
      | 'placeholder'
      | 'error'
      | 'success'
      | 'helper'
      | 'labelDescription'
      | 'aria-label'
      | 'autoFocus'
      | 'readOnly'
      | 'min'
      | 'max'
    >
  > & {
    className?: string
    name: string
    required?: boolean
  }

export const NumberInputFieldV2 = ({
  disabled,
  max,
  min,
  name,
  onChange,
  onFocus,
  onBlur,
  size,
  step,
  unit,
  value,
  tooltip,
  className,
  label,
  labelDescription,
  id,
  placeholder,
  error,
  success,
  helper,
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
  validate,
  required,
  autoFocus,
  readOnly,
}: NumberInputV2Props) => {
  const { input } = useFormField(name, {
    disabled,
    required,
    type: 'number',
    validate,
    value,
    max: typeof max === 'number' ? max : Number(max),
    min: typeof min === 'number' ? min : Number(min),
  })

  return (
    <NumberInputV2
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
      max={max}
      min={min}
      size={size}
      step={step}
      value={input.value}
      className={className}
      data-testid={dataTestId}
      id={id}
      label={label}
      labelDescription={labelDescription}
      placeholder={placeholder}
      error={error}
      success={success}
      helper={helper}
      tooltip={tooltip}
      unit={unit}
      aria-label={ariaLabel}
      autoFocus={autoFocus}
      readOnly={readOnly}
    />
  )
}
