import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  Dispatch,
  KeyboardEvent,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react'
import { Checkbox } from '../Checkbox'
import { Popup } from '../Popup'
import { Skeleton } from '../Skeleton'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { DisplayOption } from './DropdownOption'
import { SearchBarDropdown } from './SearchBarDropdown'
import { useSelectInput } from './SelectInputProvider'
import { type DataType, INPUT_SIZE_HEIGHT, type OptionType } from './types'

const DROPDOWN_MAX_HEIGHT = 256

export type DropdownProps = {
  children: ReactNode
  emptyState: ReactNode
  descriptionDirection: 'row' | 'column'
  searchable: boolean
  placeholder: string
  footer?: ((closeDropdown: () => void) => ReactNode) | ReactNode
  refSelect: RefObject<HTMLDivElement>
  loadMore?: ReactNode
  optionalInfoPlacement: 'left' | 'right'
  isLoading?: boolean
  size: 'small' | 'medium' | 'large'
}

export type CreateDropdownProps = {
  isEmpty: boolean
  emptyState: ReactNode
  descriptionDirection: 'row' | 'column'
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
  min-width: 320px;
  background-color: ${({ theme }) => theme.colors.other.elevation.background.raised};
  color: ${({ theme }) => theme.colors.neutral.text};
  box-shadow: ${({ theme }) => `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`};
  padding: ${({ theme }) => theme.space[0]};
  margin-bottom: ${({ theme }) => theme.space[10]};
`

const DropdownContainer = styled(Stack)<{ 'data-grouped': boolean }>`
  max-height: ${DROPDOWN_MAX_HEIGHT}px;
  overflow-y: scroll;
  padding: ${({ theme }) => theme.space[0]};
  padding-bottom: ${({ theme }) => theme.space[0.5]};
  padding-top: ${({ theme }) => theme.space[0.5]};

  &[data-grouped="true"] {
    padding-top: ${({ theme }) => theme.space[0]};
  }
`
const DropdownGroup = styled.button<{ 'data-selectgroup': boolean }>`
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;
  border: none;
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  position: sticky;
  top: 0;
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
    padding-left: ${({ theme }) => theme.space[2]};
    border-left: ${({ theme }) => theme.space[0.5]} solid ${({ theme }) =>
      theme.colors.neutral.backgroundWeak};
  }

  &[data-selectgroup='true']:focus {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }
`
const DropdownGroupWrapper = styled.div`
  position: sticky;
  top: 0;
