'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { SelectableCard } from '../SelectableCard'
import { useSwitchButton } from './SwitchButtonContext'
import { switchButtonOption } from './styles.css'

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
    <SelectableCard
      checked={localValue === value}
      className={switchButtonOption[sentiment]}
      data-checked={localValue === value}
      data-testid={dataTestId ?? `switch-button-${value}`}
      disabled={!!disabled}
      label={children}
      name={name}
      onBlur={onBlur}
      onChange={handleOnChange}
      onFocus={onFocus}
      ref={ref}
      tooltip={tooltip}
      value={value}
    />
  )
}
