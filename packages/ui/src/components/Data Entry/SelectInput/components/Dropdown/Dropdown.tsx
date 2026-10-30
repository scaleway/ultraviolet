'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ComponentProps, Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import { Stack } from '../../../../Layout/Stack'
import { Popup } from '../../../../Overlay/Popup/v2'
import { DROPDOWN_MIN_WIDTH, NON_SEARCHABLE_KEYS } from '../../constants'
import { useSelectInput } from '../../SelectInputProvider'
import type { DataType, OptionType } from '../../types'
import { CreateDropdown } from './Content'
import { SearchBar } from './SearchBar'
import { selectInputStyle } from '../../styles.css'

export type DropdownProps = {
  id?: string
  children: ReactNode
  emptyState: ReactNode
  descriptionDirection: 'row' | 'column'
  searchable: boolean
  placeholder: string
  footer?: ((closeDropdown: () => void) => ReactNode) | ReactNode
  loadMore?: ReactNode
  optionalInfoPlacement: 'left' | 'right'
  isLoading?: boolean
  groupError?: Record<string, ReactNode>
  groupEmptyState?: Record<string, ReactNode>
  addOption?: { text: string; onClick: (searchText: string) => void }
  disabled?: boolean
  portalTarget?: ComponentProps<typeof Popup.Panel>['portalTarget']
  listboxId: string
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
    !NON_SEARCHABLE_KEYS.has(event.key) &&
    document.activeElement?.ariaLabel !== 'search-bar'
  ) {
    const currentSearch = search + event.key
    setSearch(currentSearch)
    ref.current.focus()
    const matchesSearch = (option: OptionType) =>
      option.searchText
        ? option.searchText.toLocaleLowerCase().startsWith(currentSearch)
        : option.value.toLocaleLowerCase().startsWith(currentSearch)
    const closestOption = Array.isArray(options)
      ? options.find(matchesSearch)
      : Object.values(options).flat().find(matchesSearch)

    setDefaultSearch(closestOption ? (closestOption.searchText ?? closestOption.value) : null)
  }
}
export const Dropdown = ({
  children,
  emptyState,
  descriptionDirection,
  searchable,
  placeholder,
  footer,
  loadMore,
  optionalInfoPlacement,
  isLoading,
  id,
  groupError,
  groupEmptyState,
  addOption,
  disabled,
  portalTarget,
  listboxId,
}: DropdownProps) => {
  const {
    setIsDropdownVisible,
    isDropdownVisible,
    onSearch,
    searchInput,
    options,
    displayedOptions,
    numberOfOptions,
    selectedData,
  } = useSelectInput()
  const [searchBarActive, setSearchBarActive] = useState(false)
  const [defaultSearchValue, setDefaultSearchValue] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState('')
  const initialFocusRef = useRef<HTMLElement | null>(null)

  if (!isDropdownVisible) {
    if (defaultSearchValue !== null) {
      setDefaultSearchValue(null)
    }
    if (search !== '') {
      setSearch('')
    }
  }

  useEffect(() => {
    if (!searchInput) {
      onSearch(options)
    }
  }, [onSearch, options, searchInput])

  useEffect(() => {
    const eventKeydown = (event: globalThis.KeyboardEvent) =>
      handleKeyDown(event, ref, options, searchBarActive, setSearch, setDefaultSearchValue, search)

    if (!searchable) {
      document.addEventListener('keydown', eventKeydown)
    }

    return () => {
      if (!searchable) {
        document.removeEventListener('keydown', eventKeydown)
      }
    }
  }, [searchBarActive, options, search, setDefaultSearchValue, searchable])

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
        return <div className={selectInputStyle.footer}>{footer(() => setIsDropdownVisible(false))}</div>
      }

      return <div className={selectInputStyle.footer}>{footer}</div>
    }

    return null
  }, [isEmpty, footer, setIsDropdownVisible])

  return (
    <Popup.Root visible={isDropdownVisible && !disabled} onOpenChange={setIsDropdownVisible}>
      <Popup.Trigger>{children}</Popup.Trigger>
      <Popup.Panel
        id={id}
        ref={ref}
        className={selectInputStyle.dropdown}
        placement="bottom"
        matchTriggerMaxWidth
        matchTriggerWidth
        minWidth={DROPDOWN_MIN_WIDTH}
        portalTarget={portalTarget}
        initialFocus={searchable || selectedData.selectedValues.length === 0 ? undefined : initialFocusRef}
      >
        <Stack>
          {searchable && !isLoading ? (
            <SearchBar
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
            initialFocusRef={initialFocusRef}
            isEmpty={isEmpty}
            isLoading={isLoading}
            loadMore={loadMore}
            optionalInfoPlacement={optionalInfoPlacement}
            searchable={searchable}
            listboxId={listboxId}
          />
          {computedFooter}
        </Stack>
      </Popup.Panel>
    </Popup.Root>
  )
}
