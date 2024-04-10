import type { ReactNode } from 'react'
import { NavigationContent } from './NavigationContent'
import { NavigationProvider } from './NavigationProvider'
import { Group } from './components/Group'
import { Item } from './components/Item'
import { PinnedItems } from './components/PinnedItems'
import { Separator } from './components/Separator'
import { NAVIGATION_WIDTH } from './constants'
import NavigationLocales from './locales/en'

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
   * This enable / disable the pinned feature of the navigation
   * Pinned allows the use to pin (or favorite) some items in the navigation
   */
  pinnedFeature?: boolean
  /**
   * This define how many items can be pinned at the same time.
   * If you want to disable the limit just set `Infinity` to this prop
   */
  pinLimit?: number
  /**
   * The initial pinned items. This should be an array of labels you've set on
   * your `<Navigation.Item>`
   */
  initialPinned?: string[]
  /**
   * The initial expanded state of the navigation. If set to true the
   * navigation will be expanded by default otherwise it will be collapsed
   */
  initialExpanded?: boolean
  /**
   * This function is triggered when the user click on the pin/unpin button
   * of an item
   */
  onClickPinUnpin?: (pinned: string[]) => void
  locales?: typeof NavigationLocales
  /**
   * This function is triggered when user click on expand button on the footer
   * of the navigation. This is not triggered when the user resize the navigation
   * and it automatically collapse / expand.
   */
  onClickExpand?: (expanded: boolean) => void
  className?: string
  /**
   * It defines the initial width of the navigation.
   */
  width?: number
  /**
   * This function is called when resize occur using the vertical bar on the left of the navigation.
   */
  onWidthResize?: (width: number) => void
  id?: string
}

/**
 * Navigation is a component that allows you to create a sidebar navigation.
 * You can wrap your navigation items like `<Navigation.Item>` with your router
 * to make it work in your application.
 */
export const Navigation = ({
  children,
  logo,
  pinnedFeature = false,
  onClickPinUnpin,
  onClickExpand,
  initialPinned,
  initialExpanded = true,
  locales = NavigationLocales,
  pinLimit = 7,
  width = NAVIGATION_WIDTH,
  onWidthResize,
  className,
  id,
}: NavigationProps) => (
  <NavigationProvider
    onClickPinUnpin={onClickPinUnpin}
    pinnedFeature={pinnedFeature}
    locales={locales}
    initialPinned={initialPinned}
    pinLimit={pinLimit}
    initialExpanded={initialExpanded}
  >
    <NavigationContent
      onClickExpand={onClickExpand}
      logo={logo}
      className={className}
      width={width}
      onWidthResize={onWidthResize}
      id={id}
    >
      {children}
    </NavigationContent>
  </NavigationProvider>
)

Navigation.Group = Group
Navigation.Item = Item
Navigation.PinnedItems = PinnedItems
Navigation.Separator = Separator
