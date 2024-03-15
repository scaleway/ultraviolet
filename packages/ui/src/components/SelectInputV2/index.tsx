import type { TextInputV2 } from '@ultraviolet/ui'
import { useMemo, useState } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { Stack, Text } from '..'
import { Dropdown } from './Dropdown'
import { SearchBar } from './SearchBar'
import { ValueInput } from './helper'

type DataType = Record<
  string,
  {
    value: string
    label: ReactNode
    disabled: boolean
  }[]
>

type SelectInputV2Props = {
  /**
   * Input name
   */
  name: string
  /**
   * Default value
   */
  value?: string
  /**
   * Place holder when no value defined
   */
  placeholder: string
  /**
   * Label of the component
   */

  label?: string
  /**
   * Helper text to give more information to the user
   */
  helper?: string
  /**
   * Selectable optiions
   */
  options: DataType
  /**
   * Whether it is possible to search through the input
   */
  searchable?: boolean
  /**
   * Whether the component in disabled
   */
  disabled?: boolean
  /**
   * Whether the component in readOnly
   */
  readOnly?: boolean
  /**
   * Whether it is possible to clear the search input
   */
  clearable?: boolean
  /**
   * Size of the input
   */
  size?: ComponentProps<typeof TextInputV2>['size']
  /**
   * Whether it is possible to select multiple options
   */
  multiselect?: boolean
  /**
   * Whether the options should be showcase by group (will ignore groups if false)
   */
  grouped?: boolean
}

/**
 * SelectInputV2 component is used to select one or many elements from a selection.
 */
export const SelectInputV2 = ({
  name,
  value = '',
  label,
  placeholder,
  helper,
  options,
  size,
  searchable = true,
  disabled = false,
  readOnly = false,
  clearable = true,
  multiselect = false,
  grouped = false,
}: SelectInputV2Props) => {
  const [displayedOptions, setDisplayedOptions] = useState(options)
  const [selectedValues, setSelectedValues] = useState([value])
  const [isDropdownVisible, setIsDropdownVisible] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const valueInput = useMemo(
    () => ({
      searchInput,
      setSearchInput,
    }),
    [searchInput, setSearchInput],
  )

  return (
    <ValueInput.Provider value={valueInput}>
      <Dropdown
        options={displayedOptions}
        isVisible={isDropdownVisible}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        multiselect={multiselect}
        grouped={grouped}
      >
        <Stack gap={0.5}>
          {label ? (
            <Text as="div" variant="bodySmallStrong">
              {label}
            </Text>
          ) : null}

          <SearchBar
            name={name}
            options={options}
            onSearch={setDisplayedOptions}
            placeholder={placeholder}
            size={size}
            clearable={clearable}
            setIsDropdownVisible={setIsDropdownVisible}
            searchable={searchable}
            readOnly={readOnly}
            value={selectedValues[0]}
            disabled={disabled}
          />

          {helper ? (
            <Text
              variant="caption"
              as="span"
              prominence="weak"
              sentiment="neutral"
            >
              {helper}
            </Text>
          ) : null}
        </Stack>
      </Dropdown>
    </ValueInput.Provider>
  )
}
