'use client'

import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
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
import { getListItem, searchChildren } from './helpers'
import { DisclosureContext, useMenu } from './MenuProvider'
import {
  heightAvailableSpace,
  heightMenu,
  menu,
  menuContent,
  menuFooter,
  menuList,
  menuSearchInput,
} from './styles.css'
import type { MenuProps } from './types'

const SPACE_DISCLOSURE_POPUP = 24 // in px

export const Menu = forwardRef(
  (
    {
      id,
      ariaLabel = 'Menu',
      children,
      disclosure,
      hasArrow = false,
      placement = 'auto-bottom',
      className,
      'data-testid': dataTestId,
      maxHeight,
      portalTarget = document.body,
      triggerMethod = 'click',
      dynamicDomRendering,
      align,
      searchable = false,
      footer,
      shrink,
      style,
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
    const [popupMaxHeight, setPopupMaxHeight] = useState<string>(
      maxHeight ?? '30rem',
    )
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
        if (isNested) {
          event.preventDefault()
          event.stopPropagation()
        }
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
      let timeout: ReturnType<typeof setTimeout> | undefined
      if (isVisible && searchable) {
        timeout = setTimeout(() => {
          searchInputRef.current?.focus()
        }, 50)
      }

      return () => {
        if (timeout) {
          clearTimeout(timeout)
        }
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
                listItem.at(-1)?.focus()
              }
            } else if (event.key === 'ArrowLeft' && triggerMethod === 'hover') {
              disclosureRef.current?.focus()
              setShouldBeVisible(undefined)
            }
          }
        }
      }
    }

    useEffect(() => {
      if (disclosureRef.current && placement === 'bottom' && shrink) {
        const disclosureRect = disclosureRef.current.getBoundingClientRect()
        const disclosureBottom = disclosureRect.bottom
        const targetSize = portalTarget.getBoundingClientRect().bottom
        const availableSpace =
          targetSize - disclosureBottom - SPACE_DISCLOSURE_POPUP
        setPopupMaxHeight(`${availableSpace}px`)
      }
    }, [isVisible, portalTarget, disclosureRef, placement, shrink])

    return (
      <Popup
        align={align}
        aria-label={ariaLabel}
        className={cn(className, menu({ arrow: hasArrow, searchable }))}
        debounceDelay={triggerMethod === 'hover' ? 250 : 0}
        dynamicDomRendering={dynamicDomRendering}
        hasArrow={hasArrow}
        hideOnClickOutside
        id={finalId}
        maxHeight={maxHeight ?? 'fit-content'}
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
        style={style}
        tabIndex={-1}
        text={
          <Stack
            className={cn(className, menuList)}
            data-testid={dataTestId}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setShouldBeVisible(true)}
            onMouseLeave={() => setShouldBeVisible(false)}
            role="menu"
            style={assignInlineVars({
              [heightMenu]: maxHeight ?? '30rem',
              [heightAvailableSpace]: popupMaxHeight,
            })}
          >
            <Stack className={menuContent} ref={contentRef}>
              {searchable && typeof children !== 'function' ? (
                <SearchInput
                  className={menuSearchInput}
                  onSearch={onSearch}
                  ref={searchInputRef}
                  size="small"
                />
              ) : null}
              {finalChild}
            </Stack>
            {footer ? <Stack className={menuFooter}>{footer}</Stack> : null}
          </Stack>
        }
        visible={triggerMethod === 'click' ? isVisible : shouldBeVisible}
      >
        <DisclosureContext.Provider value>
          {finalDisclosure}
        </DisclosureContext.Provider>
      </Popup>
    )
  },
)
