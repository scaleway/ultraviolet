'use client'

import { useInteractions, useListNavigation, useMergeRefs } from '@floating-ui/react'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { cloneElement, forwardRef, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode, Ref } from 'react'
import { SearchInput } from '../../Data Entry/SearchInput'
import { Stack } from '../../Layout/Stack'
import { Popup } from '../Popup/v2'
import { usePopupContext } from '../Popup/v2/context'
import { getListItem, searchChildren } from './helpers'
import { DisclosureContext, ListNavigationContext, useMenu } from './MenuProvider'
import type { MenuProps } from './types'
import { heightMenu, menuStyle } from './styles.css'

export const Menu = forwardRef(
  (
    {
      ariaLabel = 'Menu',
      children,
      disclosure,
      hasArrow = false,
      placement,
      className,
      'data-testid': dataTestId,
      maxHeight,
      portalTarget,
      triggerMethod,
      searchable = false,
      footer,
      style,
    }: MenuProps,
    ref: Ref<HTMLButtonElement | null>,
  ) => {
    const { isNested, disclosureRef, menuRef } = useMenu()
    const { context, open, setOpen } = usePopupContext()
    const [wasOpen, setWasOpen] = useState(open)
    const [localChild, setLocalChild] = useState<ReactNode[] | null>(null)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<(HTMLElement | null)[]>([])
    const finalTriggerMethod = triggerMethod ?? (isNested ? 'hover' : 'click')
    const isTriggerMethodHover = finalTriggerMethod === 'hover'
    const mergedRef = useMergeRefs([ref, disclosureRef])
    const target = typeof disclosure === 'function' ? disclosure({ visible: open }) : disclosure
    const finalDisclosure = cloneElement(target, { ref: mergedRef })

    // Keep listRef in sync so that Floating UI's list navigation follows the rendered items.
    useLayoutEffect(() => {
      listRef.current = contentRef.current ? getListItem([...contentRef.current.children]) : []
    })

    const listNavigation = useListNavigation(context, {
      listRef,
      activeIndex,
      onNavigate: setActiveIndex,
      loop: true,
      focusItemOnHover: false,
      focusItemOnOpen: false,
    })
    const { getFloatingProps } = useInteractions([listNavigation])
    const { item: listItemProps } = listNavigation

    const onSearch = useCallback(
      (value: string) => {
        if (typeof children === 'object') {
          setLocalChild(searchChildren(children, value))
          setActiveIndex(null)
        }
      },
      [children],
    )

    const finalChild = useMemo((): ReactNode | null => {
      if (typeof children === 'function') {
        return children({ toggle: () => setOpen(!open) })
      }
      if (searchable && localChild) {
        return localChild
      }
      return children
    }, [children, localChild, open, searchable, setOpen])

    // Reset the filter when the menu opens (not when it closes) so the full list
    // is shown from the first frame instead of during the close animation.
    if (open !== wasOpen) {
      setWasOpen(open)
      if (open) {
        setLocalChild(null)
      }
    }

    const handleArrowLeft = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && isTriggerMethodHover) {
        disclosureRef.current?.focus()
      }
    }
    // oxlint-disable-next-line react/refs -- handleArrowLeft reads disclosureRef only when a key is pressed
    const floatingProps = getFloatingProps({ onKeyDown: handleArrowLeft })

    return (
      <>
        <Popup.Trigger triggerEvent={finalTriggerMethod}>
          <DisclosureContext.Provider value>{finalDisclosure}</DisclosureContext.Provider>
        </Popup.Trigger>
        <Popup.Panel
          aria-label={ariaLabel}
          className={cn(className, menuStyle.menu({ arrow: hasArrow, searchable }))}
          arrow={hasArrow}
          placement={placement ?? (isNested ? 'right-start' : 'bottom-end')}
          portalTarget={portalTarget}
          ref={menuRef}
          style={style}
        >
          <Stack
            className={cn(className, menuStyle.list)}
            data-testid={dataTestId}
            {...floatingProps}
            role="menu"
            style={assignInlineVars({
              [heightMenu]: maxHeight ?? '30rem',
            })}
          >
            <Stack className={menuStyle.content} ref={contentRef}>
              {searchable && typeof children !== 'function' ? (
                <SearchInput className={menuStyle.searchInput} onSearch={onSearch} size="small" />
              ) : null}
              <ListNavigationContext.Provider value={typeof listItemProps === 'function' ? undefined : listItemProps}>
                {finalChild}
              </ListNavigationContext.Provider>
            </Stack>
            {footer ? <Stack className={menuStyle.footer}>{footer}</Stack> : null}
          </Stack>
        </Popup.Panel>
      </>
    )
  },
)
