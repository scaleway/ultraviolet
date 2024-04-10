import styled from '@emotion/styled'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import { Checkbox } from '../Checkbox'
import { Popup } from '../Popup'
import { Skeleton } from '../Skeleton'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { SearchBarDropdown } from './SearchBarDropdown'
import type { DataType, OptionType } from './types'

type DropdownProps = {
  options: DataType
  displayedOptions: DataType
  children: ReactNode
  multiselect: boolean
  emptyState: ReactNode
  direction?: 'row' | 'column'
  searchable: boolean
  onSearch: Dispatch<SetStateAction<DataType>>
  placeholder: string
  footer?: ReactNode
  onChange?: (value: (string | undefined)[]) => void
  searchInput: string | undefined
  setSearchInput: Dispatch<SetStateAction<string>>
  refSelect: RefObject<HTMLDivElement>
  selectedValues: (OptionType | undefined)[]
  setSelectedValues: Dispatch<SetStateAction<(OptionType | undefined)[]>>
  isDropdownVisible: boolean
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
  loadMore?: ReactNode
  optionalInfoPlacement: 'left' | 'right'
  isLoading?: boolean
  selectAll?: { label: ReactNode; description?: string }
  allSelected: boolean
  setAllSelected: Dispatch<SetStateAction<boolean>>
}

const NON_SEARCHABLE_KEYS = [
  'Tab',
  ' ',
  'Enter',
  'CapsLock',
  'Shift',
  'ArrowDown',
  'ArrowUp',
  'ArrowLeft',
  'ArrowRight',
  'Escape',
]

const StyledInfo = styled.div`
  align-content: center;
`
const StyledPopup = styled(Popup)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral.background};
  color: ${({ theme }) => theme.colors.neutral.text};
  box-shadow: ${({ theme }) => theme.shadows.dropdown};
  padding: ${({ theme }) => theme.space[0]};
`

const DropdownContainer = styled(Stack)`
  max-height: 256px;
  overflow-y: scroll;
  padding: ${({ theme }) => theme.space[0]};
`
const DropdownGroup = styled(Stack)`
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  position: sticky;
  top: 0px;
  padding-left: ${({ theme }) => theme.space[2]};
  padding-right: ${({ theme }) => theme.space[2]};
  height: ${({ theme }) => theme.space[4]};
  z-index: 1;
`
const DropdownItem = styled('button', {
  shouldForwardProp: prop => !['disabled', 'selected'].includes(prop),
})<{
  disabled: boolean
  selected: boolean
}>`
  text-align:left;
  border: none;
  background-color: ${({ theme, selected, disabled }) => {
    if (selected) {
      return `${theme.colors.primary.background};`
    }
    if (disabled) {
      return `${theme.colors.neutral.backgroundDisabled};`
    }

    return `${theme.colors.neutral.background};`
  }}
  padding: ${({ theme }) => theme.space['1.5']}
    ${({ theme }) => theme.space['2']} ${({ theme }) => theme.space['1.5']}
    ${({ theme }) => theme.space['2']};
  margin-left: ${({ theme }) => theme.space['0.5']};
  margin-right: ${({ theme }) => theme.space['0.5']};
  color:  ${({ theme, disabled }) => (disabled ? `${theme.colors.neutral.textDisabled}` : `${theme.colors.neutral.text}`)};

  &:hover, :focus {
    background-color: ${({ theme, disabled }) => (disabled ? `${theme.colors.neutral.backgroundStrongDisabled};` : `${theme.colors.primary.background};`)}
    color: ${({ theme, disabled }) => (disabled ? `${theme.colors.neutral.textStrongDisabled}` : `${theme.colors.primary.text}`)};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    outline: none;
  }
`
const PopupFooter = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.space[1.5]} ${({ theme }) => theme.space[2]}
    ${({ theme }) => theme.space[1.5]} ${({ theme }) => theme.space[2]};
  box-shadow: ${({ theme }) => theme.shadows.dropdown};
`
const StyledCheckbox = styled(Checkbox)`
  width: 100%;
`

