'use client'

import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { SelectableCard } from '../SelectableCard'
import { useSwitchButton } from './SwitchButtonContext'

const StyledSelectableCard = styled(SelectableCard, {
  shouldForwardProp: prop => !['sentiment'].includes(prop),
})<{ sentiment: 'neutral' | 'primary' }>`
  border: none;
  padding: ${({ theme }) => theme.space['1']} ${({ theme }) => theme.space['2']};
  font-weight: ${({ theme }) => theme.typography.bodyStrong.weight};
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-in-out;
  white-space: nowrap;
  background: transparent;
  height: 100%;

  &:hover,
  &:active {
    box-shadow: none;
    border: none;
    &:not([data-error='true'][data-disabled='true']) {
      border: none;
    }
  }

  &[data-checked='true'] {
    border: none;
  }

  & label {
    transition: color 300ms;
    color: ${({ theme }) => theme.colors.neutral.textStrong};
  }

  &[data-checked='true'] label {
    color: ${({ theme, sentiment }) =>
      sentiment === 'neutral'
        ? theme.colors.neutral.textStrong
        : theme.colors.primary.textStrong};
  }

  &:not([data-checked='true']) label {
    &:hover {
      color: ${({ theme, sentiment }) =>
        sentiment === 'neutral'
          ? theme.colors.neutral.textHover
          : theme.colors.primary.text};
    }
  }

`

type OptionProps = {
  value: string
  children: ReactNode
  'data-testid'?: string
}
export const Option = ({
  value,
  children,
  'data-testid': dataTestId,
}: OptionProps) => {
  const context = useSwitchButton()
  const ref = useRef<HTMLInputElement>(null)

  const {
    localValue,
    name,
    onBlur,
    onFocus,
    handleOnChange,
    refOptions,
    setRefOptions,
    sentiment,
  } = context
  useEffect(() => {
    if (
      ref?.current &&
      refOptions.filter(option => option.value === value).length === 0
    ) {
      const option = {
        value,
        current: ref.current,
      }
      setRefOptions([...refOptions, option])
    }
  }, [refOptions, setRefOptions, value])

  return (
    <StyledSelectableCard
      name={name}
      value={value}
      checked={localValue === value}
      onChange={handleOnChange}
      onBlur={onBlur}
      onFocus={onFocus}
      data-checked={localValue === value}
      label={children}
      data-testid={dataTestId ?? `switch-button-${value}`}
      ref={ref}
      sentiment={sentiment}
    />
  )
}
