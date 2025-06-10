'use client'

import styled from '@emotion/styled'
import { SearchIcon } from '@ultraviolet/icons'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useRef } from 'react'
import { TextInputV2 } from '../TextInputV2'
import { useSelectInput } from './SelectInputProvider'
import { matchRegex } from './searchAlgorithm'
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
  const searchInputRef = useRef<HTMLInputElement>(null)
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
  const escapeRegExp = (string: string) =>
    string.replace(/[.*+?^{}()|[\]\\]/g, String.raw`\$&`)

  const handleChange = (search: string) => {
    if (search.length > 0) {
      if (!Array.isArray(options)) {
        const filteredOptions = { ...options }
        Object.keys(filteredOptions).map((group: string) => {
          filteredOptions[group] = matchRegex(
            filteredOptions[group],
            escapeRegExp(search.toString()),
          )

          return null
        })
        onSearch(filteredOptions)
      } else {
        const filteredOptions = matchRegex(
          [...options],
          escapeRegExp(search.toString()),
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
        } else {
          setSelectedData({
            type: 'selectOption',
            clickedOption: closestOption,
          })
          onChange?.(selectedData.selectedValues[0] ?? '')
        }
      }
    } else if (key === 'Tab') {
      searchInputRef.current?.blur()
    }
  }

  useEffect(() => {
    // TODO: Remove me and use autoFocus when popup is fixed
    // Autofocus on the search bar create some scroll issues
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 50)
  }, [])

  return (
    <StyledInput
      value={searchInput}
      onChange={event => handleChange(event.target.value)}
      placeholder={placeholder}
      onFocus={() => setSearchBarActive(true)}
      onBlur={() => setSearchBarActive(false)}
      data-testid="search-bar"
      prefix={<SearchIcon size="small" sentiment="neutral" />}
      onKeyDown={event => handleKeyDown(event.key, searchInput)}
      size="medium"
      aria-label="search-bar"
      ref={searchInputRef}
    />
  )
}
