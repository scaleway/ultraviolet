'use client'

import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { SelectableCard } from '../SelectableCard'
import { useSwitchButton } from './SwitchButtonContext'

const StyledSelectableCard = styled(SelectableCard, {
  shouldForwardProp: prop => !['sentiment'].includes(prop),
})<{ sentiment: 'neutral' | 'primary'; disabled?: boolean }>`
  border: none;
  padding: ${({ theme }) => theme.space['1']} ${({ theme }) => theme.space['2']};
  font-weight: ${({ theme }) => theme.typography.bodyStrong.weight};
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-in-out;
  white-space: nowrap;
  background: transparent;
  height: 100%;
  user-select: none;

  &[data-checked="false"]:active,  &[data-checked="false"]:hover {
    &:not([data-error="true"]):not([data-disabled="true"]) { 
      box-shadow: none;
    }
  }

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

  ${({ disabled, theme }) =>
    disabled
      ? `
      &[data-disabled='true'] {
        background: transparent;
        border: none;
      }

      label {
        color: ${theme.colors.neutral.textDisabled};
      }

      &:not([data-checked='true']) label {
        &:hover {
          background: transparent;
          color: ${theme.colors.neutral.textDisabled};
        }
      }
  `
      : ''}

`

type OptionProps = {
  value: string
  children: ReactNode
  'data-testid'?: string
  disabled?: boolean
  tooltip?: string
}
export const Option = ({
  value,
  children,
  'data-testid': dataTestId,
  disabled,
  tooltip,
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
        current: ref.current,
        value,
      }
      setRefOptions([...refOptions, option])
    }
  }, [refOptions, setRefOptions, value])

  return (
    <StyledSelectableCard
      checked={localValue === value}
      data-checked={localValue === value}
      data-testid={dataTestId ?? `switch-button-${value}`}
      disabled={disabled}
      label={children}
      name={name}
      onBlur={onBlur}
      onChange={handleOnChange}
      onFocus={onFocus}
      ref={ref}
      sentiment={sentiment}
      tooltip={tooltip}
      value={value}
    />
  )
}
