'use client'

import { cn } from '@ultraviolet/themes'
import type { ComponentProps, HTMLAttributes, ReactNode } from 'react'
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { tabsContainer, tabsMenu, tabsMenuContainer } from './styles.css'
import { Tab } from './Tab'
import { TabMenu } from './TabMenu'
import { TabMenuItem } from './TabMenuItem'
import { TabsContext } from './TabsContext'

type TabsProps = {
  selected?: string | number
  onChange: (data: string | number) => void
  moreDisclosure?: ReactNode
  className?: string
  'data-testid'?: string
} & Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'role'>

const SHADOW_THRESHOLD = 10

/**
 * Tabs component is used to display a set of tabs with a single tab selected at a time.
 */
export const Tabs = ({
  children = null,
  onChange,
  moreDisclosure = 'More',
  selected,
  className,
  'data-testid': dataTestId,
  ...props
}: TabsProps) => {
  const tabsRef = useRef<HTMLDivElement>({} as HTMLDivElement)
  const moreStaticRef = useRef<HTMLButtonElement>(null)
  const [displayMore, setDisplayMore] = useState(false)
  const value = useMemo(
    () => ({
      onChange,
      selected,
    }),
    [selected, onChange],
  )

  useEffect(() => {
    setDisplayMore(tabsRef.current.scrollWidth > tabsRef.current.clientWidth)
  }, [children])

  // Scroll automatically to the tab
  useEffect(() => {
    const tab = tabsRef.current.querySelector(
      `[role='tab'][aria-selected='true']`,
    ) as HTMLElement

    if (tab && tabsRef.current.scrollTo) {
      tabsRef.current.scrollTo({ behavior: 'smooth', left: tab.offsetLeft })
    }
  }, [selected])

  // Change the moreButton style automatically based on the scroll to show that a scroll effect is possible.
  useEffect(() => {
    const element = tabsRef.current
    const moreElement = moreStaticRef.current
    const handler = () => {
      if (moreElement?.style) {
        moreElement.style.boxShadow =
          element.scrollLeft + SHADOW_THRESHOLD >
          element.scrollWidth - element.clientWidth
            ? 'none'
            : ''
      }
    }
    if (displayMore) {
      element.addEventListener('scroll', handler)
    }

    return () => {
      if (displayMore) {
        element.removeEventListener('scroll', handler)
      }
    }
  }, [displayMore])

  // mapping of tab children to avoid using subtitle props
  const menuItemChildren = Children.map(children, child => {
    if (isValidElement<ComponentProps<typeof Tab>>(child)) {
      return cloneElement(child, {
        ...child.props,
        subtitle: null,
      })
    }

    return null
  })

  return (
    <TabsContext.Provider value={value}>
      <div
        className={cn(className, tabsContainer)}
        data-testid={dataTestId}
        ref={tabsRef}
        role="tablist"
        {...props}
      >
        {children}
        {displayMore ? (
          <TabMenu
            className={tabsMenu}
            disclosure={moreDisclosure}
            ref={moreStaticRef}
          >
            <div className={tabsMenuContainer}>{menuItemChildren}</div>
          </TabMenu>
        ) : null}
      </div>
    </TabsContext.Provider>
  )
}

Tabs.Tab = Tab
Tabs.Menu = TabMenu
Tabs.MenuItem = TabMenuItem
