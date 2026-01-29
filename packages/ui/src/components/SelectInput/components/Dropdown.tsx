'use client'

import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import { useTheme } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type {
  ChangeEvent,
  ComponentProps,
  Dispatch,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react'
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Checkbox } from '../../Checkbox'
import { ModalContext } from '../../Modal/ModalProvider'
import { Popup } from '../../Popup'
import { Skeleton } from '../../Skeleton'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import {
  DROPDOWN_MAX_HEIGHT,
  INPUT_SIZE_HEIGHT,
  OPTION_SELECTOR,
} from '../constants'
import { useSelectInput } from '../SelectInputProvider'
import type { DataType, OptionType } from '../types'
import { DisplayOption } from './DropdownOption'
import {
  comboboxCreate,
  dropdown,
  dropdownCheckbox,
  dropdownContainer,
  dropdownContainerUnGrouped,
  dropdownEmptyState,
  dropdownGroup,
  dropdownGroupSelectable,
  dropdownGroupWrapper,
  dropdownItem,
  dropdownLoadMore,
  dropdownWidth,
  emptyStateGroupStyle,
  footer as footerStyle,
} from './dropdown.css'
import { SearchBarDropdown } from './SearchBarDropdown'

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
  groupError?: Record<string, ReactNode>
  groupEmptyState?: Record<string, ReactNode>
  addOption?: { text: string; onClick: (searchText: string) => void }
}

