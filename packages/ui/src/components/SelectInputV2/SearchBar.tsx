import styled from '@emotion/styled'
import { TextInputV2 } from '@ultraviolet/ui'
import {
  type ComponentProps,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
} from 'react'
import { ValueInput } from './helper'

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
  size?: ComponentProps<typeof TextInputV2>['size']
  clearable?: boolean
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
  searchable: boolean
  disabled: boolean
  readOnly: boolean
  value: string
}

const StyledNonSearchableInput = styled(TextInputV2)`
  cursor: default;
  pointer-events: none;
`

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
}: SearchBarProps) => {
  const { searchInput, setSearchInput } = useContext(ValueInput)

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
