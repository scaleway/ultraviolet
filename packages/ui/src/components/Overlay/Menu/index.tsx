'use client'

import { forwardRef } from 'react'
import type { Ref } from 'react'
import { Popup } from '../Popup/v2'
import { Group } from './components/Group'
import { Item } from './components/Item'
import { Menu as MenuContent } from './MenuContent'
import { MenuProvider } from './MenuProvider'
import type { MenuProps } from './types'

const Component = forwardRef(
  ({ children, hideOnClickItem, visible, ...props }: MenuProps, ref: Ref<HTMLButtonElement>) => (
    <Popup.Root visible={visible}>
      <MenuProvider hideOnClickItem={hideOnClickItem}>
        <MenuContent {...props} ref={ref}>
          {children}
        </MenuContent>
      </MenuProvider>
    </Popup.Root>
  ),
)

Component.displayName = 'Menu'

export const Menu = Object.assign(Component, { Group, Item })
