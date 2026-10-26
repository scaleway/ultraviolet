import { useDebouncedCallback } from '@ultraviolet/utils'
import { useState } from 'react'
import { SearchInput } from '../../../components/Data Entry/SearchInput'
import type { FilterComponentProps, FilterConfigItemSearch } from '../types'

type FilterSearchProps = FilterComponentProps<string, FilterConfigItemSearch>

export const FilterSearch = ({ config, hideLabel, onChange, value, size }: FilterSearchProps) => {
  const [tempValue, setTempValue] = useState(value)
  const [previousValue, setPreviousValue] = useState(value)

  const onSetValueLater = useDebouncedCallback(onChange, config.debounceDuration ?? 600)

  if (value !== previousValue) {
    setPreviousValue(value)
    setTempValue(value)
  }

  return (
    <SearchInput
      aria-label={hideLabel ? config.label : undefined}
      label={hideLabel ? undefined : config.label}
      labelDescription={hideLabel ? undefined : config.labelDescription}
      loading={tempValue !== value}
      name={config.name}
      size={size}
      onSearch={searchString => {
        setTempValue(searchString)
        onSetValueLater(searchString)
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
