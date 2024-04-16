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
  descriptionDirection?: 'row' | 'column'
  searchable: boolean
  onSearch: Dispatch<SetStateAction<DataType>>
  placeholder: string
  footer?: ReactNode
  onChange?: (value: string[]) => void
  searchInput: string | undefined
  setSearchInput: Dispatch<SetStateAction<string>>
  refSelect: RefObject<HTMLDivElement>
  selectedValues: OptionType[]
  setSelectedValues: Dispatch<SetStateAction<OptionType[]>>
  isDropdownVisible: boolean
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
  loadMore?: ReactNode
  optionalInfoPlacement: 'left' | 'right'
  isLoading?: boolean
  selectAll?: { label: ReactNode; description?: string }
  allSelected: boolean
  setAllSelected: Dispatch<SetStateAction<boolean>>
  selectAllGroup?: boolean
  selectedGroups: string[]
  setSelectedGroups: Dispatch<SetStateAction<string[]>>
  numberOfOptions: number
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
  padding-bottom: ${({ theme }) => theme.space[0.5]};
`
const DropdownGroup = styled(Stack, {
  shouldForwardProp: prop => !['selectAllGroup'].includes(prop),
})<{ selectAllGroup?: boolean }>`
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  position: sticky;
  top: 0px;
  padding-right: ${({ theme }) => theme.space[2]};
  padding-left: ${({ theme, selectAllGroup }) =>
    selectAllGroup ? '20px' : theme.space[2]};
  height: ${({ theme }) => theme.space[4]};
  text-align: left;
  margin-bottom: ${({ theme }) => theme.space['0.25']};
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
  position: static;
  text-align: left;
