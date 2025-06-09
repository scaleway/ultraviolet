'use client'

import styled from '@emotion/styled'
import { ReactNode, RefObject, useEffect, useRef } from 'react'
import { SelectableCard } from '../SelectableCard'
import { useSwitchButtonContext } from './SwitchButtonContext'

const StyledSelectableCard = styled(SelectableCard)`
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

  &[data-checked='true'] label {
    color: ${({ theme }) => theme.colors.primary.textStrong};
  }


  &:not([data-checked='true']) label {
    &:hover {
      color: ${({ theme }) => theme.colors.primary.text};
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
  const context = useSwitchButtonContext()
  const ref = useRef<HTMLInputElement>(null)

  if (!context || Object.keys(context).length === 0) {
    throw new Error('SwitchButton.Option should be use inside a SwitchButton')
  }
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
      ref.current &&
      !refOptions.includes(ref as RefObject<HTMLInputElement>)
    ) {
      setRefOptions([...refOptions, ref as RefObject<HTMLInputElement>])
    }
  }, [refOptions, setRefOptions])

  return (
    <div id={value} ref={ref} onChange={handleOnChange}>
      <StyledSelectableCard
        name={name}
        value={value}
        checked={localValue === value && sentiment === 'primary'}
        onChange={handleOnChange}
        onBlur={onBlur}
        onFocus={onFocus}
        data-checked={localValue === value}
        label={children}
        data-testid={dataTestId ?? `switch-button-${value}`}
        id={value}
      />
    </div>
  )
}
