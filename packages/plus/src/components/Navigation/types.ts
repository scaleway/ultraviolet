import type { ReactNode } from 'react'

export type DragNDropData = {
  index: number
  item: string
}

export type PinUnPinType = {
  /**
   * The state of the item after the click
   */
  state?: 'pin' | 'unpin'
  /**
   * The current item id that has been pinned on click
   */
  id?: string
  /**
   * The total pinned items including the current one
   */
  totalPinned?: string[]
}

export type NavigationProps = {
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
  /**
   * This function will be called when the user toggle the expand/collapse button or with the slider.
   */
  onToggleExpand?: (expanded: boolean) => void
  'data-testid'?: string
}
