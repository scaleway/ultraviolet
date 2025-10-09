'use client'

import { SearchIcon } from '@ultraviolet/icons'
import type { Ref } from 'react'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import { isClientSide } from '../../helpers/isClientSide'
import { Popup } from '../Popup'
import { Stack } from '../Stack'
import { TextInput } from '../TextInput'
import { KeyGroup } from './KeyGroup'
import { clickableStack, searchInput, searchInputPopup } from './styles.css'
import type { SearchInputProps } from './types'

/**
 * SearchInput is a component that allows users to search for items. It is a combination of a TextInput and a Popup. The Popup is used to display search results.
 * Children of the SearchInput component can be a function that receives an object with the following properties:
 * - `searchTerms`: the current search terms
 * - `isOpen`: a boolean indicating if the popup is open
 * - `toggleIsOpen`: a function to toggle the popup
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      placeholder,
      label,
      labelDescription,
      loading,
      size,
      popupPlacement,
      threshold = 0,
      children,
      onSearch,
      onClose,
      'data-testid': dataTestId,
      shortcut = false,
      error,
      defaultValue = '',
      disabled,
      className,
      minLength,
      maxLength,
      tooltip,
      onFocus,
      onBlur,
      name,
      id,
      'aria-live': ariaLive,
      'aria-atomic': ariaAtomic,
      'aria-labelledby': ariaLabelledby,
      readOnly,
      required,
      autoFocus,
      autoComplete,
      onKeyDown,
      role,
      value,
    }: SearchInputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const focusedLinkIndex = useRef(0)
    const popupRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const [searchTerms, setSearchTerms] = useState(defaultValue)
    const [isMacOS, setIsMacOS] = useState(false)
    const [keyPressed, setKeyPressed] = useState<string[]>([])
    const [isOpen, toggleIsOpen] = useReducer(state => !state, false)
    const innerSearchInputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(
      ref,
      () => innerSearchInputRef.current as HTMLInputElement,
    )

    const content =
      typeof children === 'function'
        ? children({ isOpen, searchTerms, toggleIsOpen })
        : children

    const resizeSearchBar = () => {
      if (popupRef.current) {
        setContainerWidth(popupRef.current.getBoundingClientRect().width)
      }
    }

    const handleNavigation = (event: KeyboardEvent) => {
      const links = [...(popupRef.current?.querySelectorAll('a') ?? [])]

      if (
        links.length > 0 &&
        focusedLinkIndex.current >= 0 &&
        focusedLinkIndex.current <= links.length
      ) {
        if (event.key === 'ArrowUp') {
          if (focusedLinkIndex.current - 1 < 0) {
            focusedLinkIndex.current = links.length - 1
          } else {
            focusedLinkIndex.current -= 1
          }
          links[focusedLinkIndex.current]?.focus()
        }

        if (event.key === 'ArrowDown') {
          if (focusedLinkIndex.current + 1 >= links.length) {
            focusedLinkIndex.current = 0
          } else {
            focusedLinkIndex.current += 1
          }
          links[focusedLinkIndex.current]?.focus()
        }
      }
    }

    useEffect(() => {
      document.addEventListener('keyup', handleNavigation)

      return () => document.removeEventListener('keyup', handleNavigation)
    }, [])

    useEffect(() => {
      resizeSearchBar()

      window.addEventListener('resize', resizeSearchBar)

      return () => window.removeEventListener('resize', resizeSearchBar)
    }, [])

    useEffect(() => {
      if (value !== undefined) {
        setSearchTerms(value)
      }
    }, [value])

    const onSearchCallback = (localValue: string) => {
      setSearchTerms(localValue)

      try {
        onSearch(localValue)
        if (localValue.length >= threshold && !isOpen) {
          toggleIsOpen()
        }
      } catch {
        toggleIsOpen()
      }
    }

    const onCloseCallback = () => {
      onClose?.()
      if (isOpen) {
        toggleIsOpen()
      }
    }

    useEffect(() => {
      if (isClientSide) {
        // We need to check if window is defined to avoid SSR issues
        setIsMacOS(navigator.userAgent.includes('Mac'))
      }
    }, [])

    const handleKeyPressed = useCallback(
      (event: KeyboardEvent) => {
        if (!(event instanceof KeyboardEvent)) {
          return
        }

        const { ctrlKey, metaKey, key } = event
        setKeyPressed([...keyPressed, key.toUpperCase()])

        if (typeof shortcut === 'boolean') {
          if (
            (key === 'k' || key === 'K') &&
            ((!isMacOS && ctrlKey) || (isMacOS && metaKey))
          ) {
            event.preventDefault()
            innerSearchInputRef.current?.focus()
          }
        } else {
          const uppercaseShortcut = shortcut.map(s => s.toUpperCase())

          if (
            JSON.stringify([...keyPressed, key.toUpperCase()]) ===
            JSON.stringify(uppercaseShortcut)
          ) {
            event.preventDefault()
            innerSearchInputRef.current?.focus()
          }
        }
      },
      [keyPressed, shortcut, isMacOS],
    )

    const handleKeyReleased = useCallback(
      (event: KeyboardEvent) => {
        if (!(event instanceof KeyboardEvent)) {
          return
        }

        const { key } = event
        setKeyPressed(keyPressed.filter(k => k !== key.toUpperCase()))
      },
      [keyPressed],
    )

    useEffect(() => {
      if (shortcut && !disabled) {
        document.body.addEventListener('keydown', handleKeyPressed)
        document.body.addEventListener('keyup', handleKeyReleased)
      }

      return () => {
        document.body.removeEventListener('keydown', handleKeyPressed)
        document.body.removeEventListener('keyup', handleKeyReleased)
      }
    }, [shortcut, disabled, handleKeyPressed, handleKeyReleased])

    const keys = useMemo(() => {
      if (typeof shortcut === 'boolean') {
        return [isMacOS ? '⌘' : 'Ctrl', 'K']
      }

      const filteredKey = shortcut.map(key => {
        if (key === 'Meta') {
          return '⌘'
        }

        if (key === 'Control') {
          return 'Ctrl'
        }

        return key
      })

      return filteredKey
    }, [isMacOS, shortcut])

    return (
      <div style={{ width: '100%' }}>
        <Popup
          className={searchInputPopup}
          data-testid={`popup-${dataTestId}`}
          debounceDelay={0}
          hasArrow={false}
          hideOnClickOutside
          innerRef={popupRef}
          maxHeight={410}
          maxWidth={containerWidth}
          onClose={onCloseCallback}
          placement={popupPlacement}
          role="dialog"
          text={content}
          visible={isOpen}
        >
          <TextInput
            aria-atomic={ariaAtomic}
            aria-labelledby={ariaLabelledby}
            aria-live={ariaLive}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            className={`${className ? `${className} ` : ''}${searchInput}`}
            clearable
            data-testid={dataTestId}
            disabled={disabled}
            error={error}
            id={id}
            label={label}
            labelDescription={labelDescription}
            loading={loading}
            maxLength={maxLength}
            minLength={minLength}
            name={name}
            onBlur={onBlur}
            onChange={event => onSearchCallback(event.target.value)}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            prefix={
              <Stack
                className={clickableStack}
                data-testid={`search-icon${dataTestId ? `-${dataTestId}` : ''}`}
                onClick={() => innerSearchInputRef.current?.focus()}
              >
                <SearchIcon disabled={disabled} sentiment="neutral" />
              </Stack>
            }
            readOnly={readOnly}
            ref={innerSearchInputRef}
            required={required}
            role={role}
            size={size}
            suffix={
              shortcut && searchTerms.length === 0 ? (
                <KeyGroup
                  disabled={disabled}
                  keys={keys}
                  onClick={() => innerSearchInputRef.current?.focus()}
                />
              ) : undefined
            }
            tooltip={tooltip}
            value={searchTerms}
          />
        </Popup>
      </div>
    )
  },
)
