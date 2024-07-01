import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { Ref } from 'react'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
  useState,
} from 'react'
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
  min-width: 610px;
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
export const SearchInput = forwardRef(
  (
    {
      placeholder,
      label,
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
    }: SearchInputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const focusedLinkIndex = useRef(0)
    const popupRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const [searchTerms, setSearchTerms] = useState('')
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

    const onSearchCallback = (value: string) => {
      setSearchTerms(value)

      try {
        onSearch(value)
        if (value.length >= threshold && !isOpen) {
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

    const isMacOS = navigator.userAgent.includes('Mac')

    const handleShortcut = useCallback(
      (event: KeyboardEvent) => {
        const { ctrlKey, metaKey, key } = event

        if (
          (key === 'k' || key === 'K') &&
          ((!isMacOS && ctrlKey) || (isMacOS && metaKey))
        ) {
          event.preventDefault()
          innerSearchInputRef.current?.focus()
        }
      },
      [isMacOS, innerSearchInputRef],
    )

    useEffect(() => {
      if (shortcut && !disabled) {
        document.body.addEventListener('keydown', handleShortcut)
      }

      return () => {
        document.body.removeEventListener('keydown', handleShortcut)
      }
    }, [handleShortcut, shortcut, disabled])

    return (
      <div>
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
            prefix={
              <Icon name="search" disabled={disabled} sentiment="neutral" />
            }
            suffix={
              shortcut && searchTerms.length === 0 ? (
                <KeyGroup
                  disabled={disabled}
                  keys={[isMacOS ? '⌘' : 'Ctrl', 'K']}
                />
              ) : undefined
            }
            data-testid={dataTestId}
            error={error}
            value={searchTerms}
            size={size}
            label={label}
            placeholder={placeholder}
            loading={loading}
            onChange={onSearchCallback}
            clearable
            disabled={disabled}
          />
        </StyledPopup>
      </div>
    )
  },
)
