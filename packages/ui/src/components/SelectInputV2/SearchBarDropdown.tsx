import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { Dispatch, SetStateAction } from 'react'
import { TextInputV2 } from '../TextInputV2'
import type { DataType, OptionType } from './types'

type SearchBarProps = {
  options: DataType
  onSearch: Dispatch<SetStateAction<DataType>>
  placeholder: string
  displayedOptions: DataType
  multiselect: boolean
  searchInput: string | undefined
  setSearchInput: Dispatch<SetStateAction<string>>
  selectedValues: (OptionType | undefined)[]
  setSelectedValues: Dispatch<SetStateAction<(OptionType | undefined)[]>>
  setSearchBarActive: Dispatch<SetStateAction<boolean>>
  onChange?: (value: (string | undefined)[]) => void
}

const StyledInput = styled(TextInputV2)`
  margin: ${({ theme }) => theme.space[2]};
`

const findClosestOption = (
  options: DataType,
  searchInput: string | undefined,
) => {
  if (searchInput) {
    if (!Array.isArray(options)) {
      const possibleOptions = { ...options }
      Object.keys(possibleOptions).map((key: string) => {
        possibleOptions[key] = possibleOptions[key].filter(
          option => !option.disabled,
        )

        return null
      })
      if (
        Object.keys(possibleOptions).some(
          key => possibleOptions[key].length > 0,
        )
      ) {
        const firstFit = Object.keys(possibleOptions)
          .map(key => possibleOptions[key][0])
          .filter(value => !!value)[0]

        return firstFit
      }
    } else {
      const possibleOptions = [...options]
      possibleOptions.filter(option => !option.disabled)

      if (possibleOptions.length > 0) {
        return possibleOptions[0]
      }
    }
  }

  return 'NO_MATCH'
}
export const SearchBarDropdown = ({
  options,
  onSearch,
  placeholder,
  displayedOptions,
  multiselect,
  searchInput,
  selectedValues,
  setSearchInput,
  setSelectedValues,
  setSearchBarActive,
  onChange,
}: SearchBarProps) => {
  const handleChange = (search: string) => {
    if (search.length > 0) {
      // case insensitive search
      const regex = RegExp(search, 'gi')
      if (!Array.isArray(options)) {
        const filteredOptions = { ...options }
        Object.keys(filteredOptions).map((key: string) => {
          filteredOptions[key] = filteredOptions[key].filter(option =>
            option.value.match(regex),
          )

          return null
        })
        onSearch(filteredOptions)
      } else {
        const filteredOptions = [...options].filter(option =>
          option.value.match(regex),
        )
        onSearch(filteredOptions)
      }
    } else {
      onSearch(options)
    }
    setSearchInput(search)
  }

  const handleKeyDown = (key: string, search?: string) => {
    if (key === 'Enter') {
      const closestOption = findClosestOption(displayedOptions, search)
      if (closestOption !== 'NO_MATCH') {
        if (multiselect) {
          setSelectedValues(
            selectedValues.includes(closestOption)
              ? selectedValues
              : [...selectedValues, closestOption],
          )
          onChange?.(
            selectedValues.includes(closestOption)
              ? selectedValues.map(val => val?.value)
              : [...selectedValues, closestOption].map(val => val?.value),
          )
          setSearchInput(closestOption.value)
        } else {
          setSelectedValues([closestOption])
          setSearchInput(closestOption.value)
          onChange?.(selectedValues.map(val => val?.value))
        }
      }
    }
  }

  return (
    <StyledInput
      value={searchInput}
      onChange={event => handleChange(event)}
      placeholder={placeholder}
      onFocus={() => setSearchBarActive(true)}
      onBlur={() => setSearchBarActive(false)}
      data-testid="search-bar"
      prefix={<Icon name="search" size="small" sentiment="neutral" />}
      onKeyDown={event => {
        handleKeyDown(event.key, searchInput)
      }}
      autoFocus
    />
  )
}
