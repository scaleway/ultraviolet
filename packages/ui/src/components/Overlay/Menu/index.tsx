'use client'

import { forwardRef } from 'react'
import type { Ref } from 'react'
import { Group } from './components/Group'
import { Item } from './components/Item'
import { Menu as MenuContent } from './MenuContent'
import { MenuProvider } from './MenuProvider'
import type { MenuProps } from './types'

const Component = forwardRef(({ children, hideOnClickItem, ...props }: MenuProps, ref: Ref<HTMLButtonElement>) => (
  <MenuProvider hideOnClickItem={hideOnClickItem}>
    <MenuContent {...props} ref={ref}>
      {children}
    </MenuContent>
  </MenuProvider>
))

Component.displayName = 'Menu'

export const Menu = Object.assign(Component, { Group, Item })