export type CreateDropdownProps = {
  isEmpty: boolean
  emptyState: ReactNode
  descriptionDirection: 'row' | 'column'
  loadMore?: ReactNode
  optionalInfoPlacement: 'left' | 'right'
  defaultSearchValue: string | null
  isLoading?: boolean
  groupError?: Record<string, ReactNode>
  groupEmptyState?: Record<string, ReactNode>
  addOption?: { text: string; onClick: (searchText: string) => void }
  searchable?: boolean
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

const moveFocusDown = () => {
  const options = document.querySelectorAll(OPTION_SELECTOR)
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
  const options = document.querySelectorAll(OPTION_SELECTOR)
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
    if (Array.isArray(options)) {
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
    } else {
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
  groupEmptyState,
  groupError,
  addOption,
  searchable,
}: CreateDropdownProps) => {
  const {
    setIsDropdownVisible,
    onChange,
    options,
    multiselect,
    selectAll,
    selectAllGroup,
    displayedOptions,
    onSearch,
    setSelectedData,
    selectedData,
    searchInput,
    setSearchInput,
  } = useSelectInput()
  const focusedItemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (defaultSearchValue && focusedItemRef?.current) {
      focusedItemRef.current.focus()
    }
  }, [defaultSearchValue])

  const handleClickCustomValue = () => {
    const newOption = { label: searchInput, value: searchInput }
    addOption?.onClick(searchInput)
    onSearch([newOption])
    setIsDropdownVisible(multiselect)
    setSearchInput('')
  }

  if (isEmpty && !addOption) {
    return (
      <Stack alignItems="center" className={dropdownEmptyState} gap={2}>
        {emptyState ?? (
          <Text as="p" variant="bodyStrong">
            No options
          </Text>
        )}
      </Stack>
    )
  }

  if (isEmpty && addOption && searchable) {
    const text = (
      <Stack alignItems="center" direction="row" gap="1">
        <PlusIcon sentiment="primary" size="small" />
        <Text as="span" sentiment="primary" variant="bodySmallStrong">
          {addOption.text} {searchInput}
        </Text>
      </Stack>
    )

    const option = {
      label: text,
      searchText: searchInput,
      value: `${addOption.text} ${searchInput}`,
    }

    return (
      <div
        aria-selected="false"
        className={comboboxCreate}
        data-testid="add-option"
        id="add-option"
        onClick={handleClickCustomValue}
        onKeyDown={event => {
          if (['Enter', ' '].includes(event.key)) {
            handleClickCustomValue()
          }
        }}
        role="option"
        tabIndex={-1}
      >
        <DisplayOption
          descriptionDirection="row"
          option={option}
          optionalInfoPlacement="left"
        />
      </div>
    )
  }

  const handleClick = ({
    clickedOption,
    group,
    event,
  }: {
    clickedOption: OptionType
    group?: string
    event:
      | MouseEvent<HTMLDivElement>
      | KeyboardEvent<HTMLDivElement>
      | ChangeEvent<HTMLDivElement>
  }) => {
    event.stopPropagation()

    setSelectedData({ clickedOption, group, type: 'selectOption' })
    if (multiselect) {
      if (selectedData.selectedValues.includes(clickedOption.value)) {
        onChange?.(
          selectedData.selectedValues.filter(
            value => value !== clickedOption.value,
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
        if (Array.isArray(options)) {
          options.map(option => allValues.push(option))
        } else {
          Object.keys(options).map((group: string) =>
            options[group].map(option => {
              if (!option.disabled) {
                allValues.push(option)
              }

              return null
            }),
          )
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

  return Array.isArray(displayedOptions) ? (
    <Stack
      className={cn(dropdownContainer, dropdownContainerUnGrouped)}
      gap={0.25}
      id="select-dropdown"
      onKeyDown={handleKeyDownSelect}
      role="listbox"
    >
      {addOption && searchInput && searchable ? (
        <div
          aria-selected="false"
          className={comboboxCreate}
          data-testid="add-option"
          id="add-option"
          onClick={handleClickCustomValue}
          onKeyDown={event => {
            if (['Enter', ' '].includes(event.key)) {
              handleClickCustomValue()
            }
          }}
          role="option"
          tabIndex={-1}
        >
          <DisplayOption
            descriptionDirection="row"
            option={{
              label: (
                <Stack alignItems="center" direction="row" gap="1">
                  <PlusIcon sentiment="primary" size="small" />
                  <Text as="span" sentiment="primary" variant="bodySmallStrong">
                    {addOption.text} {searchInput}
                  </Text>
                </Stack>
              ),
              searchText: searchInput,
              value: `${addOption.text} ${searchInput}`,
            }}
            optionalInfoPlacement="left"
          />
        </div>
      ) : null}
      {selectAll && multiselect ? (
        <Stack gap={0.25} id="items" tabIndex={-1}>
          <div
            aria-disabled={false}
            aria-label="select-all"
            aria-selected={selectedData.allSelected}
            className={cn(dropdownItem({ selected: selectedData.allSelected }))}
            data-testid="select-all"
            onClick={selectAllOptions}
            onKeyDown={event =>
              [' ', 'Enter'].includes(event.key) ? selectAllOptions() : null
            }
            role="option"
            tabIndex={0}
          >
            <Checkbox
              checked={selectedData.allSelected}
              className={dropdownCheckbox}
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
            </Checkbox>
          </div>
        </Stack>
      ) : null}
      <Stack gap={0.25} id="items">
        {isLoading ? (
          <Skeleton variant="block" />
        ) : (
          displayedOptions.map((option, index) => (
            <div
              aria-disabled={!!option.disabled}
              aria-label={option.value}
              aria-selected={
                selectedData.selectedValues.includes(option.value) &&
                !option.disabled
              }
              className={cn(
                dropdownItem({
                  disabled: !!option.disabled,
                  selected:
                    selectedData.selectedValues.includes(option.value) &&
                    !option.disabled,
                }),
              )}
              data-testid={`option-${option.value}`}
              id={`option-${index}`}
              key={option.value}
              onClick={event => {
                if (!option.disabled) {
                  handleClick({
                    clickedOption: option,
                    event,
                  })
                }
              }}
              onKeyDown={event => {
                const shouldClick = [' ', 'Enter'].includes(event.key)
                if (shouldClick) {
                  handleClick({
                    clickedOption: option,
                    event,
                  })
                }
              }}
              ref={
                option.value === defaultSearchValue ||
                option.searchText === defaultSearchValue
                  ? focusedItemRef
                  : null
              }
              role="option"
              tabIndex={option.disabled ? -1 : 0}
            >
              {multiselect ? (
                <Checkbox
                  checked={
                    selectedData.selectedValues.includes(option.value) &&
                    !option.disabled
                  }
                  className={dropdownCheckbox}
                  disabled={option.disabled}
                  onChange={event => {
                    if (!option.disabled) {
                      handleClick({
                        clickedOption: option,
                        event,
                      })
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
                </Checkbox>
              ) : (
                <DisplayOption
                  descriptionDirection={descriptionDirection}
                  option={option}
                  optionalInfoPlacement={optionalInfoPlacement}
                />
              )}
            </div>
          ))
        )}
        {loadMore ? (
          <Stack className={dropdownLoadMore}>{loadMore}</Stack>
        ) : null}
      </Stack>
    </Stack>
  ) : (
    <Stack
      className={dropdownContainer}
      data-grouped
      id="select-dropdown"
      onKeyDown={handleKeyDownSelect}
      role="listbox"
    >
      {isLoading ? (
        <Skeleton variant="block" />
      ) : (
        <>
          {addOption && searchInput && searchable ? (
            <div
              aria-selected="false"
              className={comboboxCreate}
              data-testid="add-option"
              id="add-option"
              onClick={handleClickCustomValue}
              onKeyDown={event => {
                if (['Enter', ' '].includes(event.key)) {
                  handleClickCustomValue()
                }
              }}
              role="option"
              tabIndex={-1}
            >
              <DisplayOption
                descriptionDirection="row"
                option={{
                  label: (
                    <Stack alignItems="center" direction="row" gap="1">
                      <PlusIcon sentiment="primary" size="small" />
                      <Text
                        as="span"
                        sentiment="primary"
                        variant="bodySmallStrong"
                      >
                        {addOption.text} {searchInput}
                      </Text>
                    </Stack>
                  ),
                  searchText: searchInput,
                  value: `${addOption.text} ${searchInput}`,
                }}
                optionalInfoPlacement="left"
              />
            </div>
          ) : null}
          {selectAll && multiselect ? (
            <Stack id="items">
              <div
                aria-disabled={false}
                aria-label="select-all"
                aria-selected={selectedData.allSelected}
                className={cn(
                  dropdownItem({ selected: selectedData.allSelected }),
                )}
                data-testid="select-all"
                id="select-all"
                onClick={selectAllOptions}
                onKeyDown={event =>
                  [' ', 'Enter'].includes(event.key) ? selectAllOptions() : null
                }
                role="option"
                tabIndex={0}
              >
                <Checkbox
                  checked={selectedData.allSelected}
                  className={dropdownCheckbox}
                  data-testid="select-all-checkbox"
                  disabled={false}
                  name="select-all"
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
                </Checkbox>
              </div>
            </Stack>
          ) : null}
          {Object.keys(displayedOptions).map((group, index) => {
            const hasElements = displayedOptions[group].length > 0
            const emptyStateGroup = groupEmptyState?.[group] ?? null
            const errorGroup = groupError?.[group] ?? null

            return (
              <Stack gap={0.25} key={group}>
                {hasElements || emptyStateGroup ? (
                  <div
                    className={dropdownGroupWrapper}
                    id={selectAllGroup ? 'items' : undefined}
                  >
                    {group ? (
                      // biome-ignore  lint/a11y/noInteractiveElementToNoninteractiveRole: to fix
                      <button
                        className={cn(
                          selectAllGroup ? dropdownGroupSelectable : '',
                          dropdownGroup,
                        )}
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
                          <Checkbox
                            checked={selectedData.selectedGroups.includes(
                              group,
                            )}
                            className={dropdownCheckbox}
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
                          </Checkbox>
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
                      </button>
                    ) : null}
                  </div>
                ) : null}
                <Stack gap="0.25" id="items">
                  {hasElements ? null : (
                    <Text
                      as="span"
                      className={emptyStateGroupStyle}
                      prominence="weak"
                      sentiment="neutral"
                      variant="body"
                    >
                      {emptyStateGroup}
                    </Text>
                  )}
                  {errorGroup ? (
                    <Text
                      as="span"
                      className={emptyStateGroupStyle}
                      sentiment="danger"
                      variant="body"
                    >
                      {errorGroup}
                    </Text>
                  ) : null}
                  {displayedOptions[group].map((option, indexOption) =>
                    errorGroup ? null : (
                      <div
                        aria-disabled={!!option.disabled}
                        aria-label={option.value}
                        aria-selected={
                          selectedData.selectedValues.includes(option.value) &&
                          !option.disabled
                        }
                        className={cn(
                          dropdownItem({
                            disabled: !!option.disabled,
                            selected:
                              selectedData.selectedValues.includes(
                                option.value,
                              ) && !option.disabled,
                          }),
                        )}
                        data-testid={`option-${option.value}`}
                        id={`option-${indexOption}`}
                        key={option.value}
                        onClick={event => {
                          if (!option.disabled) {
                            handleClick({
                              clickedOption: option,
                              event,
                              group,
                            })
                          }
                        }}
                        onKeyDown={event => {
                          const shouldClick = [' ', 'Enter'].includes(event.key)
                          if (shouldClick) {
                            handleClick({
                              clickedOption: option,
                              event,
                              group,
                            })
                          }
                        }}
                        ref={
                          option.value === defaultSearchValue ||
                          option.searchText === defaultSearchValue
                            ? focusedItemRef
                            : null
                        }
                        role="option"
                        tabIndex={option.disabled ? -1 : 0}
                      >
                        {multiselect ? (
                          <Checkbox
                            checked={
                              selectedData.selectedValues.includes(
                                option.value,
                              ) && !option.disabled
                            }
                            className={dropdownCheckbox}
                            disabled={option.disabled}
                            onChange={event => {
                              if (!option.disabled) {
                                handleClick({
                                  clickedOption: option,
                                  event,
                                  group,
                                })
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
                          </Checkbox>
                        ) : (
                          <DisplayOption
                            descriptionDirection={descriptionDirection}
                            option={option}
                            optionalInfoPlacement={optionalInfoPlacement}
                          />
                        )}
                      </div>
                    ),
                  )}
                </Stack>
              </Stack>
            )
          })}
        </>
      )}
      {loadMore ? <Stack className={dropdownLoadMore}>{loadMore}</Stack> : null}
    </Stack>
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
  groupError,
  groupEmptyState,
  addOption,
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

  const resizeDropdown = useCallback(() => {
    if (
      refSelect.current &&
      refSelect.current.getBoundingClientRect().width > 0 &&
      refSelect.current.getBoundingClientRect().width !== maxWidth
    ) {
      setWidth(refSelect.current.getBoundingClientRect().width)
    }
  }, [refSelect, maxWidth])

  useLayoutEffect(() => {
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
          const parentElement = modalElement.parentNode

          if (parentElement instanceof HTMLElement) {
            parentElement.scrollBy({
              behavior: 'smooth',
              top: overflow,
            })
          } else {
            modalElement.scrollBy({
              behavior: 'smooth',
              top: overflow,
            })
          }
          resizeDropdown()
        } else {
          window.scrollBy({ behavior: 'smooth', top: overflow })
        }
      }
    }
  }, [isDropdownVisible, refSelect, size, modalContext, theme, resizeDropdown])

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

    const eventKeydown = (event: globalThis.KeyboardEvent) =>
      handleKeyDown(
        event,
        ref,
        options,
        searchBarActive,
        setSearch,
        setDefaultSearch,
        search,
      )

    if (!searchable) {
      document.addEventListener('keydown', eventKeydown)
    }

    return () => {
      if (!searchable) {
        document.removeEventListener('keydown', eventKeydown)
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
          <div className={footerStyle}>
            {footer(() => setIsDropdownVisible(false))}
          </div>
        )
      }

      return <div className={footerStyle}>{footer}</div>
    }

    return null
  }, [isEmpty, footer, setIsDropdownVisible])

  return (
    <Popup
      align={dropdownAlign ?? 'start'}
      className={dropdown}
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
      style={assignInlineVars({
        [dropdownWidth]:
          typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
      })}
      tabIndex={-1}
      text={
        <Stack>
          {searchable && !isLoading && (numberOfOptions >= 6 || addOption) ? (
            <SearchBarDropdown
              displayedOptions={displayedOptions}
              placeholder={placeholder}
              setSearchBarActive={setSearchBarActive}
            />
          ) : null}
          <CreateDropdown
            addOption={addOption}
            defaultSearchValue={defaultSearchValue}
            descriptionDirection={descriptionDirection}
            emptyState={emptyState}
            groupEmptyState={groupEmptyState}
            groupError={groupError}
            isEmpty={isEmpty}
            isLoading={isLoading}
            loadMore={loadMore}
            optionalInfoPlacement={optionalInfoPlacement}
            searchable={searchable}
          />
          {computedFooter}
        </Stack>
      }
      visible={isDropdownVisible}
    >
      {children}
    </Popup>
  )
}
