import type { Ref } from 'react'
import { forwardRef } from 'react'
import { Menu } from './MenuContent'
import { MenuProvider } from './MenuProvider'
import { Group } from './components/Group'
import Item from './components/Item'
import type { MenuProps } from './types'

const Component = forwardRef(
  (
    { children, visible, hideOnClickItem, ...props }: MenuProps,
    ref: Ref<HTMLButtonElement>,
  ) => (
    <MenuProvider visible={visible} hideOnClickItem={hideOnClickItem}>
      <Menu {...props} ref={ref}>
        {children}
      </Menu>
    </MenuProvider>
  ),
)

export const MenuV2 = Object.assign(Component, { Item, Group })
