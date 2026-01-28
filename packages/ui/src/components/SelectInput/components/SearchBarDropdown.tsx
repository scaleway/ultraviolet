'use client'

import { isFuzzyMatch, normalizeString } from '@scaleway/fuzzy-search'
import { SearchIcon } from '@ultraviolet/icons/SearchIcon'
import type { Dispatch, KeyboardEvent, SetStateAction } from 'react'
import { useEffect, useRef } from 'react'
import { TextInput } from '../../TextInput'
import { OPTION_SELECTOR } from '../constants'
import { useSelectInput } from '../SelectInputProvider'
import type { DataType, OptionType } from '../types'
import { searchBar } from './dropdown.css'

type SearchBarProps = {
  placeholder: string
  displayedOptions: DataType
  setSearchBarActive: Dispatch<SetStateAction<boolean>>
}

const getReferenceText = (option: OptionType) => {
  if (option.searchText) {
    return normalizeString(option.searchText)
  }
  if (typeof option.label === 'string') {
    return normalizeString(option.label)
  }

  return ''
}

// It uses Levenshtein distance so that the search is typo-tolerant for a simple fuzzy-search
const searchRegex = (data: OptionType[], query: string) =>
  data.filter(option => {
    const referenceText = getReferenceText(option)
    const regex = new RegExp(query, 'i')

    return (
      (query.length > 2
        ? isFuzzyMatch(query, referenceText)
        : referenceText.match(regex)) ||
      (typeof option.description === 'string' &&
        option.description.match(regex)) ||
      option.value.match(regex)
    )
  })

const findClosestOption = (
  options: DataType,
  searchInput: string | undefined,
) => {
  if (searchInput) {
    if (Array.isArray(options)) {
      const possibleOption = [...options].find(option => !option.disabled)

      if (possibleOption) {
        return possibleOption
      }
    } else {
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
          .find(value => !!value)

        return firstFit
      }
    }
  }

  return null
}

const escapeRegExp = (string: string) =>
  string.replace(/[.*+?^{}()|[\]\\]/g, String.raw`\$&`)

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

  const handleChange = (search: string) => {
    if (search.length > 0) {
      if (Array.isArray(options)) {
        const filteredOptions = searchRegex(
          [...options],
          escapeRegExp(search.toString()),
        )
        onSearch(filteredOptions)
      } else {
        const filteredOptions = { ...options }
        Object.keys(filteredOptions).map((group: string) => {
          filteredOptions[group] = searchRegex(
            filteredOptions[group],
            escapeRegExp(search.toString()),
          )

          return null
        })
        onSearch(filteredOptions)
      }
    } else {
      onSearch(options)
    }
    setSearchInput(search)
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    search?: string,
  ) => {
    const { key } = event
    if (key === 'Enter') {
      const closestOption = findClosestOption(displayedOptions, search)
      if (closestOption) {
        if (multiselect) {
          setSelectedData({
            clickedOption: closestOption,
            group: Array.isArray(options)
              ? undefined
              : Object.keys(options).find(group =>
                  options[group].includes(closestOption),
                ),
            type: 'selectOption',
          })
          onChange?.(
            selectedData.selectedValues.includes(closestOption.value)
              ? selectedData.selectedValues
              : [...selectedData.selectedValues, closestOption.value],
          )
        } else {
          setSelectedData({
            clickedOption: closestOption,
            type: 'selectOption',
          })
          onChange?.(selectedData.selectedValues[0] ?? '')
        }
      }
    } else if (key === 'Tab' || key === 'ArrowDown') {
      event?.preventDefault()
      const optionsDropdown = document.querySelectorAll(OPTION_SELECTOR)
      if (optionsDropdown && optionsDropdown.length > 0) {
        ;(optionsDropdown[0] as HTMLElement).focus()
      }
    }
  }

  useEffect(() => {
    // note: Remove me and use autoFocus when popup is fixed
    // Autofocus on the search bar create some scroll issues
    const timeout = setTimeout(() => {
      searchInputRef.current?.focus()
    }, 50)

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [])

  return (
    <TextInput
      aria-label="search-bar"
      className={searchBar}
      data-testid="search-bar"
      onBlur={() => setSearchBarActive(false)}
      onChange={event => handleChange(event.target.value)}
      onFocus={() => setSearchBarActive(true)}
      onKeyDown={event => handleKeyDown(event, searchInput)}
      placeholder={placeholder}
      prefix={<SearchIcon sentiment="neutral" size="small" />}
      ref={searchInputRef}
      size="medium"
      value={searchInput}
    />
  )
}
