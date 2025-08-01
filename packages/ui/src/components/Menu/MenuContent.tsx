'use client'

import styled from '@emotion/styled'
import type {
  ButtonHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  Ref,
} from 'react'
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Popup } from '../Popup'
import { SearchInput } from '../SearchInput'
import { Stack } from '../Stack'
import { SIZES } from './constants'
import { getListItem, searchChildren } from './helpers'
import { DisclosureContext, useMenu } from './MenuProvider'
import type { MenuProps } from './types'

const StyledPopup = styled(Popup, {
  shouldForwardProp: prop => !['searchable'].includes(prop),
})<{ searchable: boolean }>`
  background-color: ${({ theme }) =>
    theme.colors.other.elevation.background.raised};
  box-shadow: ${({ theme }) =>
    `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`};
  padding: 0;

  &[data-has-arrow='true'] {
    &::after {
      border-color: ${({ theme }) =>
        theme.colors.other.elevation.background.raised}
        transparent transparent transparent;
    }
  }

  min-width: ${SIZES.small};
  max-width: ${SIZES.large};

  ${({ searchable }) => (searchable ? `min-width: 20rem` : null)};
  padding: ${({ theme }) => `${theme.space['0.25']} 0`};

`

const Content = styled(Stack)`
overflow: auto;
`

const Footer = styled(Stack)`
  padding: ${({ theme }) => theme.space['1']};
`

const MenuList = styled(Stack, {
  shouldForwardProp: prop => !['height'].includes(prop),
})<{ height: string }>`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(${({ height }) => height} - ${({ theme }) =>
    theme.space['0.5']});
  &:after,
  &:before {
    border: solid transparent;
    border-width: 9px;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: transparent;
  }
  &:before {
    border-color: transparent;
  }
  background-color: ${({ theme }) =>
    theme.colors.other.elevation.background.raised};
  color: ${({ theme }) => theme.colors.neutral.text};
  border-radius: ${({ theme }) => theme.radii.default};
  position: relative;
`

const StyledSearchInput = styled(SearchInput)`
  padding: ${({ theme }) => theme.space['1']};
`