const moveFocusDown = () => {
  const listOptions: ChildNode[] = []
  const options = document.querySelectorAll('#items')
  const activeItem = document.activeElement
  options.forEach(val => {
    listOptions.push(...Array.from(val.childNodes))

    return null
  })

  if (listOptions) {
    for (let i = 0; i < listOptions?.length; i += 1) {
      const listLength = listOptions.length
      if (
        activeItem === listOptions[i] &&
        activeItem !== listOptions[listLength - 1]
      ) {
        ;(listOptions[i + 1] as HTMLElement).focus()
      }
    }
  }
}
const moveFocusUp = () => {
  let listOptions: ChildNode[] = []
  const options = document.querySelectorAll('#items')
  const activeItem = document.activeElement
  options.forEach(val => {
    listOptions = listOptions.concat(Array.from(val.childNodes))

    return null
  })
  if (listOptions) {
    for (let i = 0; i < listOptions.length; i += 1) {
      if (activeItem === listOptions[i] && activeItem !== listOptions[0]) {
        ;(listOptions[i - 1] as HTMLElement).focus()
      }
    }
  }
}
const handleKeyDownSelect = (key: string) => {
  if (key === 'ArrowDown') {
    moveFocusDown()
  }
  if (key === 'ArrowUp') {
    moveFocusUp()
  }
}
const HandleDropdown = (
  setIsDropdownVisibile: Dispatch<SetStateAction<boolean>>,
  isDropdownVisible: boolean,
  onSearch: Dispatch<SetStateAction<DataType>>,
  searchBarActive: boolean,
  options: DataType,
  refSelect: RefObject<HTMLDivElement>,
  setDefaultSearch: Dispatch<SetStateAction<string | null>>,
) => {
  const ref = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState<string>('')
  useEffect(() => {
    if (!isDropdownVisible) {
      setDefaultSearch(null)
      setSearch('')
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !refSelect.current?.contains(event.target as Node)
      ) {
        setIsDropdownVisibile(false) // hide dropdown when clicking outside of the dropdown
        onSearch(options) // reset displayed options to default when dropdown is hidden
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      // Deals with default search
      if (
        ref.current &&
        !searchBarActive &&
        !NON_SEARCHABLE_KEYS.includes(event.key)
      ) {
        const currentSearch = search + event.key
        setSearch(currentSearch)
        ref.current.focus()
        if (!Array.isArray(options)) {
          const closestOptions = { ...options }
          Object.keys(closestOptions).map((key: string) => {
            closestOptions[key] = closestOptions[key].filter(option =>
              option.value.toLocaleLowerCase().startsWith(currentSearch),
            )

            return null
          })
          const closestOption =
            closestOptions[Object.keys(closestOptions)[0]][0]
          if (closestOption) {
            setDefaultSearch(closestOption.value)
          } else {
            setDefaultSearch(null)
          }
        } else {
          const closestOption = [...options].filter(option =>
            option.value.toLocaleLowerCase().startsWith(currentSearch),
          )[0]
          if (closestOption) {
            setDefaultSearch(closestOption.value)
          } else {
            setDefaultSearch(null)
          }
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    setIsDropdownVisibile,
    isDropdownVisible,
    searchBarActive,
    options,
    onSearch,
    search,
    refSelect,
    setDefaultSearch,
  ])

  return ref
}

type CreateDropdownProps = {
  displayedOptions: DataType
  options: DataType
  isEmpty: boolean
  emptyState: ReactNode
  multiselect: boolean
  direction?: 'row' | 'column'
  selectedValues: (OptionType | undefined)[]
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
  onChange?: (value: (string | undefined)[]) => void
  setSelectedValues: Dispatch<SetStateAction<(OptionType | undefined)[]>>
  loadMore?: ReactNode
  optionalInfoPlacement: 'left' | 'right'
  defaultSearchValue: string | null
  isLoading?: boolean
  selectAll?: { label: ReactNode; description?: string }
  allSelected: boolean
  setAllSelected: Dispatch<SetStateAction<boolean>>
}
const CreateDropdown = ({
  displayedOptions,
  isEmpty,
  emptyState,
  direction,
  selectedValues,
  setIsDropdownVisible,
  onChange,
  setSelectedValues,
  loadMore,
  optionalInfoPlacement,
  defaultSearchValue,
  isLoading,
  selectAll,
  multiselect,
  options,
  allSelected,
  setAllSelected,
}: CreateDropdownProps) => {
  const focusedItemRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (defaultSearchValue && focusedItemRef?.current) {
      focusedItemRef.current.focus()
    }
  }, [defaultSearchValue])

  if (isEmpty) {
    return (
      emptyState ?? (
        <Text variant="bodyStrong" as="p">
          No options
        </Text>
      )
    )
  }
  const handleClick = (clickedOption: OptionType) => {
    if (multiselect) {
      if (selectedValues.includes(clickedOption)) {
        setSelectedValues(selectedValues.filter(val => val !== clickedOption))
        onChange?.(
          selectedValues
            .filter(val => val !== clickedOption)
            .map(val => val?.value),
        )
        setAllSelected(false)
      } else {
        setSelectedValues([...selectedValues, clickedOption])
        onChange?.([...selectedValues, clickedOption].map(val => val?.value))
      }
    } else {
      setSelectedValues([clickedOption])
      onChange?.([clickedOption.value])
    }
    setIsDropdownVisible(multiselect) // hide the dropdown on click when single select only
  }
  const displayOption = (option: OptionType) => {
    if (direction === 'row' && optionalInfoPlacement === 'left') {
      return (
        <Stack
          gap={0.5}
          direction="row"
          justifyContent="left"
          onClick={event => (multiselect ? event.stopPropagation() : null)}
        >
          <Stack gap={0.5} direction="row" alignItems="center">
            {option.optionalInfo ?? null}
            <Text as="span" variant="body" placement="left">
              {option.label}
            </Text>
            {option.description ? (
              <Text
                as="span"
                variant="bodySmall"
                sentiment="neutral"
                placement="left"
                prominence="weak"
              >
                {option.description}
              </Text>
            ) : null}
          </Stack>
        </Stack>
      )
    }

    if (direction === 'row' && optionalInfoPlacement === 'right') {
      return (
        <Stack
          gap={0.5}
          direction="row"
          justifyContent="space-between"
          onClick={event => (multiselect ? event.stopPropagation() : null)}
        >
          <Stack gap={0.5} direction="row" alignItems="center">
            <Text as="span" variant="body" placement="left">
              {option.label}
            </Text>
            {option.description ? (
              <Text
                as="span"
                variant="bodySmall"
                sentiment="neutral"
                placement="left"
                prominence="weak"
              >
                {option.description}
              </Text>
            ) : null}
          </Stack>
          {option.optionalInfo ? (
            <StyledInfo>{option.optionalInfo}</StyledInfo>
          ) : null}
        </Stack>
      )
    }
    if (direction === 'column' && optionalInfoPlacement === 'left') {
      return (
        <Stack
          gap={0.5}
          direction="row"
          justifyContent={option.optionalInfo ? 'left' : 'space-between'}
          alignItems="center"
        >
          {option.optionalInfo ?? null}

          <Stack
            gap={0.5}
            direction="column"
            alignItems="center"
            onClick={event => (multiselect ? event.stopPropagation() : null)}
          >
            <Text as="span" variant="body" placement="left">
              {option.label}
            </Text>
            {option.description ? (
              <Text
                as="span"
                variant="bodySmall"
                sentiment="neutral"
                placement="left"
                prominence="weak"
              >
                {option.description}
              </Text>
            ) : null}
          </Stack>
        </Stack>
      )
    }

    return (
      <Stack
        gap={0.5}
        direction="column"
        alignItems="normal"
        onClick={event => (multiselect ? event.stopPropagation() : null)}
      >
        <Stack gap={0.5} direction="row" justifyContent="space-between">
          <Text as="span" variant="body" placement="left">
            {option.label}
          </Text>
          {option.optionalInfo ? (
            <StyledInfo>{option.optionalInfo}</StyledInfo>
          ) : null}
        </Stack>
        {option.description ? (
          <Text
            as="span"
            variant="bodySmall"
            sentiment="neutral"
            placement="left"
            prominence="weak"
          >
            {option.description}
          </Text>
        ) : null}
      </Stack>
    )
  }
  const selectAllOptions = () => {
    setAllSelected(!allSelected)

    if (allSelected) {
      setSelectedValues([])
    } else {
      const allValues: (OptionType | undefined)[] = []
      if (!Array.isArray(options)) {
        Object.keys(options).map((key: string) =>
          options[key].map(option => {
            if (!option.disabled) {
              allValues.push(option)
            }

            return null
          }),
        )
      } else {
        options.map(option => allValues.push(option))
      }
      setSelectedValues(allValues)
    }
  }

  return !Array.isArray(displayedOptions) ? (
    <DropdownContainer
      role="listbox"
      id="select-dropdown"
      onKeyDown={event => handleKeyDownSelect(event.key)}
      gap={0.25}
    >
      {selectAll && multiselect ? (
        <Stack id="items">
          <DropdownItem
            disabled={false}
            selected={allSelected}
            aria-label="select-all"
            data-testid="select-all"
            role="option"
          >
            <StyledCheckbox
              checked={allSelected}
              disabled={false}
              value="select-all"
              data-testid="select-all-checkbox"
              onChange={selectAllOptions}
            >
              <Stack direction="column">
                <Text as="span" variant="body" placement="left">
                  {selectAll.label}
                </Text>
                <Text
                  as="span"
                  variant="bodySmall"
                  sentiment="neutral"
                  placement="left"
                  prominence="weak"
                >
                  {selectAll.description}
                </Text>
              </Stack>
            </StyledCheckbox>
          </DropdownItem>
        </Stack>
      ) : null}
      {Object.keys(displayedOptions).map(key => (
        <Stack key={key} gap={0.25}>
          {displayedOptions[key].length > 0 ? (
            <DropdownGroup key={key} justifyContent="center">
              <Text variant="caption" as="span" placement="left">
                {key.toUpperCase()}
              </Text>
            </DropdownGroup>
          ) : null}
          <Stack id="items" gap={0.25}>
            {displayedOptions[key].map((option, index) => (
              <DropdownItem
                key={option.value}
                disabled={option.disabled}
                selected={selectedValues.includes(option) && !option.disabled}
                aria-label={option.value}
                data-testid={`option-${index}`}
                role="option"
                onClick={() => {
                  if (!option.disabled) {
                    handleClick(option)
                  }
                }}
                ref={
                  option.value === defaultSearchValue ? focusedItemRef : null
                }
              >
                {multiselect ? (
                  <StyledCheckbox
                    checked={selectedValues.includes(option)}
                    disabled={option.disabled}
                    value={option.value}
                    onChange={() => {
                      if (!option.disabled) {
                        handleClick(option)
                      }
                    }}
                  >
                    <Stack>{displayOption(option)}</Stack>
                  </StyledCheckbox>
                ) : (
                  displayOption(option)
                )}
              </DropdownItem>
            ))}
            {loadMore ?? null}
          </Stack>
        </Stack>
      ))}
    </DropdownContainer>
  ) : (
    <DropdownContainer
      role="listbox"
      id="select-dropdown"
      onKeyDown={event => handleKeyDownSelect(event.key)}
    >
      <Stack id="items">
        {isLoading ? (
          <Skeleton variant="block" />
        ) : (
          displayedOptions.map((option, index) => (
            <DropdownItem
              key={option.value}
              disabled={option.disabled}
              selected={selectedValues.includes(option) && !option.disabled}
              onClick={() => {
                if (!option.disabled) {
                  handleClick(option)
                }
              }}
              aria-label={option.value}
              data-testid={`option-${index}`}
              role="option"
              ref={option.value === defaultSearchValue ? focusedItemRef : null}
            >
              {multiselect ? (
                <StyledCheckbox
                  checked={selectedValues.includes(option)}
                  disabled={option.disabled}
                  value={option.value}
                  onChange={() => {
                    if (!option.disabled) {
                      handleClick(option)
                    }
                  }}
                >
                  <Stack>{displayOption(option)}</Stack>
                </StyledCheckbox>
              ) : (
                displayOption(option)
              )}
            </DropdownItem>
          ))
        )}
        {loadMore ?? null}
      </Stack>
    </DropdownContainer>
  )
}
export const Dropdown = ({
  options,
  displayedOptions,
  children,
  multiselect,
  emptyState,
  direction,
  searchable,
  onSearch,
  placeholder,
  footer,
  onChange,
  searchInput,
  setSearchInput,
  refSelect,
  selectedValues,
  setSelectedValues,
  isDropdownVisible,
  setIsDropdownVisible,
  loadMore,
  optionalInfoPlacement,
  isLoading,
  selectAll,
  allSelected,
  setAllSelected,
}: DropdownProps) => {
  const [searchBarActive, setSearchBarActive] = useState(false)
  const [defaultSearchValue, setDefaultSearch] = useState<string | null>(null)
  const maxWidth = refSelect.current?.offsetWidth
  const ref = HandleDropdown(
    setIsDropdownVisible,
    isDropdownVisible,
    onSearch,
    searchBarActive,
    options,
    refSelect,
    setDefaultSearch,
  )

  const isEmpty = useMemo(() => {
    if (Array.isArray(displayedOptions)) {
      return !(displayedOptions.length > 0)
    }
    const keys = Object.keys(displayedOptions)
    for (const key of keys) {
      if (displayedOptions[key].length !== 0) {
        return false
      }
    }

    return true
  }, [displayedOptions])

  useEffect(() => {
    if (!searchInput) {
      onSearch(options)
    }
  }, [onSearch, options, searchInput])

  return (
    <StyledPopup
      visible={isDropdownVisible}
      text={
        <Stack>
          {searchable && !isLoading ? (
            <SearchBarDropdown
              options={options}
              onSearch={onSearch}
              placeholder={placeholder}
              displayedOptions={displayedOptions}
              multiselect={multiselect}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setSelectedValues={setSelectedValues}
              selectedValues={selectedValues}
              setSearchBarActive={setSearchBarActive}
              onChange={onChange}
            />
          ) : null}
          <CreateDropdown
            displayedOptions={displayedOptions}
            isEmpty={isEmpty}
            emptyState={emptyState}
            multiselect={multiselect}
            direction={direction}
            selectedValues={selectedValues}
            setIsDropdownVisible={setIsDropdownVisible}
            setSelectedValues={setSelectedValues}
            onChange={onChange}
            loadMore={loadMore}
            optionalInfoPlacement={optionalInfoPlacement}
            defaultSearchValue={defaultSearchValue}
            isLoading={isLoading}
            selectAll={selectAll}
            options={options}
            allSelected={allSelected}
            setAllSelected={setAllSelected}
          />
          {footer ? <PopupFooter>{footer}</PopupFooter> : null}
        </Stack>
      }
      placement="bottom"
      containerFullWidth
      disableAnimation
      maxWidth={maxWidth}
      hasArrow={false}
      ref={ref}
      tabIndex={0}
      role="dialog"
    >
      {children}
    </StyledPopup>
  )
}
