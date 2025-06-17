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
import { DisclosureContext, useMenu } from './MenuProvider'
import { SIZES } from './constants'
import { searchChildren } from './helpers'
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
    const { isVisible, setIsVisible, isNested, itemsList } = useMenu()
    const searchInputRef = useRef<HTMLInputElement>(null)
    const [localChild, setLocalChild] = useState<ReactNode[] | null>(null)
    const popupRef = useRef<HTMLDivElement>(null)
    const disclosureRef = useRef<HTMLButtonElement>(null)
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
      onClick: (event: MouseEvent<HTMLButtonElement>) => {
        target.props.onClick?.(event)
        setIsVisible(!isVisible)
      },
      'aria-haspopup': 'dialog',
      'aria-expanded': isVisible,
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

    const finalChild = useMemo(() => {
      if (typeof children === 'function') {
        return children({ toggle: () => setIsVisible(!isVisible) })
      }

      if (searchable && localChild) {
        return localChild
      }

      return children
    }, [children, isVisible, localChild, searchable, setIsVisible])

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab' && isVisible) {
        event?.preventDefault()
        itemsList[0]?.current.focus()
      }
    }

    return (
      <StyledPopup
        debounceDelay={triggerMethod === 'hover' ? 250 : 0}
        hideOnClickOutside
        aria-label={ariaLabel}
        className={className}
        visible={triggerMethod === 'click' ? isVisible : undefined}
        placement={isNested ? 'nested-menu' : placement}
        hasArrow={hasArrow}
        data-has-arrow={hasArrow}
        role="dialog"
        id={finalId}
        ref={popupRef}
        onClose={() => {
          setIsVisible(false)
          setLocalChild(null)
          // Skip focus return when using hover trigger to prevent focus getting stuck in a loop
          if (triggerMethod !== 'hover') disclosureRef.current?.focus()
        }}
        tabIndex={-1}
        maxHeight={maxHeight ?? '30rem'}
        searchable={searchable}
        text={
          <MenuList
            data-testid={dataTestId}
            className={className}
            role="menu"
            height={maxHeight ?? '30rem'}
          >
            <Content>
              {searchable && typeof children !== 'function' ? (
                <StyledSearchInput
                  size="small"
                  onSearch={onSearch}
                  ref={searchInputRef}
                />
              ) : null}
              {finalChild}
            </Content>
            {footer ? <Footer>{footer}</Footer> : null}
          </MenuList>
        }
        portalTarget={portalTarget}
        dynamicDomRendering={dynamicDomRendering}
        align={align}
        onKeyDown={handleKeyDown}
      >
        <DisclosureContext.Provider value>
          {finalDisclosure}
        </DisclosureContext.Provider>
      </StyledPopup>
    )
  },
)