export const Menu = forwardRef(
  (
    {
      id,
      ariaLabel = 'Menu',
      children,
      disclosure,
      hasArrow = false,
      placement = 'bottom',
      className,
      'data-testid': dataTestId,
      maxHeight,
      portalTarget = document.body,
      triggerMethod = 'click',
      dynamicDomRendering,
      align,
      searchable = false,
      footer,
    }: MenuProps,
    ref: Ref<HTMLButtonElement | null>,
  ) => {
    const {
      isVisible,
      setIsVisible,
      isNested,
      disclosureRef,
      menuRef,
      setShouldBeVisible,
      shouldBeVisible,
    } = useMenu()
    const searchInputRef = useRef<HTMLInputElement>(null)
    const [localChild, setLocalChild] = useState<ReactNode[] | null>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const tempId = useId()
    const finalId = `menu-${id ?? tempId}`
    // if you need dialog inside your component, use function, otherwise component is fine
    const target = isValidElement<ButtonHTMLAttributes<HTMLButtonElement>>(
      disclosure,
    )
      ? disclosure
      : disclosure({ visible: isVisible })
    const innerRef = useRef(target as unknown as HTMLButtonElement)
    useImperativeHandle(ref, () => innerRef.current)

    const finalDisclosure = cloneElement(target, {
      'aria-expanded': isVisible,
      'aria-haspopup': 'dialog',
      onClick: (event: MouseEvent<HTMLButtonElement>) => {
        target.props.onClick?.(event)
        setIsVisible(!isVisible)
      },
      // @ts-expect-error not sure how to fix this
      ref: disclosureRef,
    })

    const onSearch = useCallback(
      (value: string) => {
        if (typeof children === 'object') {
          setLocalChild(searchChildren(children, value))
        }
      },
      [children],
    )

    useEffect(() => {
      if (isVisible && searchable) {
        setTimeout(() => {
          searchInputRef.current?.focus()
        }, 50)
      }
    }, [isVisible, searchable])

    useEffect(() => {
      if (disclosureRef.current && triggerMethod === 'hover') {
        const handler = (value: boolean | undefined) => {
          setShouldBeVisible(value)
        }

        disclosureRef.current.addEventListener('focus', () => handler(true))
        disclosureRef.current.addEventListener('mouseenter', () =>
          handler(true),
        )
        disclosureRef.current.addEventListener('mouseleave', () =>
          handler(false),
        )
        disclosureRef.current.addEventListener('keydown', event => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            handler(false) // force close menu when navigating with arrow keys
          }
        })

        return () => {
          window.removeEventListener('focus', () => handler(undefined))
          window.removeEventListener('mouseenter', () => handler(undefined))
          window.removeEventListener('mouseleave', () => handler(undefined))
          window.removeEventListener('keydown', () => handler(undefined))
        }
      }

      return undefined
    }, [setShouldBeVisible, disclosureRef, triggerMethod])

    const finalChild = useMemo(() => {
      if (typeof children === 'function') {
        return children({ toggle: () => setIsVisible(!isVisible) })
      }

      if (searchable && localChild) {
        return localChild
      }

      return children
    }, [children, isVisible, localChild, searchable, setIsVisible])

    const handleTabOpen = (event: KeyboardEvent) => {
      if (contentRef.current) {
        const listItem = getListItem([...contentRef.current.children])
        if (listItem && isVisible && ['Tab', 'ArrowDown'].includes(event.key)) {
          event?.preventDefault()
          listItem[0]?.focus()
        }
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (contentRef.current) {
        const listItem = getListItem([...contentRef.current.children])
        if (listItem) {
          const currentElement = listItem.find(
            item => item === document.activeElement,
          )
          if (currentElement) {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              const indexOfCurrent = listItem.indexOf(currentElement)

              if (indexOfCurrent < listItem.length - 1) {
                listItem[indexOfCurrent + 1].focus()
              } else {
                listItem[0].focus()
              }
            } else if (event.key === 'ArrowUp') {
              event.preventDefault()

              const indexOfCurrent = listItem.indexOf(currentElement)
              if (indexOfCurrent > 0) {
                listItem[indexOfCurrent - 1].focus()
              } else {
                listItem[listItem.length - 1].focus()
              }
            } else if (event.key === 'ArrowLeft' && triggerMethod === 'hover') {
              disclosureRef.current?.focus()
              setShouldBeVisible(undefined)
            }
          }
        }
      }
    }

    return (
      <StyledPopup
        align={align}
        aria-label={ariaLabel}
        className={className}
        data-has-arrow={hasArrow}
        debounceDelay={triggerMethod === 'hover' ? 250 : 0}
        dynamicDomRendering={dynamicDomRendering}
        hasArrow={hasArrow}
        hideOnClickOutside
        id={finalId}
        maxHeight={maxHeight ?? '30rem'}
        onClose={() => {
          setIsVisible(false)
          setLocalChild(null)
          if (triggerMethod === 'click') {
            disclosureRef.current?.focus()
          }
          setShouldBeVisible(undefined)
        }}
        onKeyDown={handleTabOpen}
        placement={isNested ? 'nested-menu' : placement}
        portalTarget={portalTarget}
        ref={menuRef}
        role="dialog"
        searchable={searchable}
        tabIndex={-1}
        text={
          <MenuList
            className={className}
            data-testid={dataTestId}
            height={maxHeight ?? '30rem'}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setShouldBeVisible(true)}
            onMouseLeave={() => setShouldBeVisible(false)}
            role="menu"
          >
            <Content ref={contentRef}>
              {searchable && typeof children !== 'function' ? (
                <StyledSearchInput
                  onSearch={onSearch}
                  ref={searchInputRef}
                  size="small"
                />
              ) : null}
              {finalChild}
            </Content>
            {footer ? <Footer>{footer}</Footer> : null}
          </MenuList>
        }
        visible={triggerMethod === 'click' ? isVisible : shouldBeVisible}
      >
        <DisclosureContext.Provider value>
          {finalDisclosure}
        </DisclosureContext.Provider>
      </StyledPopup>
    )
  },
)
