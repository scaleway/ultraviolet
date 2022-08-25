import styled from '@emotion/styled'
import { HTMLAttributes, useMemo } from 'react'
import Tab from './Tab'
import TabMenu from './TabMenu'
import TabMenuItem from './TabMenuItem'
import TabsContext from './TabsContext'

const TabsContainer = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  overflow-x: scroll;
  position: relative;
  z-index: 0;
  list-style-type: none;

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
} & Omit<HTMLAttributes<HTMLElement>, 'onChange'>

const Tabs = ({
  children = null,
  selected,
  onChange = () => {},
  className,
}: TabsProps) => {
  const value = useMemo(
    () => ({
      onChange,
      selected,
    }),
    [selected, onChange],
  )

  return (
    <TabsContext.Provider value={value}>
      <TabsContainer className={className}>{children}</TabsContainer>
    </TabsContext.Provider>
  )
}

Tabs.Tab = Tab
Tabs.Menu = TabMenu
Tabs.MenuItem = TabMenuItem

export default Tabs
