import { TextInput } from '@ultraviolet/ui'
import { useDebouncedCallback } from '@ultraviolet/utils'
import { useEffect, useState } from 'react'
import type { FilterConfigItemText, FilterComponentProps } from '../types'

type FilterTextProps = FilterComponentProps<string, FilterConfigItemText>

export const FilterText = ({ config, hideLabel, onChange, value, size }: FilterTextProps) => {
  const [tempValue, setTempValue] = useState(value)

  const onSetValueLater = useDebouncedCallback(onChange, config.debounceDuration ?? 600)

  useEffect(() => {
    setTempValue(value)
  }, [value])

  return (
    <TextInput
      aria-label={hideLabel ? config.label : undefined}
      label={hideLabel ? undefined : config.label}
      loading={tempValue !== value}
      name={config.name}
      size={size}
      onChange={event => {
        setTempValue(event.target.value)
        onSetValueLater(event.target.value)
      }}
      onKeyDown={event => {
        if (event.key === 'Enter') {
          event.preventDefault()
          event.stopPropagation()
        }
      }}
      placeholder={config.placeholder}
      value={tempValue}
    />
  )
}
