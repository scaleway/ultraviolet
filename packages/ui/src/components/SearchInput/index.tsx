import styled from '@emotion/styled'
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
import {
  BasicPrefixStack,
  BasicSuffixStack,
  StyledInput,
  TextInputV2,
} from '../TextInputV2'
import { KeyGroup } from './KeyGroup'
import type { SearchInputProps } from './types'

const StyledPopup = styled(Popup)`
  width: 100%;
  text-align: initial;
  min-width: 38.125rem;
  padding: ${({ theme }) => `${theme.space['2']} ${theme.space['1']}`};
  background: ${({ theme }) => theme.colors.other.elevation.background.raised};
  box-shadow: ${({ theme }) => `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`};
`

const StyledTextInputV2 = styled(TextInputV2)`
  ${BasicPrefixStack} {
    border: none;
  }

  ${StyledInput} {
    padding: 0;
  }

  ${BasicSuffixStack} {
    border: none;
  }
`

/**
 * SearchInput is a component that allows users to search for items. It is a combination of a TextInputV2 and a Popup. The Popup is used to display search results.
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
    }: SearchInputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const focusedLinkIndex = useRef(0)
    const popupRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const [searchTerms, setSearchTerms] = useState('')
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
        ? children({ searchTerms, isOpen, toggleIsOpen })
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
        <StyledPopup
          data-testid={`popup-${dataTestId}`}
          role="dialog"
          visible={isOpen}
          onClose={onCloseCallback}
          placement={popupPlacement}
          maxWidth={containerWidth}
          hideOnClickOutside
          hasArrow={false}
          innerRef={popupRef}
          text={content}
          maxHeight={410}
          debounceDelay={0}
        >
          <StyledTextInputV2
            ref={innerSearchInputRef}
            prefix={<SearchIcon disabled={disabled} sentiment="neutral" />}
            suffix={
              shortcut && searchTerms.length === 0 ? (
                <KeyGroup disabled={disabled} keys={keys} />
              ) : undefined
            }
            data-testid={dataTestId}
            error={error}
            value={searchTerms}
            size={size}
            label={label}
            placeholder={placeholder}
            loading={loading}
            onChange={event => onSearchCallback(event.target.value)}
            clearable
            disabled={disabled}
            className={className}
            aria-atomic={ariaAtomic}
            autoComplete={autoComplete}
            aria-labelledby={ariaLabelledby}
            aria-live={ariaLive}
            id={id}
            name={name}
            readOnly={readOnly}
            required={required}
            autoFocus={autoFocus}
            maxLength={maxLength}
            minLength={minLength}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            role={role}
            tooltip={tooltip}
            labelDescription={labelDescription}
          />
        </StyledPopup>
      </div>
    )
  },
)
