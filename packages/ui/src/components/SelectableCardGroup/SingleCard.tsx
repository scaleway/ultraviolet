'use client'

import { useContext } from 'react'

import { SelectableCard } from '../SelectableCard'

import { SelectableCardGroupContext } from './Context'

import type { ComponentProps } from 'react'

export type CardSelectableCardProps = Omit<
  ComponentProps<typeof SelectableCard>,
  'onChange' | 'checked' | 'type' | 'showTick'
>

export const CardSelectableCard = ({
  value,
  disabled,
  children,
  className,
  isError,
  onFocus,
  onBlur,
  tooltip,
  id,
  label,
  style,
  'data-testid': dataTestId,
}: CardSelectableCardProps) => {
  const context = useContext(SelectableCardGroupContext)

  if (!context) {
    throw new Error(
      'SelectableCardGroup.Card can only be used inside a SelectableCardGroup',
    )
  }

  const { groupName, onChange, groupValue, type, showTick, error } = context

  return (
    <SelectableCard
      checked={
        typeof groupValue === 'object'
          ? groupValue.includes(value)
          : groupValue === value
      }
      className={className}
      data-testid={dataTestId}
      disabled={disabled}
      id={id}
      isError={isError || error}
      label={label}
      name={groupName}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      showTick={showTick}
      style={style}
      tooltip={tooltip}
      type={type}
      value={value}
    >
      {children}
    </SelectableCard>
  )
}