`
const DropdownItem = styled.div<{
  'aria-selected': boolean
  'aria-disabled': boolean
}>`
  text-align:left;
  border: none;
  background-color: ${({ theme }) => theme.colors.other.elevation.background.raised};

  padding: ${({ theme }) => theme.space['1.5']} ${({ theme }) =>
    theme.space['2']} ${({ theme }) => theme.space['1.5']} ${({ theme }) =>
    theme.space['2']};
  margin-left: ${({ theme }) => theme.space['0.5']};
  margin-right: ${({ theme }) => theme.space['0.5']};

  color:  ${({ theme }) => theme.colors.neutral.text};
  border-radius: ${({ theme }) => theme.radii.default};

  &:hover, :focus {
    background-color: ${({ theme }) => theme.colors.primary.background};
    color: ${({ theme }) => theme.colors.primary.text};
    cursor: pointer;
    outline: none;
  }

  &[aria-selected='true'] {
    background-color: ${({ theme }) => theme.colors.primary.background};
  }

  &[aria-disabled="true"] {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
  }

  &[aria-disabled="true"]:hover, [aria-disabled="true"]:focus {
    background-color: ${({ theme }) =>
      theme.colors.neutral.backgroundStrongDisabled};
    color: ${({ theme }) => theme.colors.neutral.textStrongDisabled};
    cursor: not-allowed;
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
  align-items: center;
  pointer-events: none;
` // pointer-events: none prevents any error when using the checkbox in a form since it is an unnamed input

const EmptyState = styled(Stack)`
  padding: ${({ theme }) => theme.space[2]};
`
const LoadMore = styled(Stack)`
  padding: ${({ theme }) => theme.space[0.5]};
`

const moveFocusDown = () => {
  const options = document.querySelectorAll(
    '#items > div[role="option"]:not([disabled])',
  )
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
  const options = document.querySelectorAll(
    '#items > div[role="option"]:not([disabled])',
  )
  const activeItem = document.activeElement

  if (options) {
    for (let i = 0; i < options.length; i += 1) {
      if (activeItem === options[i] && activeItem !== options[0]) {
        ;(options[i - 1] as HTMLElement).focus()
      }
    }
  }
}
const handleKeyDownSelect = (event: KeyboardEvent<HTMLDivElement>) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveFocusDown()
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
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
    setIsDropdownVisibile(false)
    onSearch(options)
  }
}

const handleKeyDown = (
  event: globalThis.KeyboardEvent,
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
  loadMore,
  optionalInfoPlacement,
  defaultSearchValue,
  isLoading,
}: CreateDropdownProps) => {
  const {
    setIsDropdownVisible,
    onChange,
    options,
    multiselect,
    selectAll,
    selectAllGroup,
    displayedOptions,
    setSelectedData,
    selectedData,
  } = useSelectInput()
  const focusedItemRef = useRef<HTMLDivElement>(null)

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
    setSelectedData({ type: 'selectOption', clickedOption, group })
    if (multiselect) {
      if (selectedData.selectedValues.includes(clickedOption.value)) {
        onChange?.(
          selectedData.selectedValues.filter(
            val => val !== clickedOption.value,
          ),
        )
      } else {
        onChange?.([...selectedData.selectedValues, clickedOption.value])
      }
    } else {
      onChange?.(clickedOption.value)
    }
    setIsDropdownVisible(multiselect) // hide the dropdown on click when single select only
  }

  const selectAllOptions = () => {
    if (multiselect) {
      setSelectedData({ type: 'selectAll' })
      if (selectedData.allSelected && onChange) {
        onChange([])
      } else {
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
        onChange?.(allValues.map(value => value.value))
      }
    }
  }

  const handleSelectGroup = (group: string) => {
    if (multiselect) {
      setSelectedData({ type: 'selectGroup', selectedGroup: group })
      if (!Array.isArray(options)) {
        if (selectedData.selectedGroups.includes(group)) {
          const newSelectedValues = [...selectedData.selectedValues].filter(
            selectedValue =>
              !options[group].find(option => option.value === selectedValue),
          )
          onChange?.(newSelectedValues)
        } else {
          const newSelectedValues = [...selectedData.selectedValues]

          options[group].map(option =>
            newSelectedValues.includes(option.value) || option.disabled
              ? null
              : newSelectedValues.push(option.value),
          )
          onChange?.(newSelectedValues)
        }
      }
    }
  }

  return !Array.isArray(displayedOptions) ? (
    <DropdownContainer
      role="listbox"
      id="select-dropdown"
      onKeyDown={handleKeyDownSelect}
      data-grouped
    >
      {isLoading ? (
        <Skeleton variant="block" />
      ) : (
        <>
          {selectAll && multiselect ? (
            <Stack id="items">
              <DropdownItem
                aria-disabled={false}
                aria-selected={selectedData.allSelected}
                aria-label="select-all"
                data-testid="select-all"
                id="select-all"
                tabIndex={0}
                role="option"
                onKeyDown={event =>
                  [' ', 'Enter'].includes(event.key) ? selectAllOptions() : null
                }
                onClick={selectAllOptions}
              >
                <StyledCheckbox
                  checked={selectedData.allSelected}
                  disabled={false}
                  value="select-all"
                  data-testid="select-all-checkbox"
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
          {Object.keys(displayedOptions).map((group, index) => (
            <Stack key={group} gap={0.25}>
              {displayedOptions[group].length > 0 ? (
                <DropdownGroupWrapper id={selectAllGroup ? 'items' : undefined}>
                  {group ? (
                    <DropdownGroup
                      key={group}
                      type="button"
                      tabIndex={selectAllGroup ? 0 : -1}
                      onKeyDown={event => {
                        if ([' ', 'Enter'].includes(event.key)) {
                          event.preventDefault()
                          handleSelectGroup(group)
                        }
                      }}
                      data-selectgroup={selectAllGroup}
                      role="group"
                      data-testid={`group-${index}`}
                      onClick={() =>
                        selectAllGroup ? handleSelectGroup(group) : null
                      }
                    >
                      {selectAllGroup ? (
                        <StyledCheckbox
                          checked={selectedData.selectedGroups.includes(group)}
                          disabled={false}
                          value={group}
                          data-testid="select-group"
                          tabIndex={-1}
                        >
                          <Text variant="caption" as="span" placement="left">
                            {group.toUpperCase()}
                          </Text>
                        </StyledCheckbox>
                      ) : (
                        <Text
                          variant="caption"
                          as="span"
                          placement="left"
                          sentiment="neutral"
                        >
                          {group.toUpperCase()}
                        </Text>
                      )}
                    </DropdownGroup>
                  ) : null}
                </DropdownGroupWrapper>
              ) : null}
              <Stack id="items" gap="0.25">
                {displayedOptions[group].map((option, indexOption) => (
                  <DropdownItem
                    key={option.value}
                    aria-disabled={!!option.disabled}
                    tabIndex={!option.disabled ? 0 : -1}
                    aria-selected={
                      selectedData.selectedValues.includes(option.value) &&
                      !option.disabled
                    }
                    aria-label={option.value}
                    data-testid={`option-${option.value}`}
                    id={`option-${indexOption}`}
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
                          selectedData.selectedValues.includes(option.value) &&
                          !option.disabled
                        }
                        disabled={option.disabled}
                        value={option.value}
                        tabIndex={-1}
                      >
                        <DisplayOption
                          option={option}
                          descriptionDirection={descriptionDirection}
                          optionalInfoPlacement={optionalInfoPlacement}
                        />
                      </StyledCheckbox>
                    ) : (
                      <DisplayOption
                        option={option}
                        descriptionDirection={descriptionDirection}
                        optionalInfoPlacement={optionalInfoPlacement}
                      />
                    )}
                  </DropdownItem>
                ))}
              </Stack>
            </Stack>
          ))}
        </>
      )}
      {loadMore ? <LoadMore>{loadMore}</LoadMore> : null}
    </DropdownContainer>
  ) : (
    <DropdownContainer
      role="listbox"
      tabIndex={-1}
      id="select-dropdown"
      onKeyDown={handleKeyDownSelect}
      gap={0.25}
      data-grouped={false}
    >
      {selectAll && multiselect ? (
        <Stack id="items" gap={0.25} tabIndex={-1}>
          <DropdownItem
            aria-disabled={false}
            aria-selected={selectedData.allSelected}
            aria-label="select-all"
            data-testid="select-all"
            tabIndex={0}
            role="option"
            onKeyDown={event =>
              [' ', 'Enter'].includes(event.key) ? selectAllOptions() : null
            }
            onClick={selectAllOptions}
          >
            <StyledCheckbox
              checked={selectedData.allSelected}
              disabled={false}
              value="select-all"
              data-testid="select-all-checkbox"
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
              aria-disabled={!!option.disabled}
              aria-selected={
                selectedData.selectedValues.includes(option.value) &&
                !option.disabled
              }
              onClick={() => {
                if (!option.disabled) {
                  handleClick(option)
                }
              }}
              aria-label={option.value}
              data-testid={`option-${option.value}`}
              id={`option-${index}`}
              role="option"
              tabIndex={!option.disabled ? 0 : -1}
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
                  checked={
                    selectedData.selectedValues.includes(option.value) &&
                    !option.disabled
                  }
                  disabled={option.disabled}
                  value={option.value}
                  tabIndex={-1}
                >
                  <DisplayOption
                    option={option}
                    descriptionDirection={descriptionDirection}
                    optionalInfoPlacement={optionalInfoPlacement}
                  />
                </StyledCheckbox>
              ) : (
                <DisplayOption
                  option={option}
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
  refSelect,
  loadMore,
  optionalInfoPlacement,
  isLoading,
  size,
}: DropdownProps) => {
  const {
    setIsDropdownVisible,
    isDropdownVisible,
    onSearch,
    searchInput,
    options,
    displayedOptions,
    numberOfOptions,
  } = useSelectInput()
  const theme = useTheme()
  const [searchBarActive, setSearchBarActive] = useState(false)
  const [defaultSearchValue, setDefaultSearch] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState<string>('')
  const [maxWidth, setWidth] = useState<string | number>()

  useEffect(() => {
    if (refSelect.current && isDropdownVisible) {
      const position =
        refSelect.current.getBoundingClientRect().bottom +
        DROPDOWN_MAX_HEIGHT +
        INPUT_SIZE_HEIGHT[size] +
        parseInt(theme.space['5'], 10)
      const overflow = position - window.innerHeight
      if (overflow > 0) {
        const modalElement = document.getElementById('backdrop-modal')

        if (modalElement) {
          modalElement.scrollBy({ top: overflow, behavior: 'smooth' })
        } else window.scrollBy({ top: overflow, behavior: 'smooth' })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDropdownVisible, refSelect, size, ref.current])

  const resizeDropdown = useCallback(() => {
    if (
      refSelect.current &&
      refSelect.current.getBoundingClientRect().width > 0
    ) {
      setWidth(refSelect.current.getBoundingClientRect().width)
    }
  }, [refSelect])

  useEffect(() => {
    resizeDropdown()

    window.addEventListener('resize', resizeDropdown)

    return () => window.removeEventListener('resize', resizeDropdown)
  }, [resizeDropdown])

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

  // No data is displayed (because of the search or because no data is provided)
  // Set to true when noData by default
  const isEmpty = useMemo(() => {
    if (numberOfOptions === 0) return true
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
  }, [displayedOptions, numberOfOptions])

  const computedFooter = useMemo(() => {
    if (footer) {
      if (typeof footer === 'function') {
        return (
          <PopupFooter>{footer(() => setIsDropdownVisible(false))}</PopupFooter>
        )
      }

      return <PopupFooter>{footer}</PopupFooter>
    }

    return null
  }, [footer, setIsDropdownVisible])

  return (
    <StyledPopup
      visible={isDropdownVisible}
      text={
        <Stack>
          {searchable && !isLoading && numberOfOptions >= 6 ? (
            <SearchBarDropdown
              placeholder={placeholder}
              displayedOptions={displayedOptions}
              setSearchBarActive={setSearchBarActive}
            />
          ) : null}
          <CreateDropdown
            isEmpty={isEmpty}
            emptyState={emptyState}
            descriptionDirection={descriptionDirection}
            loadMore={loadMore}
            optionalInfoPlacement={optionalInfoPlacement}
            defaultSearchValue={defaultSearchValue}
            isLoading={isLoading}
          />
          {computedFooter}
        </Stack>
      }
      placement="bottom"
      disableAnimation
      maxWidth={maxWidth ?? refSelect.current?.offsetWidth}
      hasArrow={false}
      ref={ref}
      tabIndex={0}
      role="dialog"
      debounceDelay={0}
      containerFullWidth
      align="start"
    >
      {children}
    </StyledPopup>
  )
}
