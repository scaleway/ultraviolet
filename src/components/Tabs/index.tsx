import styled from '@emotion/styled'
import {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Tab, { StyledTabButton } from './Tab'
import TabMenu from './TabMenu'
import TabMenuItem from './TabMenuItem'
import TabsContext from './TabsContext'

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${StyledTabButton} {
    font-size: 14px;
    line-height: 22px;
    font-weight: inherit;
    padding: 4px 8px;
    border-bottom-width: 1px;
    width: 100%;
    cursor: pointer;
    min-width: 110px;
    background-color: transparent;
  }
`
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
    background: ${({ theme }) => theme.colors.neutral.borderWeak};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

type TabsProps = {
  selected?: string | number
  onChange: (data: string | number) => void
  moreDisclosure?: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'role'>

const SHADOW_THRESHOLD = 10

const Tabs = ({
  children = null,
  onChange,
  moreDisclosure = 'More',
  selected,
  ...props
}: TabsProps) => {
  const tabsRef = useRef<HTMLDivElement | null>(null)
  const moreStaticRef = useRef<HTMLButtonElement | null>(null)
  const [displayMore, setDisplayMore] = useState(false)
  const value = useMemo(
    () => ({
      onChange,
      selected,
    }),
    [selected, onChange],
  )

  useEffect(() => {
    if (tabsRef.current) {
      setDisplayMore(tabsRef.current.scrollWidth > tabsRef.current.clientWidth)
    }
  }, [])

  // Scroll automatically to the tab
  useEffect(() => {
    if (tabsRef.current) {
      const tab = tabsRef.current.querySelector(
        `[role='tab'][aria-selected='true']`,
      )
      if (tab && tab.scrollIntoView) {
        tab.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }, [selected])

  // Change the moreButton style automatically based on the scroll
  useEffect(() => {
    const element = tabsRef.current
    const handler = () => {
      if (tabsRef.current && moreStaticRef.current) {
        moreStaticRef.current.style.boxShadow =
          tabsRef.current.scrollLeft + SHADOW_THRESHOLD >
          tabsRef.current.scrollWidth - tabsRef.current.clientWidth
            ? 'none'
            : ''
      }
    }
    if (element && displayMore) {
      element.addEventListener('scroll', handler)
    }

    return () => {
      if (element) element.removeEventListener('scroll', handler)
    }
  }, [displayMore])

  return (
    <TabsContext.Provider value={value}>
      <TabsContainer ref={tabsRef} role="tablist" {...props}>
        {children}
        {displayMore ? (
          <StyledTabMenu ref={moreStaticRef} disclosure={moreDisclosure}>
              <MenuContainer>{children}</MenuContainer>
            </StyledTabMenu>
        ) : null}
      </TabsContainer>
    </TabsContext.Provider>
  )
}

Tabs.Tab = Tab
Tabs.Menu = TabMenu
Tabs.MenuItem = TabMenuItem

export default Tabs
