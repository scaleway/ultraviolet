import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import { useRef, useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Dropdown } from './Dropdown'
import { SelectBar } from './SelectBar'
import type { DataType, OptionType } from './types'

type SelectInputV2Props = {
  /**
   * Input name
   */
  name: string
  /**
   * Default value, must be one of the options
   */
  value?: OptionType
  /**
   * Place holder when no value defined
   */
  placeholder: string
  /**
   * When searchable, placeholder when no value is searched
   */
  placeholderSearch: string
  /**
   * Label of the component
   */
  label?: string
  /**
   * Helper text to give more information to the user
   */
  helper?: string
  /**
   * Selectable options
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
   * Whether field is required
   */
  required?: boolean
  /**
   * Whether the field is optional
   */
  labelDescription?: ReactNode
  /**
   * Whether option description is on the right of the option or under it
   */
  direction?: 'row' | 'column'
  /**
   * To add custom fixed elements at the bottom of the dropdown
   */
  popupFooter?: ReactNode
  /**
   * The state of the component
   */
  state?: 'neutral' | 'danger' | 'success'
  /**
   * Display an error message under the select bar
   */
  error?: string
  /**
   * Display a success message under the select bar
   */
  success?: string
  width?: string | number
  autofocus?: boolean
  'data-testid'?: string
  onChange?: (value: (string | undefined)[]) => void
} & Pick<
  HTMLAttributes<HTMLDivElement>,
  'id' | 'onBlur' | 'onFocus' | 'aria-label' | 'className'
>
type ContainerProps = {
  width: number | string
}
const SelectInputContainer = styled('div', {
  shouldForwardProp: prop => !['width'].includes(prop),
})<ContainerProps>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
`

/**
 * SelectInputV2 component is used to select one or many elements from a selection.
 */
export const SelectInputV2 = ({
  name,
  id,
  onBlur,
  onFocus,
  onChange,
  'aria-label': ariaLabel,
  value,
  label,
  helper,
  options,
  width = '100%',
  size = 'medium',
  emptyState,
  direction,
  state = 'neutral',
  success,
  error,
  'data-testid': dataTestId,
  className,
  popupFooter,
  placeholderSearch = 'Search in list',
  placeholder = 'Select item',
  searchable = true,
  disabled = false,
  readOnly = false,
  clearable = true,
  multiselect = false,
  required = false,
  labelDescription,
  autofocus,
}: SelectInputV2Props) => {
  const defaultValue = value ? [value] : []
  const [displayedOptions, setDisplayedOptions] = useState(options)
  const [selectedValues, setSelectedValues] =
    useState<(OptionType | undefined)[]>(defaultValue)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  return (
    <SelectInputContainer
      id={id}
      onBlur={onBlur}
      onFocus={onFocus}
      data-testid={dataTestId}
      className={className}
      width={width}
      aria-label={name}
    >
      <Dropdown
        options={options}
        displayedOptions={displayedOptions}
        multiselect={multiselect}
        emptyState={emptyState}
        direction={direction}
        searchable={searchable}
        onSearch={setDisplayedOptions}
        placeholder={placeholderSearch}
        popupFooter={popupFooter}
        onChange={onChange}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        setIsDropdownVisible={setIsDropdownVisible}
        isDropdownVisible={isDropdownVisible}
        refSelect={ref}
      >
        <Stack gap={0.5} aria-label={ariaLabel}>
          <Stack direction="row" gap={0.5}>
            {label ? (
              <Text as="div" variant="bodySmallStrong">
                {label}
              </Text>
            ) : null}
            {required ? (
              <Icon name="asterisk" sentiment="danger" size={8} />
            ) : null}
            {labelDescription ?? null}
          </Stack>
          <SelectBar
            size={size}
            clearable={clearable}
            setIsDropdownVisible={setIsDropdownVisible}
            readOnly={readOnly}
            value={selectedValues[0]}
            disabled={disabled}
            placeholder={placeholder}
            isDropdownVisible={isDropdownVisible}
            multiselect={multiselect}
            state={state}
            onChange={onChange}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            autoFocus={autofocus}
            innerRef={ref}
          />
        </Stack>
      </Dropdown>
      {!error && !success ? (
        <Text variant="caption" as="p" sentiment="neutral" prominence="default">
          {helper}
        </Text>
      ) : null}
      {error || success ? (
        <Text
          variant="caption"
          as="p"
          sentiment={error ? 'danger' : 'success'}
          prominence="default"
        >
          {error || success}
        </Text>
      ) : null}
    </SelectInputContainer>
  )
}
