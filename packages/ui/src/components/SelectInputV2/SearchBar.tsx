import styled from '@emotion/styled'
import { useContext } from 'react'
import type { Dispatch, FormEvent, ReactNode, SetStateAction } from 'react'
import { TagInput, TextInputV2 } from '..'
import { ValueInput } from './helper'

export const SIZE_INPUT_HEIGHT = {
  large: 48,
  medium: 40,
  small: 32,
}
type DataType = Record<
  string,
  {
    value: string
    label: ReactNode
    disabled: boolean
  }[]
>
type SearchBarProps = {
  name: string
  placeholder: string
  options: DataType
  onSearch: Dispatch<SetStateAction<DataType>>
  size: 'small' | 'medium' | 'large'
  clearable: boolean
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
  searchable: boolean
  disabled: boolean
  readOnly: boolean
  value: string | undefined
  multiselect: boolean
  selectedValues: (string | undefined)[]
  setSelectedValues: Dispatch<SetStateAction<(string | undefined)[]>>
}

type SingleSearchBar = {
  options: DataType
  onSearch: Dispatch<SetStateAction<DataType>>
  name: string
  placeholder: string
  size: 'small' | 'medium' | 'large'
  clearable: boolean
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
}

type MultiSearchBarProps = {
  options: DataType
  onSearch: Dispatch<SetStateAction<DataType>>
  name: string
  placeholder: string
  size: 'small' | 'medium' | 'large'
  clearable?: boolean
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
  selectedValues: (string | undefined)[]
  setSelectedValues: Dispatch<SetStateAction<(string | undefined)[]>>
}

const StyledNonSearchableInput = styled(TextInputV2)`
  cursor: default;
  pointer-events: none;
`
const SingleSelectSearchBar = ({
  options,
  onSearch,
  name,
  placeholder,
  size,
  clearable,
  setIsDropdownVisible,
}: SingleSearchBar) => {
  const { searchInput, setSearchInput } = useContext(ValueInput)
  const handleChange = (search: string) => {
    if (search.length > 0) {
      // case insensitive search
      const regex = RegExp(search, 'gi')
      const filteredOptions = { ...options }
      Object.keys(filteredOptions).map((key: string) => {
        filteredOptions[key] = filteredOptions[key].filter(option =>
          option.value.match(regex),
        )

        return null
      })
      onSearch(filteredOptions)
    } else {
      onSearch(options)
    }
    setSearchInput(search)
  }

  return (
    <TextInputV2
      name={name}
      onChange={handleChange}
      value={searchInput}
      placeholder={placeholder}
      size={size}
      clearable={clearable}
      onBlur={() => setIsDropdownVisible(true)}
      onFocus={() => setIsDropdownVisible(true)}
    />
  )
}

const MultiSelectSearchBar = ({
  options,
  name,
  onSearch,
  placeholder,
  size,
  clearable,
  setIsDropdownVisible,
  selectedValues,
  setSelectedValues,
}: MultiSearchBarProps) => {
  const { setSearchInput } = useContext(ValueInput)

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const search = target.value
    if (search.length > 0) {
      // case insensitive search
      const regex = RegExp(search, 'gi')
      const filteredOptions = { ...options }
      Object.keys(filteredOptions).map((key: string) => {
        filteredOptions[key] = filteredOptions[key].filter(option =>
          option.value.match(regex),
        )

        return null
      })
      onSearch(filteredOptions)
    } else {
      onSearch(options)
    }
    setSearchInput(search)
  }
  setIsDropdownVisible(true)

  // Filter tags ton only keep the values which are possible options
  const addSelectedValue = (event: string[]) => {
    const filtered = event.filter(value =>
      Object.values(options).some(array =>
        array.some(item => item.label === value && !item.disabled),
      ),
    )
    // onSearch(options)
    setSelectedValues(filtered)
  }

  return (
    <div onChange={handleChange}>
      <TagInput
        name={name}
        placeholder={placeholder}
        size={size}
        clearable={clearable}
        onChange={event => addSelectedValue(event)}
        value={selectedValues}
      />
    </div>
  )
}

export const SearchBar = ({
  name,
  placeholder,
  size,
  options,
  onSearch,
  clearable,
  setIsDropdownVisible,
  searchable,
  disabled,
  readOnly,
  value,
  multiselect,
  selectedValues,
  setSelectedValues,
}: SearchBarProps) => {
  if (!searchable) {
    return (
      <StyledNonSearchableInput
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        clearable={clearable}
        value={value}
      />
    )
  }

  return multiselect ? (
    <MultiSelectSearchBar
      name={name}
      placeholder={placeholder}
      size={size}
      options={options}
      onSearch={onSearch}
      clearable={clearable}
      setIsDropdownVisible={setIsDropdownVisible}
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
    />
  ) : (
    <SingleSelectSearchBar
      name={name}
      placeholder={placeholder}
      size={size}
      options={options}
      onSearch={onSearch}
      clearable={clearable}
      setIsDropdownVisible={setIsDropdownVisible}
    />
  )
}
