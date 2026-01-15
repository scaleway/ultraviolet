'use client'

import { Group } from './components/Group'
import { Item } from './components/Item'
import { PinnedItems } from './components/PinnedItems'
import { Separator } from './components/Separator'
import { ShowHide } from './components/ShowHide'
import { NavigationContent } from './NavigationContent'
import type { NavigationProps } from './types'

/**
 * Navigation is a component that allows you to create a sidebar navigation.
 * You can wrap your navigation items like `<Navigation.Item>` with your router
 * to make it work in your application.
 */
export const Navigation = ({
  'data-testid': dataTestId,
  children,
  className,
  id,
  logo,
  onToggleExpand,
  onWidthResize,
  style,
}: NavigationProps) => (
  <NavigationContent
    className={className}
    data-testid={dataTestId}
    id={id}
    logo={logo}
    onToggleExpand={onToggleExpand}
    onWidthResize={onWidthResize}
    style={style}
  >
    {children}
  </NavigationContent>
)

Navigation.Group = Group
Navigation.Item = Item
Navigation.PinnedItems = PinnedItems
Navigation.Separator = Separator
Navigation.ShowHide = ShowHide
