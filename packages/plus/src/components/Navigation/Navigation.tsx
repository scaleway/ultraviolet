import type { ReactNode } from 'react'
import { NavigationContent } from './NavigationContent'
import { Group } from './components/Group'
import { Item } from './components/Item'
import { PinnedItems } from './components/PinnedItems'
import { Separator } from './components/Separator'

type NavigationProps = {
  children: ReactNode
  /**
   * The logo to be displayed in header of the navigation
   * It can be a component or a function. The function will retrun you
   * expanded state of the navigation so you can decide to show/hide
   * some part of your logo
   */
  logo?: ReactNode | ((expanded: boolean) => ReactNode)
  /**
   * This function is called when resize occur using the vertical bar on the left of the navigation.
   */
  onWidthResize?: (width: number) => void
  id?: string
  className?: string
}

/**
 * Navigation is a component that allows you to create a sidebar navigation.
 * You can wrap your navigation items like `<Navigation.Item>` with your router
 * to make it work in your application.
 */
export const Navigation = ({
  children,
  logo,
  onWidthResize,
  className,
  id,
}: NavigationProps) => (
  <NavigationContent
    logo={logo}
    className={className}
    onWidthResize={onWidthResize}
    id={id}
  >
    {children}
  </NavigationContent>
)

Navigation.Group = Group
Navigation.Item = Item
Navigation.PinnedItems = PinnedItems
Navigation.Separator = Separator
