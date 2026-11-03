'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { ComponentProps, Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import { Stack } from '../../../../Layout/Stack'
import { VisuallyHidden } from '../../../../Other/VisuallyHidden'
import { Popup } from '../../../../Overlay/Popup/v2'
import { NON_SEARCHABLE_KEYS } from '../../constants'
import { useSelectInput } from '../../SelectInputProvider'
import type { DataType, OptionType } from '../../types'
import { CreateDropdown } from './Content'
import { SearchBar } from './SearchBar'
import { selectInputStyle } from '../../styles.css'

export type DropdownProps = {
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
  listboxLabelledBy?: string
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
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey &&
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
  groupError,
  groupEmptyState,
  addOption,
  disabled,
  portalTarget,
  listboxId,
  listboxLabelledBy,
}: DropdownProps) => {
  const { setIsDropdownVisible, isDropdownVisible, onSearch, searchInput, options, displayedOptions, numberOfOptions } =
    useSelectInput()
  const [searchBarActive, setSearchBarActive] = useState(false)
  const [defaultSearchValue, setDefaultSearchValue] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const resultCountId = useId()
  const searchBarRef = useRef<HTMLInputElement | null>(null)
  const [search, setSearch] = useState('')
  const initialFocusRef = useRef<HTMLDivElement | null>(null)

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

  const displayedOptionCount = useMemo(
    () =>
      Array.isArray(displayedOptions)
        ? displayedOptions.length
        : Object.values(displayedOptions).reduce((count, groupOptions) => count + groupOptions.length, 0),
    [displayedOptions],
  )

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
      <Popup.Trigger aria-controls={listboxId} aria-haspopup="listbox">
        {children}
      </Popup.Trigger>
      <Popup.Panel
        ref={ref}
        className={selectInputStyle.dropdown}
        placement="bottom-start"
        matchTriggerWidth
        portalTarget={portalTarget}
        initialFocus={!searchable && !isLoading && displayedOptionCount > 0 ? initialFocusRef : undefined}
      >
        <Stack>
          {searchable && !isLoading ? (
            <SearchBar
              displayedOptions={displayedOptions}
              inputRef={searchBarRef}
              listboxId={listboxId}
              placeholder={placeholder}
              resultCountId={resultCountId}
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
            listboxId={listboxId}
            listboxLabelledBy={listboxLabelledBy}
            optionalInfoPlacement={optionalInfoPlacement}
            searchable={searchable}
            searchBarRef={searchBarRef}
          />
          {computedFooter}
        </Stack>
      </Popup.Panel>
      <VisuallyHidden as="output" aria-atomic="true" aria-live="polite" id={resultCountId}>
        {isDropdownVisible ? `${displayedOptionCount} option${displayedOptionCount === 1 ? '' : 's'} available` : ''}
      </VisuallyHidden>
    </Popup.Root>
  )
}
