'use client'

import type { Placement } from '@floating-ui/react'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
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
import type { ButtonHTMLAttributes, KeyboardEvent, MouseEvent, ReactNode, Ref } from 'react'
import { SearchInput } from '../../Data Entry/SearchInput'
import { Stack } from '../../Layout/Stack'
import { Popup } from '../Popup/v2'
import { usePopupContext } from '../Popup/v2/context'
import { getListItem, searchChildren } from './helpers'
import { DisclosureContext, useMenu } from './MenuProvider'
import type { MenuProps } from './types'
import { heightMenu, menuStyle } from './styles.css'

const moveFocusDown = (indexOfCurrent: number, listItem: (HTMLButtonElement | HTMLAnchorElement)[]) => {
  if (indexOfCurrent < listItem.length - 1) {
    listItem[indexOfCurrent + 1].focus()
  } else {
    listItem[0].focus()
  }
}
const moveFocusUp = (indexOfCurrent: number, listItem: (HTMLButtonElement | HTMLAnchorElement)[]) => {
  if (indexOfCurrent > 0) {
    listItem[indexOfCurrent - 1].focus()
  } else {
    listItem.at(-1)?.focus()
  }
}

type MenuDisclosureProps = {
  disclosure: MenuProps['disclosure']
  triggerMethod: MenuProps['triggerMethod']
}

const MenuChildren = ({ children }: { children: NonNullable<MenuProps['children']> }) => {
  const { open, setOpen } = usePopupContext()

  if (typeof children !== 'function') {
    return children
  }

  return children({ toggle: () => setOpen(!open) })
}

const MenuDisclosure = forwardRef(
  ({ disclosure, triggerMethod = 'click' }: MenuDisclosureProps, ref: Ref<HTMLButtonElement | null>) => {
    const { disclosureRef } = useMenu()
    const { open } = usePopupContext()

    // if you need dialog inside your component, use function, otherwise component is fine
    const target = isValidElement<ButtonHTMLAttributes<HTMLButtonElement>>(disclosure)
      ? disclosure
      : disclosure({ visible: open })
    const innerRef = useRef(target as unknown as HTMLButtonElement)

    useImperativeHandle(ref, () => innerRef.current)

    const finalDisclosure = cloneElement(target, {
      onClick: (event: MouseEvent<HTMLButtonElement>) => {
        target.props.onClick?.(event)
      },
      // @ts-expect-error not sure how to fix this
      ref: disclosureRef,
    })

    return (
      <Popup.Trigger triggerEvent={triggerMethod}>
        <DisclosureContext.Provider value>{finalDisclosure}</DisclosureContext.Provider>
      </Popup.Trigger>
    )
  },
)

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
      searchable = false,
      footer,
      style,
      visible,
    }: MenuProps,
    ref: Ref<HTMLButtonElement | null>,
  ) => {
    const { isNested, disclosureRef, menuRef } = useMenu()
    const searchInputRef = useRef<HTMLInputElement>(null)
    const [localChild, setLocalChild] = useState<ReactNode[] | null>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const tempId = useId()
    const finalId = `menu-${id ?? tempId}`
    const isTriggerMethodHover = triggerMethod === 'hover'
    const computedPlacement = `${placement.replace(/auto-?/v, '') || 'bottom'}-start` as Placement

    const onSearch = useCallback(
      (value: string) => {
        if (typeof children === 'object') {
          setLocalChild(searchChildren(children, value))
        }
      },
      [children],
    )

    useEffect(() => {
      if (searchable) {
        return undefined
      }

      const timeout = setTimeout(() => {
        searchInputRef.current?.focus()
      }, 50)

      return () => clearTimeout(timeout)
    }, [searchable])

    const finalChild = useMemo(() => {
      if (typeof children === 'function') {
        return null
      }

      if (searchable && localChild) {
        return localChild
      }

      return children
    }, [children, localChild, searchable])

    const handleFocusKey = (
      key: string,
      indexOfCurrent: number,
      listItem: (HTMLButtonElement | HTMLAnchorElement)[],
    ) => {
      if (key === 'ArrowDown') {
        moveFocusDown(indexOfCurrent, listItem)
      } else if (key === 'ArrowUp') {
        moveFocusUp(indexOfCurrent, listItem)
      } else if (key === 'ArrowLeft' && isTriggerMethodHover) {
        disclosureRef.current?.focus()
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (contentRef.current) {
        const listItem = getListItem([...contentRef.current.children])
        if (listItem) {
          const currentElement = listItem.find(item => item === document.activeElement)
          if (currentElement) {
            const indexOfCurrent = listItem.indexOf(currentElement)
            event.preventDefault()

            handleFocusKey(event.key, indexOfCurrent, listItem)
          }
        }
      }
    }

    return (
      <Popup.Root visible={visible}>
        <MenuDisclosure ref={ref} disclosure={disclosure} triggerMethod={triggerMethod} />
        <Popup.Panel
          aria-label={ariaLabel}
          className={cn(className, menuStyle.menu({ arrow: hasArrow, searchable }))}
          arrow={hasArrow}
          id={finalId}
          placement={isNested ? 'right-start' : computedPlacement}
          portalTarget={portalTarget}
          ref={menuRef}
          style={style}
        >
          <Stack
            className={cn(className, menuStyle.list)}
            data-testid={dataTestId}
            onKeyDown={handleKeyDown}
            role="menu"
            style={assignInlineVars({
              [heightMenu]: maxHeight ?? '30rem',
            })}
          >
            <Stack className={menuStyle.content} ref={contentRef}>
              {searchable && typeof children !== 'function' ? (
                <SearchInput className={menuStyle.searchInput} onSearch={onSearch} ref={searchInputRef} size="small" />
              ) : null}
              {typeof children === 'function' ? <MenuChildren>{children}</MenuChildren> : finalChild}
            </Stack>
            {footer ? <Stack className={menuStyle.footer}>{footer}</Stack> : null}
          </Stack>
        </Popup.Panel>
      </Popup.Root>
    )
  },
)
