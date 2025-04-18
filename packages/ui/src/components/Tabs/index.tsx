'use client'

import styled from '@emotion/styled'
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ComponentProps, HTMLAttributes, ReactNode } from 'react'
import { StyledTabButton, Tab } from './Tab'
import { TabMenu } from './TabMenu'
import { TabMenuItem } from './TabMenuItem'
import { TabsContext } from './TabsContext'

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${StyledTabButton} {
    font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
    line-height: ${({ theme }) => theme.typography.bodySmall.lineHeight};
    font-weight: inherit;
    padding: ${({ theme }) => `${theme.space['1']} ${theme.space['2']}`};
    border-bottom-width: 1.5px;
    width: 100%;
    cursor: pointer;
    min-width: 6.875rem;
    background-color: transparent;
    &[aria-disabled='true'],
    &:disabled {
      cursor: not-allowed;
      filter: grayscale(1) opacity(50%);
    }
  }
`

// Migration to MenuV2 will not work as expected here.
const StyledTabMenu = styled(TabMenu)`
  position: sticky;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.neutral.background};
  box-shadow: ${({ theme }) => theme.shadows.menu};
`

const TabsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  position: relative;
  z-index: 0;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::after {
    z-index: -1;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.neutral.border};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

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
      tabsRef.current.scrollTo({ left: tab.offsetLeft, behavior: 'smooth' })
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
      if (displayMore) element.removeEventListener('scroll', handler)
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
      <TabsContainer
        ref={tabsRef}
        role="tablist"
        className={className}
        data-testid={dataTestId}
        {...props}
      >
        {children}
        {displayMore ? (
          <StyledTabMenu ref={moreStaticRef} disclosure={moreDisclosure}>
            <MenuContainer>{menuItemChildren}</MenuContainer>
          </StyledTabMenu>
        ) : null}
      </TabsContainer>
    </TabsContext.Provider>
  )
}

Tabs.Tab = Tab
Tabs.Menu = TabMenu
Tabs.MenuItem = TabMenuItem
