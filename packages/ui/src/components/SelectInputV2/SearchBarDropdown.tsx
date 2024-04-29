import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { Dispatch, SetStateAction } from 'react'
import { TextInputV2 } from '../TextInputV2'
import { useSelectInput } from './SelectInputProvider'
import type { DataType } from './types'

type SearchBarProps = {
  placeholder: string
  displayedOptions: DataType
  setSearchBarActive: Dispatch<SetStateAction<boolean>>
}

const StyledInput = styled(TextInputV2)`
  padding-top: ${({ theme }) => theme.space[1.5]};
  padding-bottom: ${({ theme }) => theme.space[1.5]};
  padding-left: ${({ theme }) => theme.space[2]};
  padding-right: ${({ theme }) => theme.space[2]};
`

const findClosestOption = (
  options: DataType,
  searchInput: string | undefined,
) => {
  if (searchInput) {
    if (!Array.isArray(options)) {
      const possibleOptions = { ...options }
      Object.keys(possibleOptions).map((group: string) => {
        possibleOptions[group] = possibleOptions[group].filter(
          option => !option.disabled,
        )

        return null
      })
      if (
        Object.keys(possibleOptions).some(
          group => possibleOptions[group].length > 0,
        )
      ) {
        const firstFit = Object.keys(possibleOptions)
          .map(group => possibleOptions[group][0])
          .filter(value => !!value)[0]

        return firstFit
      }
    } else {
      const possibleOptions = [...options].filter(option => !option.disabled)

      if (possibleOptions.length > 0) {
        return possibleOptions[0]
      }
    }
  }

  return null
}
export const SearchBarDropdown = ({
  placeholder,
  displayedOptions,
  setSearchBarActive,
}: SearchBarProps) => {
  const {
    onChange,
    onSearch,
    setSearchInput,
    searchInput,
    options,
    multiselect,
    setSelectedData,
    selectedData,
  } = useSelectInput()
  const handleChange = (search: string) => {
    if (search.length > 0) {
      // case insensitive search
      const regex = RegExp(search, 'i')
      if (!Array.isArray(options)) {
        const filteredOptions = { ...options }
        Object.keys(filteredOptions).map((group: string) => {
          filteredOptions[group] = filteredOptions[group].filter(option =>
            option.searchText
              ? option.searchText.match(regex)
              : option.value.match(regex),
          )

          return null
        })
        onSearch(filteredOptions)
      } else {
        const filteredOptions = [...options].filter(option =>
          option.searchText
            ? option.searchText.match(regex)
            : option.value.match(regex),
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
      if (closestOption) {
        if (multiselect) {
          setSelectedData({
            type: 'selectOption',
            clickedOption: closestOption,
            group: !Array.isArray(options)
              ? Object.keys(options).filter(group =>
                  options[group].includes(closestOption),
                )[0]
              : undefined,
          })
          onChange?.(
            selectedData.selectedValues.includes(closestOption.value)
              ? selectedData.selectedValues
              : [...selectedData.selectedValues, closestOption.value],
          )
          setSearchInput(closestOption.searchText ?? closestOption.value)
        } else {
          setSelectedData({
            type: 'selectOption',
            clickedOption: closestOption,
          })
          onChange?.(selectedData.selectedValues[0] ?? '')
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
      onKeyDown={event => handleKeyDown(event.key, searchInput)}
      autoFocus
      size="medium"
      aria-label="search-bar"
    />
  )
}
