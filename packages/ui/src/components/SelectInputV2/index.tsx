import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Stack, Text } from '..'
import { Dropdown } from './Dropdown'
import { SearchBar } from './SearchBar'
import { SearchBar2 } from './SearchBar2'
import { SearchBarMulti } from './SearchBarMulti'
import { type DataType, ValueInput } from './helper'

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
   * Message to show when no option available
   */
  emptyState?: ReactNode
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
  size?: 'small' | 'medium' | 'large'
  /**
   * Whether it is possible to select multiple options
   */
  multiselect?: boolean
  /**
   * Whether the options should be showcase by group (will ignore groups if false)
   */
  grouped?: boolean
  /**
   * Whether field is required
   */
  required?: boolean
  /**
   * Whether the field is optional
   */
  optional?: boolean
  /**
   * Whether label description is on the right of the label or under it
   */
  direction?: 'row' | 'column'
}

const ColoredText = styled(Text)`
  color: ${({ theme }) => theme.colors.neutral.textWeak};
`
/**
 * SelectInputV2 component is used to select one or many elements from a selection.
 */
export const SelectInputV2 = ({
  name,
  value,
  label,
  placeholder,
  helper,
  options,
  size = 'medium',
  emptyState,
  direction,
  searchable = true,
  disabled = false,
  readOnly = false,
  clearable = true,
  multiselect = false,
  grouped = false,
  required = false,
  optional = false,
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
        emptyState={emptyState}
        direction={direction}
      >
        <Stack gap={0.5}>
          <Stack direction="row" gap={0.5}>
            {label ? (
              <Text as="div" variant="bodySmallStrong">
                {label}
              </Text>
            ) : null}
            {required ? (
              <Icon name="asterisk" sentiment="danger" size={8} />
            ) : null}
            {optional ? (
              <ColoredText
                as="span"
                variant="bodySmallStrong"
                prominence="weak"
              >
                (optional)
              </ColoredText>
            ) : null}
          </Stack>

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
            multiselect={multiselect}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
          />
          {multiselect ? (
            <SearchBarMulti
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
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
            />
          ) : (
            <SearchBar2
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
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
            />
          )}
          <Text
            variant="caption"
            as="p"
            sentiment="neutral"
            prominence="default"
          >
            {helper}
          </Text>
        </Stack>
      </Dropdown>
      Selected values:
      {selectedValues.map(val => (
        <div key={val}>{val}</div>
      ))}
    </ValueInput.Provider>
  )
}
