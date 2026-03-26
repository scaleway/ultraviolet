'use client'

import { cn } from '@ultraviolet/utils'
import { useContext } from 'react'

import { Checkbox } from '../Checkbox'

import { CheckboxGroupContext } from './Context'
import { checkboxGroupStyle } from './styles.css'

import type { ComponentProps } from 'react'

type CheckboxGroupCheckboxProps = Omit<
  ComponentProps<typeof Checkbox>,
  'onChange' | 'checked'
> & {
  value: string
}

export const CheckboxGroupCheckbox = ({
  onFocus,
  onBlur,
  disabled,
  error,
  name,
  value,
  children,
  helper,
  className,
  autoFocus,
  'data-testid': dataTestId,
  required,
  tooltip,
  style,
  size,
}: CheckboxGroupCheckboxProps) => {
  const context = useContext(CheckboxGroupContext)

  if (!context) {
    throw new Error(
      'CheckboxGroup.Checkbox can only be used inside a CheckboxGroup',
    )
  }

  const { groupName, onChange, groupValues, error: errorContext } = context

  const checkboxName = `${groupName}.${name ?? ''}`
  const checkboxValue = value.toString()

  return (
    <Checkbox
      autoFocus={autoFocus} // oxlint-disable-line jsx_a11y/no-autofocus
      checked={groupValues?.includes(checkboxValue)}
      className={cn(className, checkboxGroupStyle.checkboxGroup)}
      data-testid={dataTestId}
      disabled={disabled}
      error={error || errorContext}
      helper={helper}
      name={checkboxName}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      required={required}
      size={size}
      style={style}
      tooltip={tooltip}
      value={checkboxValue}
    >
      {children}
    </Checkbox>
  )
}
