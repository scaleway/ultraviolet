'use client'

import { forwardRef } from 'react'

import { Group } from './components/Group'
import { Item } from './components/Item'
import { Menu as MenuContent } from './MenuContent'
import { MenuProvider } from './MenuProvider'

import type { MenuProps } from './types'
import type { Ref } from 'react'

const Component = forwardRef(
  (
    { children, visible, hideOnClickItem, ...props }: MenuProps,
    ref: Ref<HTMLButtonElement>,
  ) => (
    <MenuProvider hideOnClickItem={hideOnClickItem} visible={visible}>
      <MenuContent {...props} ref={ref}>
        {children}
      </MenuContent>
    </MenuProvider>
  ),
)

export const Menu = Object.assign(Component, { Group, Item })
