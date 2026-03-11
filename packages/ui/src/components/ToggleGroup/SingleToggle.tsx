'use client'

import type { ComponentProps } from 'react'
import { useContext } from 'react'
import { Toggle } from '../Toggle'
import { ToggleGroupContext } from './Context'

type ToggleGroupToggleProps = Omit<
  ComponentProps<typeof Toggle>,
  'onChange' | 'checked' | 'required'
> & {
  value: string
}

/**
 * ToggleGroup is a component that allows you to group a set of Toggle components together under the same legend.
 */
export const ToggleGroupToggle = ({
  disabled,
  name,
  value,
  label,
  helper,
  error,
  className,
  'data-testid': dataTestId,
  style,
}: ToggleGroupToggleProps) => {
  const context = useContext(ToggleGroupContext)

  if (!context) {
    throw new Error('ToggleGroup.Toggle can only be used inside a ToggleGroup')
  }

  const { groupName, onChange, groupValues, error: contextError } = context

  const ToggleName = `${groupName}.${name}`
  const ToggleValue = value.toString()

  return (
    <Toggle
      checked={groupValues?.includes(ToggleValue)}
      className={className}
      data-testid={dataTestId}
      disabled={disabled}
      error={error || contextError}
      helper={helper}
      label={label}
      name={ToggleName}
      onChange={onChange}
      style={style}
      value={ToggleValue}
    />
  )
}
