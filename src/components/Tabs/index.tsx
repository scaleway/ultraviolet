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
    font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
    line-height: ${({ theme }) => theme.typography.bodySmall.lineHeight};
    font-weight: inherit;
    padding: ${({ theme }) => `${theme.space['1']} ${theme.space['2']}`};
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

const TabsRoot = styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  z-index: 0;

  &::-webkit-scrollbar {
    display: none;
  }
`

const TabsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;

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
  const rootRef = useRef<HTMLDivElement>({} as HTMLDivElement)
  const tabsRef = useRef<HTMLDivElement>({} as HTMLDivElement)
  const moreStaticRef = useRef<HTMLButtonElement>({} as HTMLButtonElement)
  const [displayMore, setDisplayMore] = useState(false)
  const value = useMemo(
    () => ({
      onChange,
      selected,
    }),
    [selected, onChange],
  )

  useEffect(() => {
    const observedTarget = tabsRef.current
    const observer = new ResizeObserver(() => {
      setDisplayMore(observedTarget.scrollWidth > rootRef.current.clientWidth)
    })
    observer.observe(observedTarget)

    return () => observedTarget && observer.unobserve(observedTarget)
  }, [])

  // Scroll automatically to the tab
  useEffect(() => {
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
  }, [selected])

  // Change the moreButton style automatically based on the scroll
  useEffect(() => {
    const element = tabsRef.current
    const moreElement = moreStaticRef.current
    const handler = () => {
      moreElement.style.boxShadow =
        element.scrollLeft + SHADOW_THRESHOLD >
        element.scrollWidth - element.clientWidth
          ? 'none'
          : ''
    }
    if (displayMore) {
      element.addEventListener('scroll', handler)
    }

    return () => {
      if (displayMore) element.removeEventListener('scroll', handler)
    }
  }, [displayMore])

  return (
    <TabsContext.Provider value={value}>
      <TabsRoot ref={rootRef}>
        <TabsContainer ref={tabsRef} role="tablist" {...props}>
          {children}
        </TabsContainer>
        {displayMore ? (
          <StyledTabMenu ref={moreStaticRef} disclosure={moreDisclosure}>
            <MenuContainer>{children}</MenuContainer>
          </StyledTabMenu>
        ) : null}
      </TabsRoot>
    </TabsContext.Provider>
  )
}

Tabs.Tab = Tab
Tabs.Menu = TabMenu
Tabs.MenuItem = TabMenuItem

export default Tabs
