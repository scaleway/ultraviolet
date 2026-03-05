'use client'

import { useTheme } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type {
  ComponentProps,
  Dispatch,
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
import { ModalContext } from '../../../Modal/ModalProvider'
import { Popup } from '../../../Popup'
import { Stack } from '../../../Stack'
import { DROPDOWN_MAX_HEIGHT, INPUT_SIZE_HEIGHT } from '../../constants'
import { useSelectInput } from '../../SelectInputProvider'
import { selectInputStyle } from '../../styles.css'
import type { DataType } from '../../types'
import { CreateDropdown } from './Content'
import { dropdownWidth } from './dropdown.css'
import { SearchBar } from './SearchBar'

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
  }, [resizeDropdown, refSelect.current?.offsetWidth])

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
          <div className={selectInputStyle.footer}>
            {footer(() => setIsDropdownVisible(false))}
          </div>
        )
      }

      return <div className={selectInputStyle.footer}>{footer}</div>
    }

    return null
  }, [isEmpty, footer, setIsDropdownVisible])

  return (
    <Popup
      align={dropdownAlign ?? 'start'}
      className={selectInputStyle.dropdown}
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
