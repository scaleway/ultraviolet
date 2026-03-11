'use client'

import type { ComponentProps } from 'react'
import { useContext } from 'react'
import { Radio } from '../Radio'
import { RadioGroupContext } from './Context'

type RadioGroupRadioProps = Omit<
  ComponentProps<typeof Radio>,
  'onChange' | 'checked' | 'required' | 'name'
>
export const RadioGroupRadio = ({
  onFocus,
  onBlur,
  disabled,
  error,
  value,
  label,
  helper,
  className,
  autoFocus,
  onKeyDown,
  tooltip,
  'data-testid': dataTestId,
  style,
}: RadioGroupRadioProps) => {
  const context = useContext(RadioGroupContext)

  if (!context) {
    throw new Error('RadioGroup.Radio can only be used inside a RadioGroup')
  }

  const { groupName, onChange, groupValue, error: errorContext } = context

  return (
    <Radio
      autoFocus={autoFocus} // oxlint-disable-line jsx_a11y/no-autofocus
      checked={groupValue === value}
      className={className}
      data-testid={dataTestId}
      disabled={disabled}
      error={error || errorContext}
      helper={helper}
      label={label}
      name={groupName}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      style={style}
      tooltip={tooltip}
      value={value}
    />
  )
}