`
const EmptyState = styled(Stack)`
  padding: ${({ theme }) => theme.space[2]};
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
          Object.keys(closestOptions).map((group: string) => {
            closestOptions[group] = closestOptions[group].filter(option =>
              option.searchText
                ? option.searchText
                    .toLocaleLowerCase()
                    .startsWith(currentSearch)
                : option.value.toLocaleLowerCase().startsWith(currentSearch),
            )

            return null
          })
          const closestOption =
            closestOptions[Object.keys(closestOptions)[0]][0]
          if (closestOption) {
            setDefaultSearch(closestOption.searchText ?? closestOption.value)
          } else {
            setDefaultSearch(null)
          }
        } else {
          const closestOption = [...options].filter(option =>
            option.searchText
              ? option.searchText.toLocaleLowerCase().startsWith(currentSearch)
              : option.value.toLocaleLowerCase().startsWith(currentSearch),
          )[0]
          if (closestOption) {
            setDefaultSearch(closestOption.searchText ?? closestOption.value)
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
  descriptionDirection?: 'row' | 'column'
  selectedValues: OptionType[]
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
  onChange?: (value: string[]) => void
  setSelectedValues: Dispatch<SetStateAction<OptionType[]>>
  loadMore?: ReactNode
  optionalInfoPlacement: 'left' | 'right'
  defaultSearchValue: string | null
  isLoading?: boolean
  selectAll?: { label: ReactNode; description?: string }
  allSelected: boolean
  setAllSelected: Dispatch<SetStateAction<boolean>>
  selectAllGroup?: boolean
  selectedGroups: string[]
  setSelectedGroups: Dispatch<SetStateAction<string[]>>
  numberOfOptions: number
}
const CreateDropdown = ({
  displayedOptions,
  isEmpty,
  emptyState,
  descriptionDirection,
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
  selectAllGroup,
  selectedGroups,
  setSelectedGroups,
  numberOfOptions,
}: CreateDropdownProps) => {
  const focusedItemRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (defaultSearchValue && focusedItemRef?.current) {
      focusedItemRef.current.focus()
    }
  }, [defaultSearchValue])

  if (isEmpty) {
    return (
      <EmptyState gap={2} alignItems="center">
        {emptyState ?? (
          <Text variant="bodyStrong" as="p">
            No options
          </Text>
        )}
      </EmptyState>
    )
  }

  const handleClick = (clickedOption: OptionType, group?: string) => {
    if (multiselect) {
      if (selectedValues.includes(clickedOption)) {
        setSelectedValues(selectedValues.filter(val => val !== clickedOption))
        onChange?.(
          selectedValues
            .filter(val => val !== clickedOption)
            .map(val => val?.value),
        )
        setAllSelected(false)

        if (selectAllGroup && group && selectedGroups.includes(group)) {
          setSelectedGroups(
            selectedGroups.filter(selectedGroup => selectedGroup !== group),
          )
        }
      } else {
        setSelectedValues([...selectedValues, clickedOption])
        onChange?.([...selectedValues, clickedOption].map(val => val?.value))
        if (selectedValues.length + 1 === numberOfOptions) {
          setAllSelected(true)
        }
        if (
          !Array.isArray(options) &&
          group &&
          options[group].every(
            option =>
              [...selectedValues, clickedOption].includes(option) ||
              option.disabled,
          )
        ) {
          setSelectedGroups([...selectedGroups, group])
        }
      }
    } else {
      setSelectedValues([clickedOption])
      onChange?.([clickedOption.value])
    }
    setIsDropdownVisible(multiselect) // hide the dropdown on click when single select only
  }
  const displayOption = (option: OptionType) => {
    if (descriptionDirection === 'row' && optionalInfoPlacement === 'left') {
      return (
        <Stack
          gap={0.5}
          direction="row"
          justifyContent="left"
          onClick={event => (multiselect ? event.stopPropagation() : null)}
          data-testid={`option-stack-${option.value}`}
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

    if (descriptionDirection === 'row' && optionalInfoPlacement === 'right') {
      return (
        <Stack
          gap={0.5}
          direction="row"
          justifyContent="space-between"
          onClick={event => (multiselect ? event.stopPropagation() : null)}
          alignItems="baseline"
          data-testid={`option-stack-${option.value}`}
        >
          <Stack gap={0.5} direction="row">
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
    if (descriptionDirection === 'column' && optionalInfoPlacement === 'left') {
      return (
        <Stack
          gap={0.5}
          direction="row"
          justifyContent={option.optionalInfo ? 'left' : 'space-between'}
          alignItems="normal"
        >
          {option.optionalInfo ?? null}

          <Stack
            gap={0.5}
            direction="column"
            onClick={event => (multiselect ? event.stopPropagation() : null)}
            data-testid={`option-stack-${option.value}`}
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
        data-testid={`option-stack-${option.value}`}
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
      setSelectedGroups([])
    } else {
      setSelectedGroups(Object.keys(options))
      const allValues: OptionType[] = []
      if (!Array.isArray(options)) {
        Object.keys(options).map((group: string) =>
          options[group].map(option => {
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
      onChange?.(allValues.map(value => value.value))
    }
  }

  const handleSelectGroup = (group: string) => {
    if (!Array.isArray(options)) {
      if (selectedGroups.includes(group)) {
        setSelectedGroups(
          selectedGroups.filter(selectedGroup => selectedGroup !== group),
        )
        const newSelectedValues = [...selectedValues].filter(
          selectedValue => !options[group].includes(selectedValue),
        )
        setSelectedValues(newSelectedValues)
        onChange?.(newSelectedValues.map(value => value.value))

        if (selectAll) {
          setAllSelected(false)
        }
      } else {
        const newSelectedValues = [...selectedValues]

        setSelectedGroups([...selectedGroups, group])
        options[group].map(option =>
          newSelectedValues.includes(option) || option.disabled
            ? null
            : newSelectedValues.push(option),
        )
        setSelectedValues(newSelectedValues)
        onChange?.(newSelectedValues.map(value => value.value))

        if (newSelectedValues.length === numberOfOptions) {
          setAllSelected(true)
        }
      }
    }
  }

  return !Array.isArray(displayedOptions) ? (
    <DropdownContainer
      role="listbox"
      id="select-dropdown"
      onKeyDown={event => handleKeyDownSelect(event.key)}
      gap={0.25}
    >
      {isLoading ? (
        <Skeleton variant="block" />
      ) : (
        <>
          {selectAll && multiselect ? (
            <Stack id="items">
              <DropdownItem
                disabled={false}
                selected={allSelected}
                aria-label="select-all"
                data-testid="select-all"
                role="option"
                onKeyDown={event =>
                  [' ', 'Enter'].includes(event.key) ? selectAllOptions() : null
                }
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
          {Object.keys(displayedOptions).map(group => (
            <Stack key={group} gap={0.25}>
              {displayedOptions[group].length > 0 ? (
                <DropdownGroup
                  key={group}
                  selectAllGroup={selectAllGroup}
                  justifyContent="center"
                >
                  {selectAllGroup ? (
                    <StyledCheckbox
                      checked={selectedGroups.includes(group)}
                      disabled={false}
                      value={group}
                      onChange={() => handleSelectGroup(group)}
                      data-testid="select-group"
                    >
                      <Text variant="caption" as="span" placement="left">
                        {group.toUpperCase()}
                      </Text>
                    </StyledCheckbox>
                  ) : (
                    <Text variant="caption" as="span" placement="left">
                      {group.toUpperCase()}
                    </Text>
                  )}
                </DropdownGroup>
              ) : null}
              <Stack id="items" gap={0.25}>
                {displayedOptions[group].map((option, index) => (
                  <DropdownItem
                    key={option.value}
                    disabled={option.disabled}
                    selected={
                      selectedValues.includes(option) && !option.disabled
                    }
                    aria-label={option.value}
                    data-testid={`option-${index}`}
                    id={`option-${index}`}
                    role="option"
                    onClick={() => {
                      if (!option.disabled) {
                        handleClick(option, group)
                      }
                    }}
                    ref={
                      option.value === defaultSearchValue ||
                      option.searchText === defaultSearchValue
                        ? focusedItemRef
                        : null
                    }
                  >
                    {multiselect ? (
                      <StyledCheckbox
                        checked={
                          selectedValues.includes(option) && !option.disabled
                        }
                        disabled={option.disabled}
                        value={option.value}
                        onChange={() => {
                          if (!option.disabled) {
                            handleClick(option, group)
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
        </>
      )}
    </DropdownContainer>
  ) : (
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
            onKeyDown={event =>
              [' ', 'Enter'].includes(event.key) ? selectAllOptions() : null
            }
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
              id={`option-${index}`}
              role="option"
              ref={
                option.value === defaultSearchValue ||
                option.searchText === defaultSearchValue
                  ? focusedItemRef
                  : null
              }
            >
              {multiselect ? (
                <StyledCheckbox
                  checked={selectedValues.includes(option) && !option.disabled}
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
  descriptionDirection,
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
  selectAllGroup,
  selectedGroups,
  setSelectedGroups,
  numberOfOptions,
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
    const groups = Object.keys(displayedOptions)
    for (const group of groups) {
      if (displayedOptions[group].length !== 0) {
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
              selectAll={!!selectAll}
              setAllSelected={setAllSelected}
              selectAllGroup={selectAllGroup}
              selectedGroups={selectedGroups}
              setSelectedGroups={setSelectedGroups}
              numberOfOptions={numberOfOptions}
            />
          ) : null}
          <CreateDropdown
            displayedOptions={displayedOptions}
            isEmpty={isEmpty}
            emptyState={emptyState}
            multiselect={multiselect}
            descriptionDirection={descriptionDirection}
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
            selectAllGroup={selectAllGroup}
            selectedGroups={selectedGroups}
            setSelectedGroups={setSelectedGroups}
            numberOfOptions={numberOfOptions}
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
