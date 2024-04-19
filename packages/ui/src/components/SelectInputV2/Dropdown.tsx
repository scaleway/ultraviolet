import styled from '@emotion/styled'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import { Checkbox } from '../Checkbox'
import { Popup } from '../Popup'
import { Skeleton } from '../Skeleton'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { DisplayOption } from './DropdownOption'
import { SearchBarDropdown } from './SearchBarDropdown'
import { useSelectInput } from './SelectInputProvider'
import type { DataType, OptionType } from './types'

export type DropdownProps = {
  children: ReactNode
  emptyState: ReactNode
  descriptionDirection: 'row' | 'column'
  searchable: boolean
  placeholder: string
  footer?: ReactNode
  onChange?: (value: string[]) => void
  refSelect: RefObject<HTMLDivElement>
  loadMore?: ReactNode
  optionalInfoPlacement: 'left' | 'right'
  isLoading?: boolean
}

export type CreateDropdownProps = {
  isEmpty: boolean
  emptyState: ReactNode
  descriptionDirection: 'row' | 'column'
  onChange?: (value: string[]) => void
  loadMore?: ReactNode
  optionalInfoPlacement: 'left' | 'right'
  defaultSearchValue: string | null
  isLoading?: boolean
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

const StyledPopup = styled(Popup)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral.background};
  color: ${({ theme }) => theme.colors.neutral.text};
  box-shadow: ${({ theme }) => theme.shadows.dropdown};
  padding: ${({ theme }) => theme.space[0]};
`

const DropdownContainer = styled(Stack, {
  shouldForwardProp: prop => !['grouped'].includes(prop),
})<{ grouped: boolean }>`
  max-height: 256px;
  overflow-y: scroll;
  padding: ${({ theme }) => theme.space[0]};
  padding-bottom: ${({ theme }) => theme.space[0.5]};
  padding-top: ${({ theme, grouped }) =>
    grouped ? theme.space[0] : theme.space[0.5]};
`
const DropdownGroup = styled.button`
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;
  border: none;
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  position: sticky;
  top: 0px;
  padding-right: ${({ theme }) => theme.space[2]};
  padding-left: ${({ theme }) => theme.space[2]};
  height: ${({ theme }) => theme.space[4]};
  text-align: left;
  margin-bottom: ${({ theme }) => theme.space['0.25']};

  &:focus {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    outline: none;
  }

  &[data-selectgroup='true'] {
    padding-left: 20px;
  }

  &[data-selectgroup='true']:focus {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }
}
`
const DropdownGroupWrapper = styled.div`
  position: sticky;
  top: 0px;
`
const DropdownItem = styled.button`
  text-align:left;
  border: none;
  background-color: ${({ theme }) => theme.colors.neutral.background};

  padding: ${({ theme }) => theme.space['1.5']} ${({ theme }) => theme.space['2']} ${({ theme }) => theme.space['1.5']} ${({ theme }) => theme.space['2']};
  margin-left: ${({ theme }) => theme.space['0.5']};
  margin-right: ${({ theme }) => theme.space['0.5']};
  
  color:  ${({ theme, disabled }) => (disabled ? `${theme.colors.neutral.textDisabled}` : `${theme.colors.neutral.text}`)};
  border-radius: ${({ theme }) => theme.radii.default};

  &:hover, :focus {
    background-color: ${({ theme }) => theme.colors.primary.background};
    color: ${({ theme }) => theme.colors.primary.text};
    cursor: 'pointer';
    outline: none;
  }

  &[aria-selected='true'] {
    background-color: ${({ theme }) => theme.colors.primary.background};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
  }

  &[disabled]:hover, [disabled]:focus {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundStrongDisabled};
    color: ${({ theme }) => theme.colors.neutral.textStrongDisabled};
    cursor: not-allowed;
    outline: none;
  }
  
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
  align-items: center;
`
const EmptyState = styled(Stack)`
  padding: ${({ theme }) => theme.space[2]};
`
const LoadMore = styled(Stack)`
  padding: ${({ theme }) => theme.space[0.5]};
