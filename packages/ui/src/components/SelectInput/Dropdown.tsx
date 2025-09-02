'use client'

import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type {
  ComponentProps,
  Dispatch,
  KeyboardEvent,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react'
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Checkbox } from '../Checkbox'
import { ModalContext } from '../Modal/ModalProvider'
import { Popup } from '../Popup'
import { Skeleton } from '../Skeleton'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { DisplayOption } from './DropdownOption'
import { SearchBarDropdown } from './SearchBarDropdown'
import { useSelectInput } from './SelectInputProvider'
import type { DataType, OptionType } from './types'
import { INPUT_SIZE_HEIGHT } from './types'

const DROPDOWN_MAX_HEIGHT = 256

export type DropdownProps = {
  id?: string
  children: ReactNode
  emptyState: ReactNode
  descriptionDirection: 'row' | 'column'
  searchable: boolean
  placeholder: string
  footer?: ((closeDropdown: () => void) => ReactNode) | ReactNode
  refSelect: RefObject<HTMLDivElement | null>
  loadMore?: ReactNode
  optionalInfoPlacement: 'left' | 'right'
  isLoading?: boolean
  size: 'small' | 'medium' | 'large'
  dropdownAlign?: ComponentProps<typeof Popup>['align']
  portalTarget?: ComponentProps<typeof Popup>['portalTarget']
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
  width: 90%;
  min-width: 320px;
  background-color: ${({ theme }) =>
    theme.colors.other.elevation.background.raised};
  color: ${({ theme }) => theme.colors.neutral.text};
  box-shadow: ${({ theme }) =>
    `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`};
  padding: ${({ theme }) => theme.space[0]};
  margin-bottom: ${({ theme }) => theme.space[10]};
`

const DropdownContainer = styled(Stack)<{ 'data-grouped': boolean }>`
  max-height: ${DROPDOWN_MAX_HEIGHT}px;
  overflow-y: auto;
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
  display: flex;
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
  background-color: ${({ theme }) =>
    theme.colors.other.elevation.background.raised};

  padding: ${({ theme }) => theme.space['1.5']} ${({ theme }) =>
    theme.space['2']} ${({ theme }) => theme.space['1.5']} ${({ theme }) =>
    theme.space['2']};
  margin-left: ${({ theme }) => theme.space['0.5']};
  margin-right: ${({ theme }) => theme.space['0.5']};

  color:  ${({ theme }) => theme.colors.neutral.text};
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px transparent solid;

  &:hover, :focus {
    background-color: ${({ theme }) => theme.colors.primary.background};
    color: ${({ theme }) => theme.colors.primary.text};
    cursor: pointer;
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

  if (event.key === ' ') {
    // No scroll
    event.preventDefault()
  }
}

const handleKeyDown = (
  event: globalThis.KeyboardEvent,
  ref: RefObject<HTMLDivElement | null>,
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
      const closestOption = [...options].find(option =>
        option.searchText
          ? option.searchText.toLocaleLowerCase().startsWith(currentSearch)
          : option.value.toLocaleLowerCase().startsWith(currentSearch),
      )
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
      <EmptyState alignItems="center" gap={2}>
        {emptyState ?? (
          <Text as="p" variant="bodyStrong">
            No options
          </Text>
        )}
      </EmptyState>
    )
  }

  const handleClick = (clickedOption: OptionType, group?: string) => {
    setSelectedData({ clickedOption, group, type: 'selectOption' })
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
      setSelectedData({ selectedGroup: group, type: 'selectGroup' })
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
      data-grouped
      id="select-dropdown"
      onKeyDown={handleKeyDownSelect}
      role="listbox"
    >
      {isLoading ? (
        <Skeleton variant="block" />
      ) : (
        <>
          {selectAll && multiselect ? (
            <Stack id="items">
              <DropdownItem
                aria-disabled={false}
                aria-label="select-all"
                aria-selected={selectedData.allSelected}
                data-testid="select-all"
                id="select-all"
                onClick={selectAllOptions}
                onKeyDown={event =>
                  [' ', 'Enter'].includes(event.key) ? selectAllOptions() : null
                }
                role="option"
                tabIndex={0}
              >
                <StyledCheckbox
                  checked={selectedData.allSelected}
                  data-testid="select-all-checkbox"
                  disabled={false}
                  onChange={selectAllOptions}
                  tabIndex={-1}
                  value="select-all"
                >
                  <Stack direction="column">
                    <Text as="span" placement="left" variant="body">
                      {selectAll.label}
                    </Text>
                    <Text
                      as="span"
                      placement="left"
                      prominence="weak"
                      sentiment="neutral"
                      variant="bodySmall"
                    >
                      {selectAll.description}
                    </Text>
                  </Stack>
                </StyledCheckbox>
              </DropdownItem>
            </Stack>
          ) : null}
          {Object.keys(displayedOptions).map((group, index) => (
            <Stack gap={0.25} key={group}>
              {displayedOptions[group].length > 0 ? (
                <DropdownGroupWrapper id={selectAllGroup ? 'items' : undefined}>
                  {group ? (
                    <DropdownGroup
                      data-selectgroup={selectAllGroup}
                      data-testid={`group-${index}`}
                      key={group}
                      onClick={() =>
                        selectAllGroup ? handleSelectGroup(group) : null
                      }
                      onKeyDown={event => {
                        if ([' ', 'Enter'].includes(event.key)) {
                          event.preventDefault()
                          handleSelectGroup(group)
                        }
                      }}
                      role="group"
                      tabIndex={selectAllGroup ? 0 : -1}
                      type="button"
                    >
                      {selectAllGroup ? (
                        <StyledCheckbox
                          checked={selectedData.selectedGroups.includes(group)}
                          data-testid="select-group"
                          disabled={false}
                          onChange={() =>
                            selectAllGroup ? handleSelectGroup(group) : null
                          }
                          tabIndex={-1}
                          value={group}
                        >
                          <Text
                            as="span"
                            placement="left"
                            sentiment="neutral"
                            variant="caption"
                          >
                            {group.toUpperCase()}
                          </Text>
                        </StyledCheckbox>
                      ) : (
                        <Text
                          as="span"
                          placement="left"
                          sentiment="neutral"
                          variant="caption"
                        >
                          {group.toUpperCase()}
                        </Text>
                      )}
                    </DropdownGroup>
                  ) : null}
                </DropdownGroupWrapper>
              ) : null}
              <Stack gap="0.25" id="items">
                {displayedOptions[group].map((option, indexOption) => (
                  <DropdownItem
                    aria-disabled={!!option.disabled}
                    aria-label={option.value}
                    aria-selected={
                      selectedData.selectedValues.includes(option.value) &&
                      !option.disabled
                    }
                    data-testid={`option-${option.value}`}
                    id={`option-${indexOption}`}
                    key={option.value}
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
                    role="option"
                    tabIndex={!option.disabled ? 0 : -1}
                  >
                    {multiselect ? (
                      <StyledCheckbox
                        checked={
                          selectedData.selectedValues.includes(option.value) &&
                          !option.disabled
                        }
                        disabled={option.disabled}
                        onChange={() => {
                          if (!option.disabled) {
                            handleClick(option, group)
                          }
                        }}
                        tabIndex={-1}
                        value={option.value}
                      >
                        <DisplayOption
                          descriptionDirection={descriptionDirection}
                          option={option}
                          optionalInfoPlacement={optionalInfoPlacement}
                        />
                      </StyledCheckbox>
                    ) : (
                      <DisplayOption
                        descriptionDirection={descriptionDirection}
                        option={option}
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
      data-grouped={false}
      gap={0.25}
      id="select-dropdown"
      onKeyDown={handleKeyDownSelect}
      role="listbox"
    >
      {selectAll && multiselect ? (
        <Stack gap={0.25} id="items" tabIndex={-1}>
          <DropdownItem
            aria-disabled={false}
            aria-label="select-all"
            aria-selected={selectedData.allSelected}
            data-testid="select-all"
            onClick={selectAllOptions}
            onKeyDown={event =>
              [' ', 'Enter'].includes(event.key) ? selectAllOptions() : null
            }
            role="option"
            tabIndex={0}
          >
            <StyledCheckbox
              checked={selectedData.allSelected}
              data-testid="select-all-checkbox"
              disabled={false}
              onChange={selectAllOptions}
              tabIndex={-1}
              value="select-all"
            >
              <Stack direction="column">
                <Text as="span" placement="left" variant="body">
                  {selectAll.label}
                </Text>
                <Text
                  as="span"
                  placement="left"
                  prominence="weak"
                  sentiment="neutral"
                  variant="bodySmall"
                >
                  {selectAll.description}
                </Text>
              </Stack>
            </StyledCheckbox>
          </DropdownItem>
        </Stack>
      ) : null}
      <Stack gap={0.25} id="items">
        {isLoading ? (
          <Skeleton variant="block" />
        ) : (
          displayedOptions.map((option, index) => (
            <DropdownItem
              aria-disabled={!!option.disabled}
              aria-label={option.value}
              aria-selected={
                selectedData.selectedValues.includes(option.value) &&
                !option.disabled
              }
              data-testid={`option-${option.value}`}
              id={`option-${index}`}
              key={option.value}
              onClick={() => {
                if (!option.disabled) {
                  handleClick(option)
                }
              }}
              onKeyDown={event =>
                [' ', 'Enter'].includes(event.key) ? handleClick(option) : null
              }
              ref={
                option.value === defaultSearchValue ||
                option.searchText === defaultSearchValue
                  ? focusedItemRef
                  : null
              }
              role="option"
              tabIndex={!option.disabled ? 0 : -1}
            >
              {multiselect ? (
                <StyledCheckbox
                  checked={
                    selectedData.selectedValues.includes(option.value) &&
                    !option.disabled
                  }
                  disabled={option.disabled}
                  onChange={() => {
                    if (!option.disabled) {
                      handleClick(option)
                    }
                  }}
                  tabIndex={-1}
                  value={option.value}
                >
                  <DisplayOption
                    descriptionDirection={descriptionDirection}
                    option={option}
                    optionalInfoPlacement={optionalInfoPlacement}
                  />
                </StyledCheckbox>
              ) : (
                <DisplayOption
                  descriptionDirection={descriptionDirection}
                  option={option}
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
  dropdownAlign,
  portalTarget,
  id,
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
  const [maxWidth, setWidth] = useState<string | number>(
    refSelect.current?.offsetWidth ?? '100%',
  )
  const modalContext = useContext(ModalContext)

  useEffect(() => {
    if (refSelect.current && isDropdownVisible) {
      const position =
        refSelect.current.getBoundingClientRect().bottom +
        DROPDOWN_MAX_HEIGHT +
        Number(theme.sizing[INPUT_SIZE_HEIGHT[size]].replace('rem', '')) * 16 +
        Number.parseInt(theme.space['5'], 10)
      const overflow = position - window.innerHeight + 32
      if (overflow > 0 && modalContext) {
        const currentModal = modalContext.openedModals[0]
        const modalElement = currentModal?.ref.current

        if (modalElement) {
          const parentElement = modalElement.parentNode as HTMLElement
          if (parentElement) {
            parentElement.scrollBy({
              behavior: 'smooth',
              top: overflow,
            })
          }
        } else {
          window.scrollBy({ behavior: 'smooth', top: overflow })
        }
      }
    }
    // oxlint-disable react/exhaustive-deps
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
    if (numberOfOptions === 0) {
      return true
    }
    if (Array.isArray(displayedOptions)) {
      return displayedOptions.length === 0
    }
    const groups = Object.keys(displayedOptions)
    for (const group of groups) {
      if (displayedOptions[group].length > 0) {
        return false
      }
    }

    return true
  }, [displayedOptions, numberOfOptions])

  const computedFooter = useMemo(() => {
    if (footer && !isEmpty) {
      if (typeof footer === 'function') {
        return (
          <PopupFooter>{footer(() => setIsDropdownVisible(false))}</PopupFooter>
        )
      }

      return <PopupFooter>{footer}</PopupFooter>
    }

    return null
  }, [isEmpty, footer, setIsDropdownVisible])

  return (
    <StyledPopup
      align={dropdownAlign ?? 'start'}
      containerFullWidth
      debounceDelay={0}
      disableAnimation
      hasArrow={false}
      hideOnClickOutside
      id={id}
      maxWidth={maxWidth ?? refSelect.current?.offsetWidth}
      onClose={() => setIsDropdownVisible(false)}
      placement="bottom"
      portalTarget={portalTarget}
      ref={ref}
      role="dialog"
      tabIndex={-1}
      text={
        <Stack>
          {searchable && !isLoading && numberOfOptions >= 6 ? (
            <SearchBarDropdown
              displayedOptions={displayedOptions}
              placeholder={placeholder}
              setSearchBarActive={setSearchBarActive}
            />
          ) : null}
          <CreateDropdown
            defaultSearchValue={defaultSearchValue}
            descriptionDirection={descriptionDirection}
            emptyState={emptyState}
            isEmpty={isEmpty}
            isLoading={isLoading}
            loadMore={loadMore}
            optionalInfoPlacement={optionalInfoPlacement}
          />
          {computedFooter}
        </Stack>
      }
      visible={isDropdownVisible}
    >
      {children}
    </StyledPopup>
  )
}
