import { useDebouncedCallback } from '@ultraviolet/utils'
import { useEffect, useState } from 'react'
import { SearchInput } from '../../../components/SearchInput'
import type { FilterConfigItemSearch, FilterComponentProps } from '../types'

type FilterSearchProps = FilterComponentProps<string, FilterConfigItemSearch>

export const FilterSearch = ({ config, hideLabel, onChange, value, size }: FilterSearchProps) => {
  const [tempValue, setTempValue] = useState(value)

  const onSetValueLater = useDebouncedCallback(onChange, config.debounceDuration ?? 600)

  useEffect(() => {
    setTempValue(value)
  }, [value])

  return (
    <SearchInput
      aria-label={hideLabel ? config.label : undefined}
      label={hideLabel ? undefined : config.label}
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