`
const moveFocusDown = () => {
  const options = document.querySelectorAll('#items > button')
  const activeItem = document.activeElement

  if (options) {
    for (let i = 0; i < options?.length; i += 1) {
      const listLength = options.length
      if (activeItem === options[i] && activeItem !== options[listLength - 1]) {
        ;(options[i + 1] as HTMLElement).focus()
      }
    }
  }
}
const moveFocusUp = () => {
  const options = document.querySelectorAll('#items > button')
  const activeItem = document.activeElement

  if (options) {
    for (let i = 0; i < options.length; i += 1) {
      if (activeItem === options[i] && activeItem !== options[0]) {
        ;(options[i - 1] as HTMLElement).focus()
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
const handleClickOutside = (
  event: MouseEvent,
  ref: RefObject<HTMLDivElement>,
  setIsDropdownVisibile: Dispatch<SetStateAction<boolean>>,
  refSelect: RefObject<HTMLDivElement>,
  onSearch: Dispatch<SetStateAction<DataType>>,
  options: DataType,
) => {
  if (
    ref.current &&
    !ref.current.contains(event.target as Node) &&
    !refSelect.current?.contains(event.target as Node)
  ) {
    setIsDropdownVisibile(false) // hide dropdown when clicking outside of the dropdown
    onSearch(options) // reset displayed options to default when dropdown is hidden
  }
}

const handleKeyDown = (
  event: KeyboardEvent,
  ref: RefObject<HTMLDivElement>,
  options: DataType,
  searchBarActive: boolean,
  setSearch: Dispatch<SetStateAction<string>>,
  setDefaultSearch: Dispatch<SetStateAction<string | null>>,
  search: string,
) => {
  // Deals with default search
  if (
    ref.current &&
    !searchBarActive &&
    !NON_SEARCHABLE_KEYS.includes(event.key) &&
    document.activeElement?.ariaLabel !== 'search-bar'
  ) {
    const currentSearch = search + event.key
    setSearch(currentSearch)
    ref.current.focus()
    if (!Array.isArray(options)) {
      const closestOptions = { ...options }
      Object.keys(closestOptions).map((group: string) => {
        closestOptions[group] = closestOptions[group].filter(option =>
          option.searchText
            ? option.searchText.toLocaleLowerCase().startsWith(currentSearch)
            : option.value.toLocaleLowerCase().startsWith(currentSearch),
        )

        return null
      })
      const closestOption = closestOptions[Object.keys(closestOptions)[0]][0]
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
const CreateDropdown = ({
  isEmpty,
  emptyState,
  descriptionDirection,
  onChange,
  loadMore,
  optionalInfoPlacement,
  defaultSearchValue,
  isLoading,
}: CreateDropdownProps) => {
  const {
    setIsDropdownVisible,
    selectedValues,
    setSelectedValues,
    setAllSelected,
    setSelectedGroups,
    multiselect,
    options,
    selectAll,
    allSelected,
    selectedGroups,
    numberOfOptions,
    selectAllGroup,
    displayedOptions,
  } = useSelectInput()
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

  const selectAllOptions = () => {
    setAllSelected(!allSelected)

    if (allSelected) {
      setSelectedValues([])
      setSelectedGroups([])
      onChange?.([])
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
      onKeyDown={event => {
        event.preventDefault()
        handleKeyDownSelect(event.key)
      }}
      grouped
    >
      {isLoading ? (
        <Skeleton variant="block" />
      ) : (
        <>
          {selectAll && multiselect ? (
            <Stack id="items">
              <DropdownItem
                disabled={false}
                aria-selected={allSelected}
                aria-label="select-all"
                data-testid="select-all"
                id="select-all"
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
                  tabIndex={-1}
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
                <DropdownGroupWrapper id={selectAllGroup ? 'items' : undefined}>
                  <DropdownGroup
                    key={group}
                    tabIndex={selectAllGroup ? 0 : -1}
                    onKeyDown={event => {
                      if ([' ', 'Enter'].includes(event.key)) {
                        event.preventDefault()
                        handleSelectGroup(group)
                      }
                    }}
                    data-selectgroup={selectAllGroup}
                    role="group"
                  >
                    {selectAllGroup ? (
                      <StyledCheckbox
                        checked={selectedGroups.includes(group)}
                        disabled={false}
                        value={group}
                        onChange={() => handleSelectGroup(group)}
                        data-testid="select-group"
                        tabIndex={-1}
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
                </DropdownGroupWrapper>
              ) : null}
              <Stack id="items" gap="0.25">
                {displayedOptions[group].map((option, index) => (
                  <DropdownItem
                    key={option.value}
                    disabled={option.disabled}
                    aria-selected={
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
                    onKeyDown={event =>
                      [' ', 'Enter'].includes(event.key)
                        ? handleClick(option, group)
                        : null
                    }
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
                        tabIndex={-1}
                      >
                        <DisplayOption
                          option={option}
                          multiselect={multiselect}
                          descriptionDirection={descriptionDirection}
                          optionalInfoPlacement={optionalInfoPlacement}
                        />
                      </StyledCheckbox>
                    ) : (
                      <DisplayOption
                        option={option}
                        multiselect={multiselect}
                        descriptionDirection={descriptionDirection}
                        optionalInfoPlacement={optionalInfoPlacement}
                      />
                    )}
                  </DropdownItem>
                ))}
                {loadMore ? <LoadMore>{loadMore}</LoadMore> : null}
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
      onKeyDown={event => {
        event.preventDefault()
        handleKeyDownSelect(event.key)
      }}
      gap={0.25}
      grouped={false}
    >
      {selectAll && multiselect ? (
        <Stack id="items" gap={0.25}>
          <DropdownItem
            disabled={false}
            aria-selected={allSelected}
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
              tabIndex={-1}
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
      <Stack id="items" gap={0.25}>
        {isLoading ? (
          <Skeleton variant="block" />
        ) : (
          displayedOptions.map((option, index) => (
            <DropdownItem
              key={option.value}
              disabled={option.disabled}
              aria-selected={
                selectedValues.includes(option) && !option.disabled
              }
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
              onKeyDown={event =>
                [' ', 'Enter'].includes(event.key) ? handleClick(option) : null
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
                  tabIndex={-1}
                >
                  <DisplayOption
                    option={option}
                    multiselect={multiselect}
                    descriptionDirection={descriptionDirection}
                    optionalInfoPlacement={optionalInfoPlacement}
                  />
                </StyledCheckbox>
              ) : (
                <DisplayOption
                  option={option}
                  multiselect={multiselect}
                  descriptionDirection={descriptionDirection}
                  optionalInfoPlacement={optionalInfoPlacement}
                />
              )}
            </DropdownItem>
          ))
        )}
        {loadMore ? <LoadMore>{loadMore}</LoadMore> : null}
      </Stack>
    </DropdownContainer>
  )
}
export const Dropdown = ({
  children,
  emptyState,
  descriptionDirection,
  searchable,
  placeholder,
  footer,
  onChange,
  refSelect,
  loadMore,
  optionalInfoPlacement,
  isLoading,
}: DropdownProps) => {
  const {
    setIsDropdownVisible,
    isDropdownVisible,
    onSearch,
    searchInput,
    options,
    selectAll,
    displayedOptions,
  } = useSelectInput()
  const [searchBarActive, setSearchBarActive] = useState(false)
  const [defaultSearchValue, setDefaultSearch] = useState<string | null>(null)
  const maxWidth = refSelect.current?.offsetWidth
  const ref = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    if (!searchInput) {
      onSearch(options)
    }
  }, [onSearch, options, searchInput])

  useEffect(() => {
    if (!isDropdownVisible) {
      setDefaultSearch(null)
      setSearch('')
    }

    document.addEventListener('mousedown', event =>
      handleClickOutside(
        event,
        ref,
        setIsDropdownVisible,
        refSelect,
        onSearch,
        options,
      ),
    )

    if (!searchable) {
      document.addEventListener('keydown', event =>
        handleKeyDown(
          event,
          ref,
          options,
          searchBarActive,
          setSearch,
          setDefaultSearch,
          search,
        ),
      )
    }

    return () => {
      document.removeEventListener('mousedown', event =>
        handleClickOutside(
          event,
          ref,
          setIsDropdownVisible,
          refSelect,
          onSearch,
          options,
        ),
      )
      if (!searchable) {
        document.removeEventListener('keydown', event =>
          handleKeyDown(
            event,
            ref,
            options,
            searchBarActive,
            setSearch,
            setDefaultSearch,
            search,
          ),
        )
      }
    }
  }, [
    isDropdownVisible,
    searchBarActive,
    options,
    onSearch,
    search,
    refSelect,
    setDefaultSearch,
    setIsDropdownVisible,
    searchable,
  ])

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

  return (
    <StyledPopup
      visible={isDropdownVisible}
      text={
        <Stack>
          {searchable && !isLoading ? (
            <SearchBarDropdown
              placeholder={placeholder}
              displayedOptions={displayedOptions}
              setSearchBarActive={setSearchBarActive}
              onChange={onChange}
              selectAll={!!selectAll}
            />
          ) : null}
          <CreateDropdown
            isEmpty={isEmpty}
            emptyState={emptyState}
            descriptionDirection={descriptionDirection}
            onChange={onChange}
            loadMore={loadMore}
            optionalInfoPlacement={optionalInfoPlacement}
            defaultSearchValue={defaultSearchValue}
            isLoading={isLoading}
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
      debounceDelay={0}
    >
      {children}
    </StyledPopup>
  )
}
